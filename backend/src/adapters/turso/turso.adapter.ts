import { createClient, Client } from "@libsql/client";
import { DBAdapter, Product, Order } from "../interfaces/DBAdapter.ts";

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
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      items_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`);
  }

  async listProducts(): Promise<Product[]> {
    const res = await this.client.execute({
      sql: `SELECT id, name, price, stock FROM products ORDER BY name ASC`,
    });
    return (res.rows || []).map(r => ({
      id: Number(r.id),
      name: String(r.name),
      price: Number(r.price),
      stock: Number(r.stock),
    }));
  }

  async getProducts(): Promise<Product[]> {
    return this.listProducts();
  }

  async getProduct(id: number): Promise<Product | null> {
    const res = await this.client.execute({
      sql: `SELECT id, name, price, stock FROM products WHERE id = ? LIMIT 1`,
      args: [id],
    });
    const row = (res.rows && res.rows[0]) || null;
    return row ? { 
      id: Number(row.id), 
      name: String(row.name), 
      price: Number(row.price), 
      stock: Number(row.stock) 
    } : null;
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.getProduct(id);
  }

  async decreaseInventory(id: number, amount: number): Promise<Product | null> {
    await this.client.execute({
      sql: `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`,
      args: [amount, id, amount],
    });
    
    return this.getProduct(id);
  }

  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    const now = new Date().toISOString();
    const json = JSON.stringify(orderData.items);

    const res = await this.client.execute({
      sql: `INSERT INTO orders (user_id, items_json, created_at) VALUES (?, ?, ?) RETURNING id`,
      args: [orderData.userId, json, now],
    });

    const id = Number(res.rows[0].id);

    return {
      id,
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total
    };
  }

  async getOrderById(id: number): Promise<Order | null> {
    const res = await this.client.execute({
      sql: `SELECT id, user_id as userId, items_json as items, created_at FROM orders WHERE id = ? LIMIT 1`,
      args: [id],
    });

    const row = (res.rows && res.rows[0]) || null;
    if (!row) return null;

    return {
      id: Number(row.id),
      userId: Number(row.userId),
      items: JSON.parse(String(row.items))
    };
  }

  async listOrdersForUser(userId: number): Promise<Order[]> {
    const res = await this.client.execute({
      sql: `SELECT id, user_id as userId, items_json as items, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      args: [userId],
    });

    return (res.rows || []).map(r => ({
      id: Number(r.id),
      userId: Number(r.userId),
      items: JSON.parse(String(r.items))
    }));
  }
}