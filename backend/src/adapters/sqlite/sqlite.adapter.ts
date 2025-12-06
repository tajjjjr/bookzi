import Database from "better-sqlite3";
import { DBAdapter } from "../interfaces/DBAdapter.ts";
import { Product, Order, PaymentStatus, FulfillmentStatus, OrderStatus } from "../../types/models.ts"

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
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
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

      CREATE TABLE IF NOT EXISTS orders_new (
        id TEXT PRIMARY KEY,
        orderNumber TEXT UNIQUE NOT NULL,
        userId TEXT NOT NULL,
        items TEXT NOT NULL,
        subtotal REAL NOT NULL,
        discount REAL,
        discountCode TEXT,
        tax REAL NOT NULL,
        shippingCost REAL NOT NULL,
        total REAL NOT NULL,
        currency TEXT NOT NULL,
        paymentStatus TEXT NOT NULL,
        paymentMethod TEXT,
        paymentIntentId TEXT,
        fulfillmentStatus TEXT NOT NULL,
        shippingAddress TEXT,
        billingAddress TEXT,
        shippingMethod TEXT,
        trackingNumber TEXT,
        trackingUrl TEXT,
        customerEmail TEXT NOT NULL,
        customerPhone TEXT,
        notes TEXT,
        internalNotes TEXT,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        paidAt TEXT,
        shippedAt TEXT,
        deliveredAt TEXT,
        cancelledAt TEXT,
        refundedAt TEXT
      );
    `);
  }
  async listProducts(): Promise<Product[]> {
    return this.db.prepare("SELECT * FROM products").all() as Product[];
  }

  async getProducts(): Promise<Product[]> {
    return this.listProducts();
  }

  async getProduct(id: string): Promise<Product | null> {
    const result = this.db.prepare("SELECT * FROM products WHERE id = ?").get(id) as Product | undefined;
    return result || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.getProduct(id);
  }

  async decreaseInventory(id: string, amount: number): Promise<Product | null> {
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
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    this.db.prepare(`
      INSERT INTO orders (id, user_id, items_json, created_at)
      VALUES (?, ?, ?, ?)
    `).run(orderId, orderData.userId, json, now);

    return {
      id: orderId,
      ...orderData
    };
  }

  async getOrderById(id: string): Promise<Order | null> {
    const result = this.db.prepare(`
      SELECT id, user_id as userId, items_json as items, created_at
      FROM orders
      WHERE id = ?
    `).get(id) as { id: string; userId: string; items: string } | undefined;

    if (!result) return null;

    return {
      id: result.id,
      orderNumber: `#${result.id}`,
      userId: result.userId,
      items: JSON.parse(result.items),
      subtotal: 0,
      tax: 0,
      shippingCost: 0,
      total: 0,
      currency: 'USD',
      paymentStatus: PaymentStatus.PENDING,
      fulfillmentStatus: FulfillmentStatus.UNFULFILLED,
      status: OrderStatus.PENDING,
      customerEmail: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async listOrdersForUser(userId: string): Promise<Order[]> {
    const results = this.db.prepare(`
      SELECT id, user_id as userId, items_json as items, created_at
      FROM orders
      WHERE user_id = ?
    `).all(userId) as { id: string; userId: string; items: string }[];

    return results.map(o => ({
      id: o.id,
      orderNumber: `#${o.id}`,
      userId: o.userId,
      items: JSON.parse(o.items),
      subtotal: 0,
      tax: 0,
      shippingCost: 0,
      total: 0,
      currency: 'USD',
      paymentStatus: PaymentStatus.PENDING,
      fulfillmentStatus: FulfillmentStatus.UNFULFILLED,
      status: OrderStatus.PENDING,
      customerEmail: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }
}