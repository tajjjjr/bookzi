import { ProductService } from "../../core/services/product.service.js";

export class ProductController {
  constructor({ db }) {
    this.productService = new ProductService({ db });

    // Bind methods so route handlers don’t lose `this`
    this.list   = this.list.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  async list(req, res) {
    const data = await this.productService.listProducts();
    res.json(data);
  }

  async getOne(req, res) {
    try {
      const data = await this.productService.getProduct(Number(req.params.id));
      res.json(data);
    } catch (err) {
      if (err.message === "PRODUCT_NOT_FOUND") {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
    }
  }
}
