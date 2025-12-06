import { ProductCatalogAdapter, CreateProductInput, UpdateProductInput, ProductFilters, ProductSortOptions, PaginationOptions, PaginatedResult } from "../interfaces/ProductCatalogAdapter.ts";
import { Product, ProductVariant } from "../../types/models.ts";

export abstract class BaseProductCatalogAdapter implements ProductCatalogAdapter {
  // Product CRUD Operations
  abstract createProduct(data: CreateProductInput): Promise<Product>;
  abstract getProductById(id: string): Promise<Product | null>;
  abstract getProductBySku(sku: string): Promise<Product | null>;
  abstract getProductBySlug(slug: string): Promise<Product | null>;
  abstract getProducts(filters?: ProductFilters, sort?: ProductSortOptions, pagination?: PaginationOptions): Promise<PaginatedResult<Product>>;
  abstract updateProduct(id: string, data: UpdateProductInput): Promise<Product | null>;
  abstract deleteProduct(id: string): Promise<boolean>;
  
  // Product Existence & Validation
  abstract productExists(id: string): Promise<boolean>;
  abstract skuExists(sku: string, excludeProductId?: string): Promise<boolean>;
  abstract slugExists(slug: string, excludeProductId?: string): Promise<boolean>;
  
  // Inventory Management
  abstract updateStock(productId: string, quantity: number, variantId?: string): Promise<boolean>;
  abstract adjustStock(productId: string, adjustment: number, variantId?: string): Promise<boolean>;
  abstract getLowStockProducts(): Promise<Product[]>;
  abstract getOutOfStockProducts(): Promise<Product[]>;
  
  // Variant Operations
  abstract createVariant(productId: string, data: Omit<ProductVariant, 'id' | 'productId'>): Promise<ProductVariant>;
  abstract getVariantById(variantId: string): Promise<ProductVariant | null>;
  abstract getVariantsByProductId(productId: string): Promise<ProductVariant[]>;
  abstract updateVariant(variantId: string, data: Partial<Omit<ProductVariant, 'id' | 'productId'>>): Promise<ProductVariant | null>;
  abstract deleteVariant(variantId: string): Promise<boolean>;
  
  // Search & Discovery
  abstract searchProducts(query: string, filters?: ProductFilters): Promise<Product[]>;
  abstract getFeaturedProducts(limit?: number): Promise<Product[]>;
  abstract getRecentProducts(limit?: number): Promise<Product[]>;
  abstract addProductImage(productId: string, attachmentId: string, position?: number, isDefault?: boolean): Promise<boolean>;
  abstract removeProductImage(productId: string, attachmentId: string): Promise<boolean>;
  abstract setDefaultImage(productId: string, attachmentId: string): Promise<boolean>;
  
  // Helper method for validation
  protected async ensureProductExists(id: string): Promise<void> {
    const exists = await this.productExists(id);
    if (!exists) {
      throw new Error(`Product with id ${id} does not exist`);
    }
  }
  
  // Helper method for SKU validation
  protected async ensureSkuUnique(sku: string, excludeProductId?: string): Promise<void> {
    const exists = await this.skuExists(sku, excludeProductId);
    if (exists) {
      throw new Error(`SKU ${sku} is already in use`);
    }
  }
  
  // Helper method for slug validation
  protected async ensureSlugUnique(slug: string, excludeProductId?: string): Promise<void> {
    const exists = await this.slugExists(slug, excludeProductId);
    if (exists) {
      throw new Error(`Slug ${slug} is already in use`);
    }
  }
}
