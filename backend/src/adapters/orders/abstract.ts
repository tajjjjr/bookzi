import {
  Order,
  OrderItem,
  CreateOrderInput,
  UpdateOrderInput,
  OrderFilters,
  OrderSortOptions,
  PaginationOptions,
  PaginatedResult,
  RefundInput,
  OrderStats,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
} from '../../types/models.js';
import { OrderManagementAdapter } from '../interfaces/OrderManagementAdapter.js';


export abstract class BaseOrderManagementAdapter implements OrderManagementAdapter {
  // All methods must be implemented by the concrete adapter
  abstract createOrder(data: CreateOrderInput): Promise<Order>;
  abstract getOrderById(id: string): Promise<Order | null>;
  abstract getOrderByOrderNumber(orderNumber: string): Promise<Order | null>;
  abstract getOrders(filters?: OrderFilters, sort?: OrderSortOptions, pagination?: PaginationOptions): Promise<PaginatedResult<Order>>;
  abstract getOrdersByUserId(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Order>>;
  abstract updateOrder(id: string, data: UpdateOrderInput): Promise<Order | null>;
  abstract deleteOrder(id: string): Promise<boolean>;
  abstract updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null>;
  abstract updatePaymentStatus(orderId: string, status: PaymentStatus, paidAt?: Date): Promise<Order | null>;
  abstract updateFulfillmentStatus(orderId: string, status: FulfillmentStatus): Promise<Order | null>;
  abstract markOrderAsPaid(orderId: string, paymentIntentId?: string): Promise<Order | null>;
  abstract markOrderAsShipped(orderId: string, trackingNumber?: string, trackingUrl?: string): Promise<Order | null>;
  abstract markOrderAsDelivered(orderId: string): Promise<Order | null>;
  abstract cancelOrder(orderId: string, reason?: string, restockItems?: boolean): Promise<Order | null>;
  abstract addOrderItem(orderId: string, item: Omit<OrderItem, 'id' | 'orderId'>): Promise<OrderItem>;
  abstract updateOrderItem(itemId: string, data: Partial<Omit<OrderItem, 'id' | 'orderId'>>): Promise<OrderItem | null>;
  abstract removeOrderItem(itemId: string): Promise<boolean>;
  abstract getOrderItems(orderId: string): Promise<OrderItem[]>;
  abstract fulfillOrderItems(orderId: string, itemIds: string[]): Promise<boolean>;
  abstract processRefund(refund: RefundInput): Promise<Order | null>;
  abstract getOrderRefunds(orderId: string): Promise<Array<{ amount: number; items?: OrderItem[]; reason?: string; processedAt: Date }>>;
  abstract orderExists(id: string): Promise<boolean>;
  abstract orderNumberExists(orderNumber: string): Promise<boolean>;
  abstract canCancelOrder(orderId: string): Promise<boolean>;
  abstract canRefundOrder(orderId: string): Promise<boolean>;
  abstract bulkUpdateOrderStatus(orderIds: string[], status: OrderStatus): Promise<number>;
  abstract bulkUpdateFulfillmentStatus(orderIds: string[], status: FulfillmentStatus): Promise<number>;
  abstract bulkCancelOrders(orderIds: string[], reason?: string): Promise<number>;
  abstract getOrderStats(dateFrom?: Date, dateTo?: Date): Promise<OrderStats>;
  abstract getTotalRevenue(dateFrom?: Date, dateTo?: Date): Promise<number>;
  abstract getAverageOrderValue(dateFrom?: Date, dateTo?: Date): Promise<number>;
  abstract getOrderCountByStatus(status: OrderStatus, dateFrom?: Date, dateTo?: Date): Promise<number>;
  abstract getTopSellingProducts(limit?: number, dateFrom?: Date, dateTo?: Date): Promise<Array<{ productId: string; productName: string; totalQuantity: number; totalRevenue: number }>>;
  abstract getOrdersNeedingAttention(): Promise<Order[]>;
  abstract searchOrders(query: string, filters?: OrderFilters): Promise<Order[]>;
  abstract getRecentOrders(limit?: number): Promise<Order[]>;
  abstract getPendingFulfillmentOrders(): Promise<Order[]>;
  abstract getPaymentIssueOrders(): Promise<Order[]>;
  abstract getCustomerOrderHistory(userId: string, limit?: number): Promise<Order[]>;
  abstract getCustomerTotalSpending(userId: string): Promise<number>;
  abstract getCustomerOrderCount(userId: string): Promise<number>;
  
  // Helper method for validation
  protected async ensureOrderExists(id: string): Promise<void> {
    const exists = await this.orderExists(id);
    if (!exists) {
      throw new Error(`Order with id ${id} does not exist`);
    }
  }
  
  // Helper method to generate unique order numbers
  protected generateOrderNumber(): string {
    // Implementation can vary (e.g., #1001, ORD-2024-001, etc.)
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `#${timestamp}${random}`;
  }
  
  // Helper method to calculate order total
  protected calculateOrderTotal(items: OrderItem[], shippingCost: number, tax: number, discount: number = 0): number {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    return subtotal - discount + tax + shippingCost;
  }
  
  // Helper method to validate refund
  protected async validateRefund(orderId: string, amount: number): Promise<void> {
    const order = await this.getOrderById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} does not exist`);
    }
    if (order.paymentStatus !== PaymentStatus.PAID) {
      throw new Error('Order must be paid to process refund');
    }
    if (amount > order.total) {
      throw new Error('Refund amount cannot exceed order total');
    }
  }
}
