export class ProductService {
  constructor({ db }) {
    this.db = db;
  }

  async listProducts() {
    const products = await this.db.listProducts();
    return products;
  }

  async getProduct(id) {
    const product = await this.db.getProduct(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    return product;
  }

  async decreaseInventory(id, amount) {
    const product = await this.db.getProduct(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.stock < amount) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    const updated = await this.db.decreaseInventory(id, amount);
    return updated;
  }
}
