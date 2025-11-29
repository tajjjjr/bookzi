// backend/src/http/routes/product.js

import express from "express";
import { ProductController } from "../controllers/product.controller.js";

export function createProductRouter({ db }) {
  const router = express.Router();
  const controller = new ProductController({ db });

  router.get("/", controller.list);
  router.get("/:id", controller.getOne);

  return router;
}
