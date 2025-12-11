import { eq } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { products } from '../db/schema.js';

export class ProductRepository {
  async create(productData: typeof products.$inferInsert) {
    const [product] = await db.insert(products).values(productData).returning();
    return product;
  }

  async findById(id: string) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async findBySku(sku: string) {
    const [product] = await db.select().from(products).where(eq(products.sku, sku));
    return product;
  }

  async findBySlug(slug: string) {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async update(id: string, productData: Partial<typeof products.$inferInsert>) {
    const [product] = await db.update(products).set(productData).where(eq(products.id, id)).returning();
    return product;
  }

  async delete(id: string) {
    await db.delete(products).where(eq(products.id, id));
  }

  async findAll() {
    return db.select().from(products);
  }

  async findActive() {
    return db.select().from(products).where(eq(products.isActive, true));
  }
}