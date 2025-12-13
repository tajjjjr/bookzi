import { randomUUID } from 'crypto';
import { ProductRepository, AttachmentRepository } from '../repositories/index.js';
import { products } from '../db/schema.js';

export class ProductService {
  private productRepo: ProductRepository;
  private attachmentRepo: AttachmentRepository;

  constructor() {
    this.productRepo = new ProductRepository();
    this.attachmentRepo = new AttachmentRepository();
  }

  async getProducts() {
    return await this.productRepo.findActive();
  }

  async getProductById(id: string) {
    return await this.productRepo.findById(id);
  }

  async createProduct(productData: Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await this.productRepo.create({
      id: randomUUID(),
      ...productData,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateProduct(id: string, productData: Partial<typeof products.$inferInsert>) {
    const updatedData = {
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    return await this.productRepo.update(id, updatedData);
  }

  async deleteProduct(id: string) {
    await this.productRepo.delete(id);
    return true;
  }

  async addProductImage(productId: string, attachmentId: string, position = 0, isDefault = false) {
    await this.attachmentRepo.linkToProduct(productId, attachmentId, position, isDefault);
  }

  async removeProductImage(productId: string, attachmentId: string) {
    await this.attachmentRepo.unlinkFromProduct(productId, attachmentId);
  }

  async setDefaultImage(productId: string, attachmentId: string) {
    // This would need more complex logic to unset other defaults first
    // For now, just link as default
    await this.attachmentRepo.linkToProduct(productId, attachmentId, 0, true);
    return true;
  }
}