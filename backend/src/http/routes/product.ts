import express from "express";
import { ProductController } from "../controllers/product.controller.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";

export function createProductRouter({ db }: { db: DBAdapter }): express.Router {
  const router = express.Router();
  const controller = new ProductController({ db });

  router.get("/", controller.list);
  router.get("/:id", controller.getOne);

  return router;
}