import express from "express";
import { createProductRouter } from "./product.js";
import { createOrderRouter } from "./order.js";

const createRouter = ({ db, auth }) => {
  const router = express.Router();

  router.use("/products", createProductRouter({ db }));
  router.use("/orders", createOrderRouter({ db, auth }));

  return router;
}

export { 
  createRouter
};
