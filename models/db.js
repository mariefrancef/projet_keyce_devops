require("dotenv").config(); // Charge les variables d'environnement

const mysql = require("mysql2/promise");

// Sécurité : vérifier que toutes les variables essentielles sont présentes
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
];

requiredEnvVars.forEach((varName) => {
  console.log(`${varName}: ${process.env[varName]}`);

  if (!process.env[varName]) {
    console.error(
      `ERREUR : La variable d'environnement ${varName} est manquante.`
    );
    process.exit(1); // Stoppe le serveur si une variable manque
  }
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Log pour confirmer la connexion au pool
db.getConnection()
  .then((connection) => {
    console.log(`✅ Connexion réussie à MySQL sur ${process.env.DB_HOST}`);
    connection.release(); // Important : relâcher la connexion après test
  })
  .catch((err) => {
    console.error(
      "❌ Erreur lors de la connexion à la base MySQL:",
      err.message
    );
    //process.exit(1); // Stoppe le serveur si la connexion échoue
  });

module.exports = db;
