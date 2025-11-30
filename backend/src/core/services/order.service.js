export class OrderService {
  constructor({ db }) {
    this.db = db;
    this.createOrder = this.createOrder.bind(this);
    this.listOrdersForUser = this.listOrdersForUser.bind(this);
  }

  async createOrder({ userId, items }) {
    if (!userId) {
      throw new Error("MISSING_USER");
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("EMPTY_ORDER");
    }

    let total = 0;

    // Validate stock and calculate total
    for (const item of items) {
      const product = await this.db.getProduct(item.productId);

      if (!product) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      if (product.stock < item.quantity) {
        throw new Error("INSUFFICIENT_STOCK");
      }

      total += product.price * item.quantity;
    }

    // Reduce stock AFTER validation to keep the flow atomic
    for (const item of items) {
      await this.db.decreaseInventory(item.productId, item.quantity);
    }

    // Create the order entry (DB adapter decides how)
    const order = await this.db.createOrder({
      userId,
      items,
      total
    });

    return order;
  }

  async listOrdersForUser(userId) {
    if (!userId) {
      throw new Error("MISSING_USER");
    }

    return await this.db.listOrdersForUser(userId);
  }
}
