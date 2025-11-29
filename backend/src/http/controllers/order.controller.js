import { OrderService } from "../../core/services/order.service.js";

export class OrderController {
  constructor({ db, auth }) {
    this.orderService = new OrderService({ db });
    this.auth = auth;

    this.create = this.create.bind(this);
  }

  async create(req, res) {
    try {
      const user = await this.auth.getUser(req);

      const order = await this.orderService.createOrder({
        userId: user.id,
        items: req.body.items,
      });

      res.json(order);
    } catch (err) {
      switch (err.message) {
        case "EMPTY_ORDER":
          return res.status(400).json({ error: "Order has no items" });
        case "INSUFFICIENT_STOCK":
          return res.status(400).json({ error: "Insufficient stock" });
        case "PRODUCT_NOT_FOUND":
          return res.status(404).json({ error: "Product not found" });
        default:
          return res.status(500).json({ error: "Server error" });
      }
    }
  }
}
