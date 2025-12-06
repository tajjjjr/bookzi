import { Request, Response } from "express";
import { OrderManagementAdapter } from "../../adapters/interfaces/OrderManagementAdapter.js";
import { CreateOrderInput } from "../../types/models.js";

export class OrderController {
  constructor(private orderAdapter: OrderManagementAdapter) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.orderAdapter.getOrdersByUserId(userId, { page, limit });
      res.json(result);
    } catch (error) {
      console.error('Orders error:', error);
      res.status(500).json({ error: "Server error" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await this.orderAdapter.getOrderById(req.params.id);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(order);
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderData = req.validated as CreateOrderInput;
      // Always use the authenticated user's ID from JWT token
      orderData.userId = req.user!.id;
      
      const order = await this.orderAdapter.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ error: "Server error" });
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      const order = await this.orderAdapter.updateOrderStatus(req.params.id, status);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(order);
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  };

  cancel = async (req: Request, res: Response): Promise<void> => {
    try {
      const { reason } = req.body;
      const order = await this.orderAdapter.cancelOrder(req.params.id, reason);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(order);
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  };
}