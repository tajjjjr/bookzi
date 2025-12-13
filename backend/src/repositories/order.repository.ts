import { eq } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { orders } from '../db/schema.js';

export class OrderRepository {
  async create(orderData: typeof orders.$inferInsert) {
    const [order] = await db.insert(orders).values(orderData).returning();
    return order;
  }

  async findById(id: string) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async findByOrderNumber(orderNumber: string) {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return order;
  }

  async findByUserId(userId: string) {
    return db.select().from(orders).where(eq(orders.userId, userId));
  }

  async update(id: string, orderData: Partial<typeof orders.$inferInsert>) {
    const [order] = await db.update(orders).set(orderData).where(eq(orders.id, id)).returning();
    return order;
  }

  async delete(id: string) {
    await db.delete(orders).where(eq(orders.id, id));
  }

  async findAll() {
    return db.select().from(orders);
  }
}