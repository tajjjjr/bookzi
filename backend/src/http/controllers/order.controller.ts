import { Request, Response } from "express";
import { OrderService } from "../../core/services/order.service.ts";

export class OrderController {
  constructor(private orderService: OrderService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    try {
      const orders = await this.orderService.listOrdersForUser(userId);
      res.json(orders);
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const items = req.validated.items;

      const order = await this.orderService.createOrder({ userId, items });

      res.json(order);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case "EMPTY_ORDER":
            res.status(400).json({ error: "Order has no items" });
            return;
          case "INSUFFICIENT_STOCK":
            res.status(400).json({ error: "Insufficient stock" });
            return;
          case "PRODUCT_NOT_FOUND":
            res.status(404).json({ error: "Product not found" });
            return;
          default:
            res.status(500).json({ error: "Server error" });
        }
      } else {
        res.status(500).json({ error: "Server error" });
      }
    }
  };
}