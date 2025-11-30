import { DBAdapter, Product } from "../../adapters/interfaces/DBAdapter.ts";

export class ProductService {
  constructor(private db: DBAdapter) {}

  async listProducts(): Promise<Product[]> {
    const products = await this.db.listProducts();
    return products;
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.db.getProduct(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    return product;
  }

  async decreaseInventory(id: number, amount: number): Promise<Product> {
    const product = await this.db.getProduct(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.stock < amount) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    const updated = await this.db.decreaseInventory(id, amount);
    if (!updated) {
      throw new Error("INVENTORY_UPDATE_FAILED");
    }
    return updated;
  }
}