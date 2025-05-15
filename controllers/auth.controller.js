const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const newUser = await userModel.createUser(email, password);
    res
      .status(201)
      .json({
        message: "Utilisateur créé",
        user: { id: newUser.id, email: newUser.email },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);
    if (!user)
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });

    const valid = userModel.verifyPassword(password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
