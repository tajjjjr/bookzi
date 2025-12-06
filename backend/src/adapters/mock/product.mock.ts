import { ProductCatalogAdapter } from '../interfaces/ProductCatalogAdapter.ts';
import { Product } from '../../types/models.ts';

export class MockProductCatalogAdapter implements ProductCatalogAdapter {
  async createProduct(): Promise<Product> { throw new Error('Mock not implemented'); }
  async getProductById(): Promise<Product | null> { throw new Error('Mock not implemented'); }
  async getProductBySku(): Promise<Product | null> { throw new Error('Mock not implemented'); }
  async getProductBySlug(): Promise<Product | null> { throw new Error('Mock not implemented'); }
  async getProducts(): Promise<never> { throw new Error('Mock not implemented'); }
  async updateProduct(): Promise<Product | null> { throw new Error('Mock not implemented'); }
  async deleteProduct(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async productExists(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async skuExists(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async slugExists(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async updateStock(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async adjustStock(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async getLowStockProducts(): Promise<Product[]> { throw new Error('Mock not implemented'); }
  async getOutOfStockProducts(): Promise<Product[]> { throw new Error('Mock not implemented'); }
  async createVariant(): Promise<never> { throw new Error('Mock not implemented'); }
  async getVariantById(): Promise<never> { throw new Error('Mock not implemented'); }
  async getVariantsByProductId(): Promise<never[]> { throw new Error('Mock not implemented'); }
  async updateVariant(): Promise<never> { throw new Error('Mock not implemented'); }
  async deleteVariant(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async searchProducts(): Promise<Product[]> { throw new Error('Mock not implemented'); }
  async getFeaturedProducts(): Promise<Product[]> { throw new Error('Mock not implemented'); }
  async getRecentProducts(): Promise<Product[]> { throw new Error('Mock not implemented'); }
  async addProductImage(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async removeProductImage(): Promise<boolean> { throw new Error('Mock not implemented'); }
  async setDefaultImage(): Promise<boolean> { throw new Error('Mock not implemented'); }
}

export default new MockProductCatalogAdapter();