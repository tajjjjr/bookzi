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

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: string;
  items: OrderItem[];
  total?: number;
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
