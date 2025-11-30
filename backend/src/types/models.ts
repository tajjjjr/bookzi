export interface User {
  id: string; // UUID
  name: string;
  email: string;
  password: string; // Should be hashed
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  isActive?: boolean;
}

export interface Product {
  id: string; // UUID
  name: string;
  description?: string;
  price: number; // Base price in smallest currency unit (e.g., cents)
  compareAtPrice?: number; // Original price for showing discounts
  currency: string; // ISO 4217 currency code (e.g., "USD", "EUR")
  
  // Inventory
  sku: string; // Stock Keeping Unit (unique identifier)
  barcode?: string; // UPC, EAN, ISBN, etc.
  serialNumber?: string; // For individual item tracking
  stock: number;
  lowStockThreshold?: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  
  // Media
  images: ProductImage[];
  
  // Organization
  categoryId?: string;
  tags?: string[];
  brand?: string;
  vendor?: string;
  
  // Physical attributes
  weight?: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  
  // Variants (for products with options like size, color)
  hasVariants: boolean;
  variants?: ProductVariant[];
  
  // SEO & Marketing
  slug: string; // URL-friendly identifier
  metaTitle?: string;
  metaDescription?: string;
  
  // Status
  isActive: boolean;
  isFeatured?: boolean;
  isDigital?: boolean; // Digital products (no shipping)
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number; // Display order
  isDefault: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string; // e.g., "Small / Red"
  sku: string;
  barcode?: string;
  price?: number; // Override product price if different
  compareAtPrice?: number;
  stock: number;
  options: VariantOption[]; // e.g., [{name: "Size", value: "Small"}, {name: "Color", value: "Red"}]
  image?: ProductImage;
  isActive: boolean;
}

export interface VariantOption {
  name: string; // e.g., "Size", "Color"
  value: string; // e.g., "Small", "Red"
}

export interface Attachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number; // bytes
  url: string;
  path: string; // local file path or cloud key
  entityType?: string; // 'product', 'user', etc.
  entityId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Order Types
// ============================================================================

export interface Order {
  id: string; // UUID
  orderNumber: string; // Human-readable order number (e.g., "#1001")
  userId: string;
  
  // Order items
  items: OrderItem[];
  
  // Pricing
  subtotal: number; // Sum of all items before discounts/taxes/shipping
  discount?: number;
  discountCode?: string;
  tax: number;
  shippingCost: number;
  total: number; // Final amount charged
  currency: string;
  
  // Payment
  paymentStatus: PaymentStatus;
  paymentMethod?: string; // e.g., "credit_card", "paypal", "stripe"
  paymentIntentId?: string; // External payment provider ID
  
  // Fulfillment
  fulfillmentStatus: FulfillmentStatus;
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethod?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  
  // Customer communication
  customerEmail: string;
  customerPhone?: string;
  notes?: string; // Customer notes
  internalNotes?: string; // Staff notes (not visible to customer)
  
  // Status & Timestamps
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  
  // Product snapshot (in case product details change later)
  productName: string;
  variantName?: string;
  sku: string;
  image?: string;
  
  // Pricing
  quantity: number;
  price: number; // Price per unit at time of order
  subtotal: number; // quantity * price
  discount?: number;
  tax: number;
  total: number;
  
  // Fulfillment
  isFulfilled: boolean;
  isRefunded: boolean;
  refundedQuantity?: number;
  refundAmount?: number;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string; // State/Province
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2 country code
  phone?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum FulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

// ============================================================================
// Order Management Types
// ============================================================================

export type CreateOrderInput = Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'paidAt' | 'shippedAt' | 'deliveredAt' | 'cancelledAt' | 'refundedAt' | 'items'> & {
  items: Omit<OrderItem, 'id' | 'orderId'>[];
};

export type UpdateOrderInput = Partial<Omit<Order, 'id' | 'orderNumber' | 'userId' | 'createdAt' | 'updatedAt' | 'items'>>;

export interface OrderFilters {
  userId?: string;
  status?: OrderStatus | OrderStatus[];
  paymentStatus?: PaymentStatus | PaymentStatus[];
  fulfillmentStatus?: FulfillmentStatus | FulfillmentStatus[];
  discountCode?: string;
  minTotal?: number;
  maxTotal?: number;
  dateFrom?: Date;
  dateTo?: Date;
  customerEmail?: string;
  orderNumber?: string;
  trackingNumber?: string;
}

export interface OrderSortOptions {
  field: 'orderNumber' | 'total' | 'createdAt' | 'updatedAt' | 'paidAt' | 'shippedAt';
  order: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RefundInput {
  orderId: string;
  items?: Array<{
    orderItemId: string;
    quantity: number;
    amount?: number; // Optional partial refund amount
  }>;
  amount?: number; // Total refund amount (if not item-based)
  reason?: string;
  restockItems?: boolean; // Whether to return items to inventory
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
}
