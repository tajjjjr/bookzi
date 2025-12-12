import express from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { AuthService } from "../../services/auth.service.js";

export function createOrderRouter({ authService }: { authService: AuthService }): express.Router {
  const router = express.Router();

  const controller = new OrderController();

  router.get("/", authMiddleware(authService), controller.getAll);
  router.get("/:id", authMiddleware(authService), controller.getById);
  router.post("/", authMiddleware(authService), controller.create);
  router.patch("/:id/status", authMiddleware(authService), controller.updateStatus);
  router.post("/:id/cancel", authMiddleware(authService), controller.cancel);

  return router;
}