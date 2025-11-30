import { Product, ProductVariant } from "../../types/models.ts";

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'variants'> & {
  variants?: Omit<ProductVariant, 'id' | 'productId'>[];
  imageIds?: string[];
};

export type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'variants'>>;

export interface ProductFilters {
  categoryId?: string;
  tags?: string[];
  brand?: string;
  vendor?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isDigital?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchQuery?: string; // Search in name, description, SKU
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'stock' | 'createdAt' | 'updatedAt';
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

export interface ProductCatalogAdapter {
  // Product CRUD Operations
  createProduct(data: CreateProductInput): Promise<Product>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySku(sku: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProducts(filters?: ProductFilters, sort?: ProductSortOptions, pagination?: PaginationOptions): Promise<PaginatedResult<Product>>;
  updateProduct(id: string, data: UpdateProductInput): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Product Existence & Validation
  productExists(id: string): Promise<boolean>;
  skuExists(sku: string, excludeProductId?: string): Promise<boolean>;
  slugExists(slug: string, excludeProductId?: string): Promise<boolean>;
  
  // Inventory Management
  updateStock(productId: string, quantity: number, variantId?: string): Promise<boolean>;
  adjustStock(productId: string, adjustment: number, variantId?: string): Promise<boolean>;
  getLowStockProducts(): Promise<Product[]>;
  getOutOfStockProducts(): Promise<Product[]>;
  
  // Variant Operations
  createVariant(productId: string, data: Omit<ProductVariant, 'id' | 'productId'>): Promise<ProductVariant>;
  getVariantById(variantId: string): Promise<ProductVariant | null>;
  getVariantsByProductId(productId: string): Promise<ProductVariant[]>;
  updateVariant(variantId: string, data: Partial<Omit<ProductVariant, 'id' | 'productId'>>): Promise<ProductVariant | null>;
  deleteVariant(variantId: string): Promise<boolean>;
  
  // Search & Discovery
  searchProducts(query: string, filters?: ProductFilters): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getRecentProducts(limit?: number): Promise<Product[]>;
  
  // Image Management
  addProductImage(productId: string, attachmentId: string, position?: number, isDefault?: boolean): Promise<boolean>;
  removeProductImage(productId: string, attachmentId: string): Promise<boolean>;
  setDefaultImage(productId: string, attachmentId: string): Promise<boolean>;
}