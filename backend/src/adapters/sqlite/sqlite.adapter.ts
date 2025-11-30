import Database from "better-sqlite3";
import { DBAdapter } from "../interfaces/DBAdapter.ts";
import { Product, Order } from "../../types/models.ts"

interface SQLiteAdapterConfig {
  filepath: string;
}

export class SQLiteAdapter implements DBAdapter {
  private db: Database.Database;

  constructor({ filepath }: SQLiteAdapterConfig) {
    this.db = new Database(filepath);
    this._prepare();
  }

  getDatabase(): Database.Database {
    return this.db;
  }

  private _prepare(): void {
    this.db.exec(`
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
    `);
  }

  async listProducts(): Promise<Product[]> {
    return this.db.prepare("SELECT * FROM products").all() as Product[];
  }

  async getProducts(): Promise<Product[]> {
    return this.listProducts();
  }

  async getProduct(id: number): Promise<Product | null> {
    const result = this.db.prepare("SELECT * FROM products WHERE id = ?").get(id) as Product | undefined;
    return result || null;
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.getProduct(id);
  }

  async decreaseInventory(id: number, amount: number): Promise<Product | null> {
    const stmt = this.db.prepare(`
      UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?
    `);

    const result = stmt.run(amount, id, amount);
    if (result.changes > 0) {
      return this.getProduct(id);
    }
    return null;
  }

  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    const json = JSON.stringify(orderData.items);
    const now = new Date().toISOString();

    const info = this.db.prepare(`
      INSERT INTO orders (user_id, items_json, created_at)
      VALUES (?, ?, ?)
    `).run(orderData.userId, json, now);

    return {
      id: Number(info.lastInsertRowid),
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total
    };
  }

  async getOrderById(id: number): Promise<Order | null> {
    const result = this.db.prepare(`
      SELECT id, user_id as userId, items_json as items, created_at
      FROM orders
      WHERE id = ?
    `).get(id) as { id: number; userId: number; items: string } | undefined;

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userId,
      items: JSON.parse(result.items)
    };
  }

  async listOrdersForUser(userId: number): Promise<Order[]> {
    const results = this.db.prepare(`
      SELECT id, user_id as userId, items_json as items, created_at
      FROM orders
      WHERE user_id = ?
    `).all(userId) as { id: number; userId: number; items: string }[];

    return results.map(o => ({
      id: o.id,
      userId: o.userId,
      items: JSON.parse(o.items)
    }));
  }
}