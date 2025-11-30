import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import bcrypt from "bcrypt";

const db = new SQLiteAdapter({ filepath: "./dev.sqlite" });

// Access the underlying database for seeding
const database = db.getDatabase();

// Hash passwords
const alicePassword = bcrypt.hashSync('password123', 10);
const bobPassword = bcrypt.hashSync('password456', 10);

const now = new Date().toISOString();

database.exec(`
  DELETE FROM users;
  INSERT INTO users (name, email, password) VALUES
    ('Alice', 'alice@example.com', '${alicePassword}'),
    ('Bob', 'bob@example.com', '${bobPassword}');
  
  DELETE FROM products;
  INSERT INTO products (
    id, name, description, price, currency, sku, stock, 
    trackInventory, allowBackorder, hasVariants, slug, 
    isActive, createdAt, updatedAt
  ) VALUES
    ('1', 'Laptop', 'High-performance laptop', 120000, 'USD', 'LAP001', 5, 1, 0, 0, 'laptop', 1, '${now}', '${now}'),
    ('2', 'Keyboard', 'Mechanical keyboard', 3000, 'USD', 'KEY001', 12, 1, 0, 0, 'keyboard', 1, '${now}', '${now}'),
    ('3', 'Mouse', 'Wireless mouse', 1500, 'USD', 'MOU001', 23, 1, 0, 0, 'mouse', 1, '${now}', '${now}');
  
  DELETE FROM orders;
  INSERT INTO orders (user_id, items_json, created_at) VALUES
    (1, '[{"productId":"1","quantity":2},{"productId":"2","quantity":1}]', datetime('now')),
    (2, '[{"productId":"3","quantity":3}]', datetime('now'));
`);

console.log("Database seeded with users, products, and orders.");
console.log("Run 'npm run sqlite' to start the SQLite server.");