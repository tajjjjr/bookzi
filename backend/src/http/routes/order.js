import express from "express";
import { OrderService } from "../../core/services/order.service.js";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { AuthService } from "../../core/services/auth.service.js";

export function createOrderRouter({ db, auth }) {
  const router = express.Router();

  const orderService = new OrderService({ db });
  const authService  = new AuthService({ auth });
  const controller   = new OrderController({ orderService });

  router.get("/", authMiddleware(authService), controller.getAll);
  router.post("/", authMiddleware(authService), controller.create);

  return router;
}
