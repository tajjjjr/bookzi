import express from "express";

export default (dbAdapter) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const products = await dbAdapter.getProducts();
    res.json(products);
  });

  router.get("/:id", async (req, res) => {
    const product = await dbAdapter.getProductById(req.params.id);
    res.json(product);
  });

  return router;
};
