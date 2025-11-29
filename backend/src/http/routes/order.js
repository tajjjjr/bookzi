// backend/src/http/routes/order.js

import express from "express";
import { OrderController } from "../controllers/order.controller.js";

export function createOrderRouter({ db, auth }) {
  const router = express.Router();
  const controller = new OrderController({ db, auth });

  router.post("/", controller.create);

  return router;
}
