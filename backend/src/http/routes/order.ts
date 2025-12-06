import express from "express";
import { OrderController } from "../controllers/order.controller.ts";
import { SQLiteOrderManagementAdapter } from "../../adapters/orders/orders.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { validate } from "../middleware/validate.ts";
import { createOrderSchema, updateOrderStatusSchema, cancelOrderSchema } from "../validation/order.validation.ts";
import { SQLiteAdapter } from "../../adapters/sqlite/sqlite.adapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

export function createOrderRouter({ db, authAdapter }: { db: SQLiteAdapter; authAdapter: AuthAdapter }): express.Router {
  const router = express.Router();

  const orderAdapter = new SQLiteOrderManagementAdapter(db);
  const controller = new OrderController(orderAdapter);

  router.get("/", authMiddleware(authAdapter), controller.getAll);
  router.get("/:id", authMiddleware(authAdapter), controller.getById);
  router.post("/", authMiddleware(authAdapter), validate(createOrderSchema), controller.create);
  router.patch("/:id/status", authMiddleware(authAdapter), validate(updateOrderStatusSchema), controller.updateStatus);
  router.post("/:id/cancel", authMiddleware(authAdapter), validate(cancelOrderSchema), controller.cancel);

  return router;
}