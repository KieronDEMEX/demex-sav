# 🚀 Déploiement Demex SAV sur Vercel - Guide Ultra Simple

## ⚡ Déploiement en 5 minutes chrono !

### Prérequis
- ✅ Compte GitHub (gratuit)
- ✅ Compte Vercel (gratuit)
- ✅ Accès à votre Odoo

---

## 📦 Étape 1 : Préparer le code sur GitHub (2 min)

### Option A : Via GitHub Desktop (recommandé si débutant)

1. **Téléchargez GitHub Desktop** : https://desktop.github.com/
2. **Ouvrez GitHub Desktop** et connectez-vous
3. **Créez un nouveau repository** :
   - File → New Repository
   - Nom : `demex-sav`
   - Cochez "Initialize with README"
   - Cliquez "Create Repository"

4. **Copiez les fichiers** :
   - Ouvrez le dossier du repository (bouton "Show in Explorer")
   - Copiez tous les fichiers téléchargés dedans :
     ```
     demex-sav/
     ├── api/
     │   └── odoo.js
     ├── public/
     │   └── index.html
     ├── package.json
     └── vercel.json
     ```

5. **Publiez sur GitHub** :
   - Retournez dans GitHub Desktop
   - Écrivez un message : "Initial commit"
   - Cliquez "Commit to main"
   - Cliquez "Publish repository"
   - Décochez "Keep this code private" (ou laissez privé)
   - Cliquez "Publish Repository"

### Option B : Via ligne de commande (si vous êtes à l'aise)

```bash
# 1. Allez dans le dossier
cd vercel-demex

# 2. Initialisez Git
git init
git add .
git commit -m "Initial commit"

# 3. Créez un repo sur GitHub.com
# Puis connectez-le :
git remote add origin https://github.com/VOTRE-USERNAME/demex-sav.git
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 2 : Déployer sur Vercel (2 min)

1. **Allez sur Vercel** : https://vercel.com
2. **Connectez-vous** avec votre compte GitHub
3. **Cliquez sur "Add New Project"**
4. **Importez votre repository** :
   - Cherchez "demex-sav"
   - Cliquez "Import"

5. **Configurez les variables d'environnement** :
   
   Cliquez sur "Environment Variables" et ajoutez :
   
   | Name | Value |
   |------|-------|
   | `ODOO_URL` | `https://votre-instance.odoo.com` |
   | `ODOO_DB` | `nom_de_votre_base` |
   | `ODOO_USERNAME` | `votre.email@domain.com` |
   | `ODOO_PASSWORD` | `votre_mot_de_passe` |

   **💡 Important :** 
   - Utilisez VOTRE email Odoo (pas besoin de créer un utilisateur API)
   - Utilisez VOTRE mot de passe Odoo actuel

6. **Déployez** :
   - Cliquez "Deploy"
   - Attendez ~1 minute ⏱️
   - 🎉 C'est prêt !

---

## ✅ Étape 3 : Tester (1 min)

Une fois déployé, Vercel vous donne une URL type :
```
https://demex-sav-votre-username.vercel.app
```

1. **Cliquez sur l'URL**
2. Vous devriez voir votre tableau de bord
3. Les données de votre Odoo devraient s'afficher

### Test de santé

Visitez : `https://votre-app.vercel.app/api/odoo?action=health`

Vous devriez voir :
```json
{
  "status": "OK",
  "timestamp": "2024-03-17...",
  "odoo_connected": true
}
```

---

## 🎨 Personnaliser votre domaine (optionnel)

### Option 1 : Sous-domaine Vercel (gratuit)

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Ajoutez : `demex-sav.vercel.app`

### Option 2 : Votre propre domaine

1. Dans Vercel : **Settings** → **Domains**
2. Ajoutez : `sav.demexfr.com`
3. Vercel vous donne des instructions DNS
4. Ajoutez un enregistrement CNAME dans votre hébergeur :
   ```
   Type: CNAME
   Name: sav
   Value: cname.vercel-dns.com
   ```
5. Attendez quelques minutes pour la propagation DNS

---

## 🔄 Mettre à jour l'application

### Méthode automatique (recommandée)

**Chaque fois que vous poussez du code sur GitHub, Vercel redéploie automatiquement !**

1. Modifiez vos fichiers localement
2. Dans GitHub Desktop :
   - Écrivez un message de commit
   - Cliquez "Commit to main"
   - Cliquez "Push origin"
3. Vercel détecte le changement et redéploie automatiquement

### Méthode manuelle

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Cliquez sur "Redeploy"

---

## 🐛 Dépannage

### Erreur "Authentication failed"

1. Vérifiez les variables d'environnement dans Vercel
2. Allez dans **Settings** → **Environment Variables**
3. Vérifiez que :
   - `ODOO_URL` est correct (avec https://)
   - `ODOO_DB` est le bon nom de base
   - `ODOO_USERNAME` est votre email Odoo
   - `ODOO_PASSWORD` est correct

4. Testez votre connexion Odoo manuellement :
   - Allez sur votre Odoo
   - Connectez-vous avec les mêmes identifiants
   - Si ça marche, les variables sont bonnes

### Erreur CORS

Si vous voyez des erreurs CORS dans la console du navigateur :

1. Dans Odoo, allez dans **Paramètres** → **Technique** → **Configuration système**
2. Ajoutez un paramètre :
   ```
   Clé : web.cors
   Valeur : *
   ```

Ou contactez votre hébergeur Odoo pour activer CORS.

### L'application ne charge pas

1. Vérifiez les logs Vercel :
   - Dashboard → Votre projet → "Deployments"
   - Cliquez sur le dernier déploiement
   - Regardez les "Function Logs"

2. Vérifiez que le module Helpdesk est installé dans Odoo

---

## 💰 Coûts

**Tout est GRATUIT avec les limites suivantes :**

| Service | Plan Gratuit | Limites |
|---------|--------------|---------|
| **Vercel** | Hobby (gratuit) | 100 GB bandwidth/mois, Domaine .vercel.app inclus |
| **GitHub** | Free | Repos publics illimités, Repos privés illimités |
| **Odoo** | Selon votre plan | (vous l'avez déjà) |

**Vous n'avez rien à payer !** 🎉

---

## 🎯 Résumé des 3 étapes

1. ✅ **GitHub** : Code en ligne (2 min)
2. ✅ **Vercel** : Déploiement automatique (2 min)
3. ✅ **Test** : Vérification (1 min)

**Total : 5 minutes ⏱️**

---

## 📞 Support

**Problème avec Vercel ?**
- Documentation : https://vercel.com/docs
- Support : https://vercel.com/support

**Problème avec Odoo ?**
- Votre hébergeur Odoo
- Documentation : https://www.odoo.com/documentation

**Problème avec l'app Demex ?**
- Email : info@demexfr.com
- Téléphone : 04 75 82 26 86

---

## 🚀 Prochaines étapes

Une fois déployé, vous pouvez :

1. **Personnaliser les couleurs** (modifiez `public/index.html`)
2. **Ajouter votre logo** (ligne ~40 du HTML)
3. **Ajouter des fonctionnalités** (signatures, PDF, etc.)
4. **Partager l'URL** à votre équipe

**Félicitations ! 🎉 Votre application SAV est en ligne !**
