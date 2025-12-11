import express from "express";
import { OrderController } from "../controllers/order.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { validate } from "../middleware/validate.ts";
import { createOrderSchema, updateOrderStatusSchema, cancelOrderSchema } from "../validation/order.validation.ts";
import { AuthService } from "../../services/auth.service.js";

export function createOrderRouter({ authService }: { authService: AuthService }): express.Router {
  const router = express.Router();

  const controller = new OrderController();

  router.get("/", authMiddleware(authService), controller.getAll);
  router.get("/:id", authMiddleware(authService), controller.getById);
  router.post("/", authMiddleware(authService), validate(createOrderSchema), controller.create);
  router.patch("/:id/status", authMiddleware(authService), validate(updateOrderStatusSchema), controller.updateStatus);
  router.post("/:id/cancel", authMiddleware(authService), validate(cancelOrderSchema), controller.cancel);

  return router;
}