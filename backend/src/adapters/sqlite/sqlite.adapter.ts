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

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        items_json TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price INTEGER NOT NULL,
        compareAtPrice INTEGER,
        currency TEXT NOT NULL DEFAULT 'USD',
        sku TEXT UNIQUE NOT NULL,
        barcode TEXT,
        serialNumber TEXT,
        stock INTEGER NOT NULL DEFAULT 0,
        lowStockThreshold INTEGER,
        trackInventory INTEGER NOT NULL DEFAULT 1,
        allowBackorder INTEGER NOT NULL DEFAULT 0,
        categoryId TEXT,
        tags TEXT DEFAULT '[]',
        brand TEXT,
        vendor TEXT,
        weight INTEGER,
        dimensions TEXT,
        hasVariants INTEGER NOT NULL DEFAULT 0,
        slug TEXT UNIQUE NOT NULL,
        metaTitle TEXT,
        metaDescription TEXT,
        isActive INTEGER NOT NULL DEFAULT 1,
        isFeatured INTEGER NOT NULL DEFAULT 0,
        isDigital INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        publishedAt TEXT
      );

      CREATE TABLE IF NOT EXISTS product_images (
        productId TEXT NOT NULL,
        attachmentId TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        isDefault INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (productId, attachmentId),
        FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (attachmentId) REFERENCES attachments(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS product_variants (
        id TEXT PRIMARY KEY,
        productId TEXT NOT NULL,
        name TEXT NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        barcode TEXT,
        price INTEGER,
        compareAtPrice INTEGER,
        stock INTEGER NOT NULL DEFAULT 0,
        options TEXT DEFAULT '[]',
        isActive INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS attachments (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        originalName TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        size INTEGER NOT NULL,
        url TEXT NOT NULL,
        path TEXT NOT NULL,
        entityType TEXT,
        entityId TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
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
      userId: String(orderData.userId),
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
      userId: String(result.userId),
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
      userId: String(o.userId),
      items: JSON.parse(o.items)
    }));
  }
}