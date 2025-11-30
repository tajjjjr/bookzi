import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import bcrypt from "bcrypt";

const db = new SQLiteAdapter({ filepath: "./dev.sqlite" });

// Access the underlying database for seeding
const database = db.getDatabase();

// Hash passwords
const alicePassword = bcrypt.hashSync('password123', 10);
const bobPassword = bcrypt.hashSync('password456', 10);

database.exec(`
  DELETE FROM users;
  INSERT INTO users (name, email, password) VALUES
    ('Alice', 'alice@example.com', '${alicePassword}'),
    ('Bob', 'bob@example.com', '${bobPassword}');
  DELETE FROM products;
  INSERT INTO products (name, price, stock) VALUES
    ('Laptop', 120000, 5),
    ('Keyboard', 3000, 12),
    ('Mouse', 1500, 23);
  DELETE FROM orders;
  INSERT INTO orders (user_id, items_json, created_at) VALUES
    (1, '[{"productId":1,"quantity":2},{"productId":2,"quantity":1}]', datetime('now')),
    (2, '[{"productId":3,"quantity":3}]', datetime('now'));
`);

console.log("Database seeded with users, products, and orders.");
console.log("Run 'npm run sqlite' to start the SQLite server.");