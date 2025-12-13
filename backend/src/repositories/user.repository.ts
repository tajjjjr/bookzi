import { eq } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { users } from '../db/schema.js';

export class UserRepository {
  async create(userData: typeof users.$inferInsert) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async findById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async update(id: string, userData: Partial<typeof users.$inferInsert>) {
    const [user] = await db.update(users).set(userData).where(eq(users.id, id)).returning();
    return user;
  }

  async delete(id: string) {
    await db.delete(users).where(eq(users.id, id));
  }

  async findAll() {
    return db.select().from(users);
  }
}