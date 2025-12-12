import { randomUUID } from 'crypto';
import { OrderRepository } from '../repositories/index.js';
import { orders } from '../db/schema.js';

export class OrderService {
  private orderRepo: OrderRepository;

  constructor() {
    this.orderRepo = new OrderRepository();
  }

  async createOrder(orderData: Omit<typeof orders.$inferInsert, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const orderNumber = `ORD-${Date.now()}`;
    
    return await this.orderRepo.create({
      id: randomUUID(),
      orderNumber,
      ...orderData,
      createdAt: now,
      updatedAt: now,
    });
  }

  async getOrderById(id: string) {
    return await this.orderRepo.findById(id);
  }

  async getOrdersByUserId(userId: string, options?: { page?: number; limit?: number }) {
    const orders = await this.orderRepo.findByUserId(userId);
    return {
      orders,
      total: orders.length,
      page: options?.page || 1,
      limit: options?.limit || 10
    };
  }

  async updateOrderStatus(id: string, status: string) {
    const updatedData = {
      status,
      updatedAt: new Date().toISOString(),
    };
    return await this.orderRepo.update(id, updatedData);
  }

  async cancelOrder(id: string, reason?: string) {
    const updatedData = {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      notes: reason || null,
      updatedAt: new Date().toISOString(),
    };
    return await this.orderRepo.update(id, updatedData);
  }
}