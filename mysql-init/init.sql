SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS db_test 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE db_test;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO users (email, password)
VALUES (
  'mario@example.com',
  '$2b$10$E9HQbCHfQK4D7ynXdw6JxOsZdXfBLZgiU7pWDyfnlUUXzWPHkmkqK'
);


CREATE TABLE IF NOT EXISTS recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  steps TEXT,
  image_url VARCHAR(255),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO recipes (title, description, ingredients, steps, image_url, user_id)
VALUES (
  'Spaghetti Carbonara',
  'Un classique italien avec une sauce crémeuse aux œufs et au fromage.',
  '- 200g de spaghetti\n- 100g de pancetta\n- 2 œufs\n- 50g de parmesan râpé\n- Sel, poivre',
  '1. Cuire les spaghetti.\n2. Faire revenir la pancetta.\n3. Battre les œufs avec le parmesan.\n4. Mélanger le tout hors du feu.\n5. Saler, poivrer, servir chaud.',
  'https://images.unsplash.com/photo-1651585594107-859f80b4ca3a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  1 -- ID de l'utilisateur qui crée la recette,
),
(
  'Spaghetti Bolognaise',
  'Un grand classique de la cuisine italienne, avec une sauce tomate mijotée à la viande hachée.',
  '- 200g de spaghetti\n- 300g de viande hachée (bœuf ou mélange)\n- 1 oignon\n- 2 gousses d’ail\n- 400g de pulpe de tomate\n- 2 c.à.s d’huile d’olive\n- Sel, poivre, herbes de Provence',
  '2. Cuire les spaghetti dans de l’eau bouillante salée.\n2. Faire revenir l’oignon et l’ail émincés dans l’huile d’olive.\n3. Ajouter la viande hachée et faire cuire jusqu’à ce qu’elle soit bien dorée.\n4. Verser la pulpe de tomate, ajouter les herbes, saler, poivrer, et laisser mijoter 20 minutes.\n5. Mélanger les pâtes à la sauce, servir chaud.',
  'https://images.unsplash.com/photo-1603133872878-684f208fb84d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
  2 -- ID de l'utilisateur qui crée la recette
);
