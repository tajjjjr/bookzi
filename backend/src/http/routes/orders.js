import express from "express";

export default (dbAdapter, authMiddleware) => {
  const router = express.Router();

  router.post("/", authMiddleware, async (req, res) => {
    const order = await dbAdapter.createOrder(req.body);
    res.json(order);
  });

  return router;
};
