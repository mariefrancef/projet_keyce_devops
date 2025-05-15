const recipeModel = require("../models/recipe.model");

exports.createRecipe = async (req, res) => {
  const { title, description, ingredients, steps } = req.body;
  const user_id = req.user.id;

  try {
    const recipe = await recipeModel.createRecipe(
      title,
      description,
      ingredients,
      steps,
      user_id
    );
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipeModel.getRecipeById(id);
    if (!recipe)
      return res.status(404).json({ message: "Recette introuvable" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, steps } = req.body;
  const user_id = req.user.id;

  try {
    const updated = await recipeModel.updateRecipe(
      id,
      title,
      description,
      ingredients,
      steps,
      user_id
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Recette introuvable ou non autorisé" });
    res.status(200).json({ message: "Recette mise à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const deleted = await recipeModel.deleteRecipe(id, user_id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Recette introuvable ou non autorisé" });
    res.status(200).json({ message: "Recette supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
