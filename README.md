# projet-car-rental

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Avant de commencer une tâche(branche) :
bash
    git checkout main
    git pull origin main
    git checkout -b nom-de-votre-branche

Pour sauvegarder et partager vos modifications :
bash
    git add .
    git commit -m "Description des modifications"
    git push origin nom-de-votre-branche

Pour changer de tâche ou démarrer une nouvelle fonctionnalité :
    git checkout main
    git pull origin main
    git checkout -b nouvelle-branche


Pour fusionner dans main :
    Ouvre une Pull Request via  le site GitHub.
    Attend la validation et la fusion.

Mettre à jour les références distantes :
    git fetch origin

Lister les branches distantes (optionnel) :
    git branch -r

Basculer par exemple sur la branche testv :
    git checkout testv

Synchroniser la branche avec le dépôt distant :
    git pull origin testv



AVANT de Run pour la premiere fois (npm run serve):
    npm install axios --legacy-peer-deps

    Démarrer le serveur Node.js :
        node server.js et ouvrir un nouveau terminal!!
    MTN vous pouvez lancer.

IMPORTANT: copiez le contenu du fichier "env.exemple" et creer fichier "env. pour coller le contenu dedans, mettez ensuite votre propre mot de passe mySQL a la ligne password. Pensez aussi a ouvrir le fichier "database.sql" sur mysql


netstat -aon | findstr :5000


MERCI L'EQUIPE
