import { BaseOrderManagementAdapter } from './abstract.js';
import {
  Order,
  OrderItem,
  CreateOrderInput,
  UpdateOrderInput,
  OrderFilters,
  OrderSortOptions,
  PaginationOptions,
  PaginatedResult,
  OrderStats,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
} from '../../types/models.js';
import { SQLiteAdapter } from '../sqlite/sqlite.adapter.js';

export class SQLiteOrderManagementAdapter extends BaseOrderManagementAdapter {
  constructor(private db: SQLiteAdapter) {
    super();
  }

  async createOrder(data: CreateOrderInput): Promise<Order> {
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const orderNumber = this.generateOrderNumber();
    
    const orderItems = data.items.map(item => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      ...item
    }));
    
    const order: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
      items: orderItems
    };

    const stmt = this.db.getDatabase().prepare(`
      INSERT INTO orders_new (id, orderNumber, userId, items, subtotal, discount, discountCode, tax, shippingCost, total, currency, paymentStatus, fulfillmentStatus, shippingAddress, billingAddress, shippingMethod, trackingNumber, trackingUrl, customerEmail, customerPhone, notes, internalNotes, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      order.id,
      order.orderNumber,
      order.userId,
      JSON.stringify(order.items),
      order.subtotal,
      order.discount || null,
      order.discountCode || null,
      order.tax,
      order.shippingCost,
      order.total,
      order.currency,
      order.paymentStatus,
      order.fulfillmentStatus,
      order.shippingAddress ? JSON.stringify(order.shippingAddress) : null,
      order.billingAddress ? JSON.stringify(order.billingAddress) : null,
      order.shippingMethod || null,
      order.trackingNumber || null,
      order.trackingUrl || null,
      order.customerEmail,
      order.customerPhone || null,
      order.notes || null,
      order.internalNotes || null,
      order.status,
      order.createdAt.toISOString(),
      order.updatedAt.toISOString()
    );

    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const stmt = this.db.getDatabase().prepare('SELECT * FROM orders_new WHERE id = ?');
    const row = stmt.get(id) as Record<string, unknown> | undefined;
    if (!row) return null;
    return this.mapRowToOrder(row);
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<Order | null> {
    const stmt = this.db.getDatabase().prepare('SELECT * FROM orders_new WHERE orderNumber = ?');
    const row = stmt.get(orderNumber) as Record<string, unknown> | undefined;
    if (!row) return null;
    return this.mapRowToOrder(row);
  }

  async getOrders(filters?: OrderFilters, sort?: OrderSortOptions, pagination?: PaginationOptions): Promise<PaginatedResult<Order>> {
    let sql = 'SELECT * FROM orders_new WHERE 1=1';
    const params: (string | number)[] = [];

    if (filters?.userId) {
      sql += ' AND userId = ?';
      params.push(filters.userId);
    }

    if (sort) {
      sql += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    if (pagination) {
      const offset = (pagination.page - 1) * pagination.limit;
      sql += ' LIMIT ? OFFSET ?';
      params.push(pagination.limit, offset);
    }

    const rows = this.db.getDatabase().prepare(sql).all(...params) as Record<string, unknown>[];
    const orders = rows.map(row => this.mapRowToOrder(row));

    const countSql = 'SELECT COUNT(*) as count FROM orders_new WHERE 1=1';
    const countRow = this.db.getDatabase().prepare(countSql).get() as { count: number };
    const total = countRow.count;

    return {
      data: orders,
      total,
      page: pagination?.page || 1,
      limit: pagination?.limit || orders.length,
      totalPages: pagination ? Math.ceil(total / pagination.limit) : 1
    };
  }

  async getOrdersByUserId(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Order>> {
    return this.getOrders({ userId }, undefined, pagination);
  }

  async updateOrder(id: string, data: UpdateOrderInput): Promise<Order | null> {
    const existing = await this.getOrderById(id);
    if (!existing) return null;

    const updated = { ...existing, ...data, updatedAt: new Date() };
    
    const stmt = this.db.getDatabase().prepare(`
      UPDATE orders_new SET 
        subtotal = ?, discount = ?, discountCode = ?, tax = ?, shippingCost = ?, total = ?, 
        paymentStatus = ?, fulfillmentStatus = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `);

    stmt.run(
      updated.subtotal,
      updated.discount || null,
      updated.discountCode || null,
      updated.tax,
      updated.shippingCost,
      updated.total,
      updated.paymentStatus,
      updated.fulfillmentStatus,
      updated.status,
      updated.updatedAt.toISOString(),
      id
    );

    return updated;
  }

  async deleteOrder(id: string): Promise<boolean> {
    const stmt = this.db.getDatabase().prepare('DELETE FROM orders_new WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    return this.updateOrder(orderId, { status });
  }

  async updatePaymentStatus(orderId: string, status: PaymentStatus, paidAt?: Date): Promise<Order | null> {
    const updateData: UpdateOrderInput = { paymentStatus: status };
    if (paidAt) updateData.paidAt = paidAt;
    return this.updateOrder(orderId, updateData);
  }

  async updateFulfillmentStatus(orderId: string, status: FulfillmentStatus): Promise<Order | null> {
    return this.updateOrder(orderId, { fulfillmentStatus: status });
  }

  async markOrderAsPaid(orderId: string, paymentIntentId?: string): Promise<Order | null> {
    const updateData: UpdateOrderInput = { 
      paymentStatus: PaymentStatus.PAID, 
      paidAt: new Date() 
    };
    if (paymentIntentId) updateData.paymentIntentId = paymentIntentId;
    return this.updateOrder(orderId, updateData);
  }

  async markOrderAsShipped(orderId: string, trackingNumber?: string, trackingUrl?: string): Promise<Order | null> {
    return this.updateOrder(orderId, { 
      status: OrderStatus.SHIPPED,
      fulfillmentStatus: FulfillmentStatus.SHIPPED,
      trackingNumber,
      trackingUrl,
      shippedAt: new Date()
    });
  }

  async markOrderAsDelivered(orderId: string): Promise<Order | null> {
    return this.updateOrder(orderId, { 
      status: OrderStatus.DELIVERED,
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
      deliveredAt: new Date()
    });
  }

  async cancelOrder(orderId: string, reason?: string): Promise<Order | null> {
    return this.updateOrder(orderId, { 
      status: OrderStatus.CANCELLED,
      cancelledAt: new Date(),
      internalNotes: reason
    });
  }

  // Minimal implementations for remaining methods
  async addOrderItem(): Promise<OrderItem> { throw new Error('Not implemented'); }
  async updateOrderItem(): Promise<OrderItem | null> { throw new Error('Not implemented'); }
  async removeOrderItem(): Promise<boolean> { throw new Error('Not implemented'); }
  async getOrderItems(): Promise<OrderItem[]> { throw new Error('Not implemented'); }
  async fulfillOrderItems(): Promise<boolean> { throw new Error('Not implemented'); }
  async processRefund(): Promise<Order | null> { throw new Error('Not implemented'); }
  async getOrderRefunds(): Promise<Array<{ amount: number; items?: OrderItem[]; reason?: string; processedAt: Date }>> { throw new Error('Not implemented'); }
  async orderExists(id: string): Promise<boolean> { return !!(await this.getOrderById(id)); }
  async orderNumberExists(orderNumber: string): Promise<boolean> { return !!(await this.getOrderByOrderNumber(orderNumber)); }
  async canCancelOrder(): Promise<boolean> { return true; }
  async canRefundOrder(): Promise<boolean> { return true; }
  async bulkUpdateOrderStatus(): Promise<number> { throw new Error('Not implemented'); }
  async bulkUpdateFulfillmentStatus(): Promise<number> { throw new Error('Not implemented'); }
  async bulkCancelOrders(): Promise<number> { throw new Error('Not implemented'); }
  async getOrderStats(): Promise<OrderStats> { throw new Error('Not implemented'); }
  async getTotalRevenue(): Promise<number> { throw new Error('Not implemented'); }
  async getAverageOrderValue(): Promise<number> { throw new Error('Not implemented'); }
  async getOrderCountByStatus(): Promise<number> { throw new Error('Not implemented'); }
  async getTopSellingProducts(): Promise<Array<{ productId: string; productName: string; totalQuantity: number; totalRevenue: number }>> { throw new Error('Not implemented'); }
  async getOrdersNeedingAttention(): Promise<Order[]> { throw new Error('Not implemented'); }
  async searchOrders(): Promise<Order[]> { throw new Error('Not implemented'); }
  async getRecentOrders(): Promise<Order[]> { throw new Error('Not implemented'); }
  async getPendingFulfillmentOrders(): Promise<Order[]> { throw new Error('Not implemented'); }
  async getPaymentIssueOrders(): Promise<Order[]> { throw new Error('Not implemented'); }
  async getCustomerOrderHistory(): Promise<Order[]> { throw new Error('Not implemented'); }
  async getCustomerTotalSpending(): Promise<number> { throw new Error('Not implemented'); }
  async getCustomerOrderCount(): Promise<number> { throw new Error('Not implemented'); }

  private mapRowToOrder(row: Record<string, unknown>): Order {
    return {
      id: String(row.id),
      orderNumber: String(row.orderNumber),
      userId: String(row.userId),
      items: JSON.parse(String(row.items || '[]')),
      subtotal: Number(row.subtotal),
      discount: row.discount ? Number(row.discount) : undefined,
      discountCode: row.discountCode ? String(row.discountCode) : undefined,
      tax: Number(row.tax),
      shippingCost: Number(row.shippingCost),
      total: Number(row.total),
      currency: String(row.currency),
      paymentStatus: row.paymentStatus as PaymentStatus,
      fulfillmentStatus: row.fulfillmentStatus as FulfillmentStatus,
      shippingAddress: row.shippingAddress ? JSON.parse(String(row.shippingAddress)) : undefined,
      billingAddress: row.billingAddress ? JSON.parse(String(row.billingAddress)) : undefined,
      shippingMethod: row.shippingMethod ? String(row.shippingMethod) : undefined,
      trackingNumber: row.trackingNumber ? String(row.trackingNumber) : undefined,
      trackingUrl: row.trackingUrl ? String(row.trackingUrl) : undefined,
      customerEmail: String(row.customerEmail),
      customerPhone: row.customerPhone ? String(row.customerPhone) : undefined,
      notes: row.notes ? String(row.notes) : undefined,
      internalNotes: row.internalNotes ? String(row.internalNotes) : undefined,
      status: row.status as OrderStatus,
      createdAt: new Date(String(row.createdAt)),
      updatedAt: new Date(String(row.updatedAt)),
      paidAt: row.paidAt ? new Date(String(row.paidAt)) : undefined,
      shippedAt: row.shippedAt ? new Date(String(row.shippedAt)) : undefined,
      deliveredAt: row.deliveredAt ? new Date(String(row.deliveredAt)) : undefined,
      cancelledAt: row.cancelledAt ? new Date(String(row.cancelledAt)) : undefined,
      refundedAt: row.refundedAt ? new Date(String(row.refundedAt)) : undefined
    };
  }
}