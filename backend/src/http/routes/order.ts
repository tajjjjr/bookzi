import express from "express";
import { OrderService } from "../../core/services/order.service.ts";
import { OrderController } from "../controllers/order.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { AuthService } from "../../core/services/auth.service.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

export function createOrderRouter({ db, auth }: { db: DBAdapter; auth: AuthAdapter }): express.Router {
  const router = express.Router();

  const orderService = new OrderService(db);
  const authService = new AuthService(auth);
  const controller = new OrderController(orderService);

  router.get("/", authMiddleware(authService), controller.getAll);
  router.post("/", authMiddleware(authService), controller.create);

  return router;
}