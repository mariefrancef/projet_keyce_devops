#!/bin/bash

# Variables d'environnement
DB_HOST="${DB_HOST}"
DB_PORT="${DB_PORT}"
DB_USER="${DB_USER}"
DB_PASSWORD="${DB_PASSWORD}"
DB_NAME="${DB_NAME}"

echo "➡️  Attente de la disponibilité de MySQL ($DB_HOST:$DB_PORT)..."

until mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" --protocol=TCP -e "SELECT 1;" 2>/dev/null; do
  echo "⏳ MySQL indisponible - nouvelle tentative dans 2 secondes..."
  sleep 2
done

echo "✅ MySQL est disponible."

# Créer la base de données si besoin
echo "🛠️ Vérification/Création de la base $DB_NAME..."
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" --protocol=TCP -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;"

# Importer le dump si existant
if [ -f "/usr/src/app/mysql-init/init.sql" ]; then
  echo "📦 Importation du fichier dump.sql..."
  mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" --protocol=TCP "$DB_NAME" < /usr/src/app/mysql-init/init.sql
  echo "✅ Import terminé."
else
  echo "⚠️ Aucun fichier dump.sql trouvé, skip import."
fi

# Démarrer l'application
npm run start