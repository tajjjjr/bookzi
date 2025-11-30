import express from "express";
import { createProductRouter } from "./product.ts";
import { createOrderRouter } from "./order.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

const createRouter = ({ db, auth }: { db: DBAdapter; auth: AuthAdapter }): express.Router => {
  const router = express.Router();

  router.use("/products", createProductRouter({ db }));
  router.use("/orders", createOrderRouter({ db, auth }));

  return router;
};

export { createRouter };