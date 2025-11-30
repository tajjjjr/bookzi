import express from "express";
import { createProductRouter } from "./product.ts";
import { createOrderRouter } from "./order.ts";
import { createAuthRouter } from "./auth.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

const createRouter = ({ db, authAdapter }: { db: DBAdapter; authAdapter: AuthAdapter }): express.Router => {
  const router = express.Router();

  router.use("/auth", createAuthRouter({ authAdapter }));
  router.use("/products", createProductRouter({ db }));
  router.use("/orders", createOrderRouter({ db, authAdapter }));

  return router;
};

export { createRouter };