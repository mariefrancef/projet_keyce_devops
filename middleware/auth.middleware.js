const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  // Vérifie si un token est présent dans l'en-tête Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    // Vérifie et décode le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute l'ID de l'utilisateur décodé dans la requête pour pouvoir l'utiliser dans les routes suivantes
    req.user = decoded;

    next(); // Passe à la route suivante si tout va bien
  } catch (err) {
    // Si le token est invalide ou expiré
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
