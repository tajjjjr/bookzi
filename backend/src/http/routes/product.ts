import express from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { ProductService } from "../../services/product.service.js";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export function createProductRouter(): express.Router {
  const router = express.Router();
  const controller = new ProductsController();
  const productService = new ProductService();

  // Product CRUD
  router.get("/", async (req, res) => {
    const products = await productService.getProducts();
    res.json(products);
  });
  router.get("/:id", async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  });
  router.post("/", async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  });
  router.put("/:id", async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  });
  router.delete("/:id", async (req, res) => {
    const deleted = await productService.deleteProduct(req.params.id);
    res.json({ success: deleted });
  });

  // Image management
  router.post("/create-with-images", controller.uploadImages, controller.createWithImages.bind(controller));
  router.post("/:productId/images", upload.single('image'), controller.addImage.bind(controller));
  router.delete("/:productId/images/:attachmentId", controller.removeImage.bind(controller));
  router.put("/:productId/images/:attachmentId/default", controller.setDefaultImage.bind(controller));

  return router;
}