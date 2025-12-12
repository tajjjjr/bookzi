import { eq, and } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { attachments, productImages } from '../db/schema.js';

export class AttachmentRepository {
  async create(attachmentData: typeof attachments.$inferInsert) {
    const [attachment] = await db.insert(attachments).values(attachmentData).returning();
    return attachment;
  }

  async findById(id: string) {
    const [attachment] = await db.select().from(attachments).where(eq(attachments.id, id));
    return attachment;
  }

  async findByEntity(entityType: string, entityId: string) {
    return db.select().from(attachments).where(
      and(eq(attachments.entityType, entityType), eq(attachments.entityId, entityId))
    );
  }

  async update(id: string, attachmentData: Partial<typeof attachments.$inferInsert>) {
    const [attachment] = await db.update(attachments).set(attachmentData).where(eq(attachments.id, id)).returning();
    return attachment;
  }

  async delete(id: string) {
    await db.delete(attachments).where(eq(attachments.id, id));
  }

  async findAll() {
    return db.select().from(attachments);
  }

  async linkToProduct(productId: string, attachmentId: string, position = 0, isDefault = false) {
    await db.insert(productImages).values({
      productId,
      attachmentId,
      position,
      isDefault
    });
  }

  async unlinkFromProduct(productId: string, attachmentId: string) {
    await db.delete(productImages).where(
      and(eq(productImages.productId, productId), eq(productImages.attachmentId, attachmentId))
    );
  }
}