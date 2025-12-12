import { eq, and } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { reviews } from '../db/schema.js';

export class ReviewRepository {
  async create(reviewData: typeof reviews.$inferInsert) {
    const [review] = await db.insert(reviews).values(reviewData).returning();
    return review;
  }

  async findById(id: string) {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async findByProductId(productId: string) {
    return db.select().from(reviews).where(eq(reviews.productId, productId));
  }

  async findByUserAndProduct(userId: string, productId: string) {
    const [review] = await db.select().from(reviews).where(
      and(eq(reviews.userId, userId), eq(reviews.productId, productId))
    );
    return review;
  }

  async update(id: string, reviewData: Partial<typeof reviews.$inferInsert>) {
    const [review] = await db.update(reviews).set(reviewData).where(eq(reviews.id, id)).returning();
    return review;
  }

  async delete(id: string) {
    await db.delete(reviews).where(eq(reviews.id, id));
  }
}