export class OrderController {
  constructor({ orderService }) {
    this.orderService = orderService;
    this.create = this.create.bind(this);
  }

  create = async (req, res) => {
    try {
      const order = await this.orderService.createOrder({
        userId: req.user.id,
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
  };
}
