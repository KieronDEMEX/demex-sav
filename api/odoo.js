// ============================================
// DEMEX SAV - API Serverless pour Vercel
// Proxy Odoo sans serveur Node.js à gérer
// ============================================

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    return await fn(req, res);
};

// Configuration Odoo depuis les variables d'environnement Vercel
const ODOO_CONFIG = {
    url: process.env.ODOO_URL,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD
};

// Cache de session (en mémoire pour cette instance)
let sessionCache = {
    uid: null,
    sessionId: null,
    timestamp: null
};

// Authentification Odoo
async function authenticateOdoo() {
    // Utiliser le cache si valide (< 1 heure)
    if (sessionCache.uid && sessionCache.timestamp && 
        (Date.now() - sessionCache.timestamp) < 3600000) {
        return sessionCache;
    }

    try {
        const response = await fetch(`${ODOO_CONFIG.url}/web/session/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                params: {
                    db: ODOO_CONFIG.db,
                    login: ODOO_CONFIG.username,
                    password: ODOO_CONFIG.password
                }
            })
        });

        const data = await response.json();
        
        if (data.result && data.result.uid) {
            sessionCache = {
                uid: data.result.uid,
                sessionId: data.result.session_id,
                timestamp: Date.now()
            };
            return sessionCache;
        }

        throw new Error('Authentification Odoo échouée');
    } catch (error) {
        console.error('Erreur auth Odoo:', error);
        throw error;
    }
}

// Appel générique Odoo
async function callOdoo(model, method, args = [], kwargs = {}) {
    const session = await authenticateOdoo();

    try {
        const response = await fetch(`${ODOO_CONFIG.url}/web/dataset/call_kw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `session_id=${session.sessionId}`
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    model,
                    method,
                    args,
                    kwargs: {
                        ...kwargs,
                        context: { lang: 'fr_FR', tz: 'Europe/Paris', ...kwargs.context }
                    }
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.data?.message || 'Erreur Odoo');
        }

        return data.result;
    } catch (error) {
        console.error(`Erreur Odoo ${model}.${method}:`, error);
        throw error;
    }
}

// Handler principal
async function handler(req, res) {
    try {
        const { action } = req.query;
        const body = req.body || {};

        switch (action) {
            // Health check
            case 'health':
                return res.json({
                    status: 'OK',
                    timestamp: new Date().toISOString(),
                    odoo_connected: !!sessionCache.uid
                });

            // Récupérer les tickets
            case 'getTickets': {
                const filters = body.filters || [];
                const limit = body.limit || 50;
                
                const tickets = await callOdoo('helpdesk.ticket', 'search_read', [filters], {
                    fields: [
                        'id', 'name', 'partner_id', 'team_id', 'user_id', 
                        'priority', 'stage_id', 'description', 'create_date', 
                        'write_date', 'kanban_state'
                    ],
                    limit,
                    order: 'create_date DESC'
                });

                return res.json({ success: true, data: tickets });
            }

            // Créer un ticket
            case 'createTicket': {
                const ticketId = await callOdoo('helpdesk.ticket', 'create', [body.data]);
                return res.json({ success: true, ticket_id: ticketId });
            }

            // Mettre à jour un ticket
            case 'updateTicket': {
                const { id, data } = body;
                await callOdoo('helpdesk.ticket', 'write', [[parseInt(id)], data]);
                return res.json({ success: true });
            }

            // Récupérer les clients
            case 'getClients': {
                const search = body.search || '';
                let filters = [];
                
                if (search) {
                    filters = ['|', ['name', 'ilike', search], ['email', 'ilike', search]];
                }

                const partners = await callOdoo('res.partner', 'search_read', [filters], {
                    fields: ['id', 'name', 'email', 'phone', 'mobile', 'street', 'city', 'zip'],
                    limit: 50
                });

                return res.json({ success: true, data: partners });
            }

            // Statistiques
            case 'getStats': {
                const tickets = await callOdoo('helpdesk.ticket', 'search_read', [[]], {
                    fields: ['id', 'stage_id', 'priority', 'create_date']
                });

                const stats = {
                    total: tickets.length,
                    nouveau: tickets.filter(t => t.stage_id?.[1]?.toLowerCase().includes('nouveau')).length,
                    en_cours: tickets.filter(t => t.stage_id?.[1]?.toLowerCase().includes('cours')).length,
                    resolu: tickets.filter(t => t.stage_id?.[1]?.toLowerCase().includes('résolu')).length,
                    par_priorite: {
                        urgent: tickets.filter(t => t.priority === '3').length,
                        haute: tickets.filter(t => t.priority === '2').length,
                        normale: tickets.filter(t => t.priority === '1').length,
                        basse: tickets.filter(t => t.priority === '0').length
                    }
                };

                return res.json({ success: true, data: stats });
            }

            // Upload fichier
            case 'uploadFile': {
                const { filename, data: fileData, ticket_id } = body;
                
                const attachmentId = await callOdoo('ir.attachment', 'create', [{
                    name: filename,
                    datas: fileData,
                    res_model: 'helpdesk.ticket',
                    res_id: ticket_id ? parseInt(ticket_id) : null,
                    type: 'binary'
                }]);

                return res.json({ success: true, attachment_id: attachmentId });
            }

            default:
                return res.status(400).json({ 
                    success: false, 
                    message: 'Action non reconnue. Actions disponibles: health, getTickets, createTicket, updateTicket, getClients, getStats, uploadFile' 
                });
        }
    } catch (error) {
        console.error('Erreur API:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Erreur interne'
        });
    }
}

module.exports = allowCors(handler);
