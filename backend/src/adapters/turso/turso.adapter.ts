import { createClient, Client } from "@libsql/client";
import { DBAdapter, Product, Order } from "../interfaces/DBAdapter.ts";
import { PaymentStatus, FulfillmentStatus, OrderStatus } from "../../types/models.ts";

interface TursoAdapterConfig {
  url?: string;
  authToken?: string;
}

export class TursoAdapter implements DBAdapter {
  private client: Client;

  constructor({ url = process.env.TURSO_URL, authToken = process.env.TURSO_AUTH_TOKEN }: TursoAdapterConfig = {}) {
    if (!url) throw new Error("TURSO_URL is required");
    this.client = createClient({ url, authToken });
  }

  async init(): Promise<void> {
    await this.client.execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );`);

    await this.client.execute(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      stock INTEGER NOT NULL
    );`);

    await this.client.execute(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      items_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`);
  }

  async listProducts(): Promise<Product[]> {
    const res = await this.client.execute({
      sql: `SELECT id, name, price, stock FROM products ORDER BY name ASC`,
    });
    return (res.rows || []).map(r => ({
      id: String(r.id),
      name: String(r.name),
      price: Number(r.price),
      stock: Number(r.stock),
      currency: 'USD',
      sku: `SKU${r.id}`,
      trackInventory: true,
      allowBackorder: false,
      images: [],
      hasVariants: false,
      slug: String(r.name).toLowerCase().replace(/\s+/g, '-'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  async getProducts(): Promise<Product[]> {
    return this.listProducts();
  }

  async getProduct(id: string): Promise<Product | null> {
    const res = await this.client.execute({
      sql: `SELECT id, name, price, stock FROM products WHERE id = ? LIMIT 1`,
      args: [id],
    });
    const row = (res.rows && res.rows[0]) || null;
    return row ? { 
      id: String(row.id), 
      name: String(row.name), 
      price: Number(row.price), 
      stock: Number(row.stock),
      currency: 'USD',
      sku: `SKU${row.id}`,
      trackInventory: true,
      allowBackorder: false,
      images: [],
      hasVariants: false,
      slug: String(row.name).toLowerCase().replace(/\s+/g, '-'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } : null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.getProduct(id);
  }

  async decreaseInventory(id: string, amount: number): Promise<Product | null> {
    await this.client.execute({
      sql: `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`,
      args: [amount, id, amount],
    });
    
    return this.getProduct(id);
  }

  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    const now = new Date().toISOString();
    const json = JSON.stringify(orderData.items);
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await this.client.execute({
      sql: `INSERT INTO orders (id, user_id, items_json, created_at) VALUES (?, ?, ?, ?)`,
      args: [orderId, orderData.userId, json, now],
    });

    return {
      id: orderId,
      ...orderData
    };
  }

  async getOrderById(id: string): Promise<Order | null> {
    const res = await this.client.execute({
      sql: `SELECT id, user_id as userId, items_json as items, created_at FROM orders WHERE id = ? LIMIT 1`,
      args: [id],
    });

    const row = (res.rows && res.rows[0]) || null;
    if (!row) return null;

    return {
      id: String(row.id),
      orderNumber: `#${row.id}`,
      userId: String(row.userId),
      items: JSON.parse(String(row.items)),
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
    const res = await this.client.execute({
      sql: `SELECT id, user_id as userId, items_json as items, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      args: [userId],
    });

    return (res.rows || []).map(r => ({
      id: String(r.id),
      orderNumber: `#${r.id}`,
      userId: String(r.userId),
      items: JSON.parse(String(r.items)),
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