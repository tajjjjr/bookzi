import express from "express";

export const createRouter = ({ db, auth }) => {
  const router = express.Router();

  router.get("/products", async (req, res) => {
    const products = await db.listProducts();
    res.json(products);
  });

  router.get("/orders", async (req, res) => {
    const userId = 1; // from mock auth for simplicity
    const orders = await db.getOrdersForUser(userId);
    res.json(orders);
  });

  return router;
}