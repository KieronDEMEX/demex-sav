# 🛠️ Demex SAV Pro - Version Vercel Serverless

Application de gestion SAV pour **Demex FR** avec intégration **Odoo**, déployée sur **Vercel** (gratuit, sans serveur à gérer).

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Odoo](https://img.shields.io/badge/Odoo-714B67?style=flat&logo=odoo&logoColor=white)

---

## ✨ Pourquoi cette version ?

✅ **Pas de serveur** à gérer (serverless)  
✅ **Gratuit** avec Vercel (plan Hobby)  
✅ **Déploiement automatique** depuis GitHub  
✅ **Utilise VOTRE compte Odoo** (pas besoin d'utilisateur API supplémentaire)  
✅ **HTTPS automatique** avec certificat SSL gratuit  
✅ **Mise à jour instantanée** via Git push  

---

## 📦 Structure du projet

```
demex-sav/
├── api/
│   └── odoo.js          ← API serverless Vercel (proxy Odoo)
├── public/
│   └── index.html       ← Application React (frontend)
├── package.json         ← Dépendances Node.js
├── vercel.json          ← Configuration Vercel
├── DEPLOIEMENT_VERCEL.md ← Guide de déploiement
└── README.md            ← Ce fichier
```

---

## 🚀 Déploiement rapide

### Étape 1 : Pusher sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/demex-sav.git
git push -u origin main
```

### Étape 2 : Déployer sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez "New Project"
4. Importez votre repository `demex-sav`
5. Ajoutez les variables d'environnement :
   - `ODOO_URL` : https://votre-instance.odoo.com
   - `ODOO_DB` : nom_de_votre_base
   - `ODOO_USERNAME` : votre.email@domain.com
   - `ODOO_PASSWORD` : votre_mot_de_passe
6. Cliquez "Deploy"

**C'est tout !** Votre app est en ligne en ~1 minute.

---

## 🔧 Configuration Odoo

### Credentials

Utilisez **votre propre compte Odoo** :
- Email : celui que vous utilisez pour vous connecter à Odoo
- Mot de passe : votre mot de passe Odoo actuel

**Aucun utilisateur supplémentaire nécessaire !**

### Module requis

Le module **Helpdesk** doit être installé dans Odoo :
1. Applications → Rechercher "Helpdesk"
2. Installer si pas déjà fait

### CORS (si erreurs)

Si vous voyez des erreurs CORS, contactez votre hébergeur Odoo ou ajoutez dans la configuration système :
```
web.cors = *
```

---

## 📱 Fonctionnalités

### ✅ Déjà implémentées
- Tableau de bord avec statistiques
- Liste des interventions (tickets Helpdesk Odoo)
- Création de tickets
- Mise à jour de tickets
- Gestion des clients (res.partner)
- Upload de fichiers

### 🔜 À venir (facile à ajouter)
- Signatures électroniques
- Génération de PDF
- Envoi d'emails
- Planning/calendrier
- Photos avant/après

---

## 🎨 Personnalisation

### Changer les couleurs

Éditez `public/index.html` ligne ~25 :

```css
:root {
    --primary: #0052CC;     /* Votre couleur principale */
    --accent: #FF6B35;      /* Couleur d'accent */
    /* ... */
}
```

### Ajouter votre logo

Ligne ~95 de `public/index.html` :

```javascript
<img src="https://www.demexfr.com/logo.png" alt="Demex" />
```

---

## 🔄 Mettre à jour

**Méthode ultra simple :**

1. Modifiez vos fichiers
2. Commit et push sur GitHub :
   ```bash
   git add .
   git commit -m "Mes modifications"
   git push
   ```
3. Vercel redéploie automatiquement ! ✨

---

## 🌐 API Endpoints

Tous les endpoints sont sur `/api/odoo?action=XXX`

### Health check
```
GET /api/odoo?action=health
```

### Récupérer les tickets
```
POST /api/odoo?action=getTickets
Body: { "filters": [], "limit": 50 }
```

### Créer un ticket
```
POST /api/odoo?action=createTicket
Body: {
  "data": {
    "name": "Titre",
    "description": "Description",
    "partner_id": 1
  }
}
```

### Autres actions
- `updateTicket` - Mettre à jour
- `getClients` - Liste clients
- `getStats` - Statistiques
- `uploadFile` - Upload fichier

---

## 💰 Coûts

**Tout est GRATUIT !**

- ✅ Vercel (plan Hobby) : GRATUIT
- ✅ GitHub : GRATUIT
- ✅ Odoo : Vous l'avez déjà

**Limites du plan gratuit Vercel :**
- 100 GB bandwidth/mois (largement suffisant)
- Domaine .vercel.app inclus
- Domaine custom possible (sav.demexfr.com)
- Exécutions serverless illimitées

---

## 🐛 Dépannage

### "Authentication failed"
→ Vérifiez vos variables d'environnement dans Vercel  
→ Testez votre connexion Odoo manuellement

### "CORS error"
→ Activez CORS dans Odoo (contactez votre hébergeur)

### "Module not found"
→ Vérifiez que `package.json` est bien présent  
→ Redéployez depuis Vercel

### Logs
Consultez les logs dans Vercel :
Dashboard → Votre projet → Deployments → Function Logs

---

## 📚 Documentation

- **Vercel** : https://vercel.com/docs
- **Odoo API** : https://www.odoo.com/documentation/16.0/developer/reference/external_api.html
- **React** : https://react.dev

---

## 🆘 Support

**Questions techniques :**
- GitHub Issues : https://github.com/VOTRE-USERNAME/demex-sav/issues

**Contact Demex FR :**
- 📧 Email : info@demexfr.com
- 📱 Téléphone : 04 75 82 26 86
- 🌐 Site : www.demexfr.com

---

## 📄 Licence

© 2024 Demex FR - Tous droits réservés

---

## 🎉 Merci !

**Développé pour Demex FR** - Spécialiste des clôtures, portails et motorisations haute sécurité.

**Version :** 1.0.0 (Vercel Serverless)  
**Dernière mise à jour :** Mars 2024
