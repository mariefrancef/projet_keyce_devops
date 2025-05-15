# Utiliser une image de base Node.js
FROM node:18

# Installer le client MySQL
RUN apt-get update && apt-get install -y mariadb-client

# Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier tous les autres fichiers du projet dans le conteneur
COPY . .

# Rendre le script exécutable
RUN chmod +x /usr/src/app/wait-for-mysql.sh

# Exposer le port que l'application va utiliser (par défaut 3000)
EXPOSE 3000

# Commande de démarrage
CMD ["/usr/src/app/wait-for-mysql.sh"]
