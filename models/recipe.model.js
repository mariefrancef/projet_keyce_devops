const db = require("./db");

exports.createRecipe = async (
  title,
  description,
  ingredients,
  steps,
  user_id
) => {
  const [result] = await db.query(
    `INSERT INTO recipes (title, description, ingredients, steps, user_id)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, ingredients, steps, user_id]
  );
  return {
    id: result.insertId,
    title,
    description,
    ingredients,
    steps,
    user_id,
  };
};

exports.getAllRecipes = async () => {
  const [rows] = await db.query(
    `SELECT * FROM recipes ORDER BY created_at DESC`
  );
  return rows;
};

exports.getRecipeById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM recipes WHERE id = ?`, [id]);
  return rows[0];
};

exports.updateRecipe = async (
  id,
  title,
  description,
  ingredients,
  steps,
  user_id
) => {
  const [result] = await db.query(
    `UPDATE recipes SET title = ?, description = ?, ingredients = ?, steps = ?
     WHERE id = ? AND user_id = ?`,
    [title, description, ingredients, steps, id, user_id]
  );
  return result.affectedRows > 0;
};

exports.deleteRecipe = async (id, user_id) => {
  const [result] = await db.query(
    `DELETE FROM recipes WHERE id = ? AND user_id = ?`,
    [id, user_id]
  );
  return result.affectedRows > 0;
};
