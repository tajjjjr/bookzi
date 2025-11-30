import express from "express";
import { OrderService } from "../../core/services/order.service.ts";
import { OrderController } from "../controllers/order.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { validate } from "../middleware/validate.ts";
import { CreateOrderSchema } from "../validation/order.schema.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

export function createOrderRouter({ db, authAdapter }: { db: DBAdapter; authAdapter: AuthAdapter }): express.Router {
  const router = express.Router();

  const orderService = new OrderService(db);
  const controller = new OrderController(orderService);

  router.get("/", authMiddleware(authAdapter), controller.getAll);
  router.post("/", authMiddleware(authAdapter), validate(CreateOrderSchema), controller.create);

  return router;
}