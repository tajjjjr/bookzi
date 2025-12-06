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

// ============================================================================
// Order Management Adapter Interface
// ============================================================================

export interface OrderManagementAdapter {
  // ============================================================================
  // Order CRUD Operations
  // ============================================================================
  
  /**
   * Create a new order
   */
  createOrder(data: CreateOrderInput): Promise<Order>;
  
  /**
   * Get a single order by ID
   */
  getOrderById(id: string): Promise<Order | null>;
  
  /**
   * Get a single order by order number
   */
  getOrderByOrderNumber(orderNumber: string): Promise<Order | null>;
  
  /**
   * Get all orders with optional filtering, sorting, and pagination
   */
  getOrders(
    filters?: OrderFilters,
    sort?: OrderSortOptions,
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<Order>>;
  
  /**
   * Get all orders for a specific user
   */
  getOrdersByUserId(userId: string, pagination?: PaginationOptions): Promise<PaginatedResult<Order>>;
  
  /**
   * Update an order
   */
  updateOrder(id: string, data: UpdateOrderInput): Promise<Order | null>;
  
  /**
   * Delete an order (soft delete recommended)
   */
  deleteOrder(id: string): Promise<boolean>;
  
  // ============================================================================
  // Order Status Management
  // ============================================================================
  
  /**
   * Update order status
   */
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null>;
  
  /**
   * Update payment status
   */
  updatePaymentStatus(orderId: string, status: PaymentStatus, paidAt?: Date): Promise<Order | null>;
  
  /**
   * Update fulfillment status
   */
  updateFulfillmentStatus(orderId: string, status: FulfillmentStatus): Promise<Order | null>;
  
  /**
   * Mark order as paid
   */
  markOrderAsPaid(orderId: string, paymentIntentId?: string): Promise<Order | null>;
  
  /**
   * Mark order as shipped
   */
  markOrderAsShipped(orderId: string, trackingNumber?: string, trackingUrl?: string): Promise<Order | null>;
  
  /**
   * Mark order as delivered
   */
  markOrderAsDelivered(orderId: string): Promise<Order | null>;
  
  /**
   * Cancel an order
   */
  cancelOrder(orderId: string, reason?: string, restockItems?: boolean): Promise<Order | null>;
  
  // ============================================================================
  // Order Item Operations
  // ============================================================================
  
  /**
   * Add an item to an existing order
   */
  addOrderItem(orderId: string, item: Omit<OrderItem, 'id' | 'orderId'>): Promise<OrderItem>;
  
  /**
   * Update an order item
   */
  updateOrderItem(itemId: string, data: Partial<Omit<OrderItem, 'id' | 'orderId'>>): Promise<OrderItem | null>;
  
  /**
   * Remove an item from an order
   */
  removeOrderItem(itemId: string): Promise<boolean>;
  
  /**
   * Get all items for an order
   */
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  
  /**
   * Mark order items as fulfilled
   */
  fulfillOrderItems(orderId: string, itemIds: string[]): Promise<boolean>;
  
  // ============================================================================
  // Refund Operations
  // ============================================================================
  
  /**
   * Process a full or partial refund
   */
  processRefund(refund: RefundInput): Promise<Order | null>;
  
  /**
   * Get refund history for an order
   */
  getOrderRefunds(orderId: string): Promise<Array<{
    amount: number;
    items?: OrderItem[];
    reason?: string;
    processedAt: Date;
  }>>;
  
  // ============================================================================
  // Order Existence & Validation
  // ============================================================================
  
  /**
   * Check if an order exists by ID
   */
  orderExists(id: string): Promise<boolean>;
  
  /**
   * Check if an order number is already in use
   */
  orderNumberExists(orderNumber: string): Promise<boolean>;
  
  /**
   * Validate order can be cancelled
   */
  canCancelOrder(orderId: string): Promise<boolean>;
  
  /**
   * Validate order can be refunded
   */
  canRefundOrder(orderId: string): Promise<boolean>;
  
  // ============================================================================
  // Bulk Operations
  // ============================================================================
  
  /**
   * Bulk update order statuses
   */
  bulkUpdateOrderStatus(orderIds: string[], status: OrderStatus): Promise<number>;
  
  /**
   * Bulk update fulfillment status
   */
  bulkUpdateFulfillmentStatus(orderIds: string[], status: FulfillmentStatus): Promise<number>;
  
  /**
   * Bulk cancel orders
   */
  bulkCancelOrders(orderIds: string[], reason?: string): Promise<number>;
  
  // ============================================================================
  // Analytics & Reporting
  // ============================================================================
  
  /**
   * Get order statistics for a date range
   */
  getOrderStats(dateFrom?: Date, dateTo?: Date): Promise<OrderStats>;
  
  /**
   * Get total revenue for a date range
   */
  getTotalRevenue(dateFrom?: Date, dateTo?: Date): Promise<number>;
  
  /**
   * Get average order value
   */
  getAverageOrderValue(dateFrom?: Date, dateTo?: Date): Promise<number>;
  
  /**
   * Get orders by status count
   */
  getOrderCountByStatus(status: OrderStatus, dateFrom?: Date, dateTo?: Date): Promise<number>;
  
  /**
   * Get top selling products from orders
   */
  getTopSellingProducts(limit?: number, dateFrom?: Date, dateTo?: Date): Promise<Array<{
    productId: string;
    productName: string;
    totalQuantity: number;
    totalRevenue: number;
  }>>;
  
  /**
   * Get orders that need attention (unfulfilled after X days, payment issues, etc.)
   */
  getOrdersNeedingAttention(): Promise<Order[]>;
  
  // ============================================================================
  // Search & Discovery
  // ============================================================================
  
  /**
   * Search orders by order number, customer email, or tracking number
   */
  searchOrders(query: string, filters?: OrderFilters): Promise<Order[]>;
  
  /**
   * Get recent orders
   */
  getRecentOrders(limit?: number): Promise<Order[]>;
  
  /**
   * Get orders pending fulfillment
   */
  getPendingFulfillmentOrders(): Promise<Order[]>;
  
  /**
   * Get orders with payment issues
   */
  getPaymentIssueOrders(): Promise<Order[]>;
  
  // ============================================================================
  // Customer Order History
  // ============================================================================
  
  /**
   * Get customer's order history
   */
  getCustomerOrderHistory(userId: string, limit?: number): Promise<Order[]>;
  
  /**
   * Get customer's total spending
   */
  getCustomerTotalSpending(userId: string): Promise<number>;
  
  /**
   * Get customer's order count
   */
  getCustomerOrderCount(userId: string): Promise<number>;
}
