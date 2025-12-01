-- Initial database schema for Turso
-- Run this on your Turso database before starting the application

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  items_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Sample data (optional)
INSERT OR IGNORE INTO users (id, name, email, password) VALUES
  (1, 'Alice', 'alice@example.com', '$2b$10$hashedpassword1'),
  (2, 'Bob', 'bob@example.com', '$2b$10$hashedpassword2');

INSERT OR IGNORE INTO products (id, name, price, stock) VALUES
  (1, 'Laptop', 120000, 5),
  (2, 'Keyboard', 3000, 12),
  (3, 'Mouse', 1500, 23);