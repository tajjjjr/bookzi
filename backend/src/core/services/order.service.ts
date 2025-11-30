import { DBAdapter, Order, OrderItem } from "../../adapters/interfaces/DBAdapter.ts";

export class OrderService {
  constructor(private db: DBAdapter) {}

  async createOrder({ userId, items }: { userId: number; items: OrderItem[] }): Promise<Order> {
    if (!userId) {
      throw new Error("MISSING_USER");
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("EMPTY_ORDER");
    }

    let total = 0;

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

    for (const item of items) {
      await this.db.decreaseInventory(item.productId, item.quantity);
    }

    const order = await this.db.createOrder({
      userId: String(userId),
      items,
      total
    });

    return order;
  }

  async listOrdersForUser(userId: number): Promise<Order[]> {
    if (!userId) {
      throw new Error("MISSING_USER");
    }

    return await this.db.listOrdersForUser(userId);
  }
}