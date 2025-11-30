import { Request, Response } from "express";
import { ProductService } from "../../core/services/product.service.ts";
import { DBAdapter } from "../../adapters/interfaces/DBAdapter.ts";

export class ProductController {
  private productService: ProductService;

  constructor({ db }: { db: DBAdapter }) {
    this.productService = new ProductService(db);
    this.list = this.list.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  async list(req: Request, res: Response): Promise<void> {
    const data = await this.productService.listProducts();
    res.json(data);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.productService.getProduct(Number(req.params.id));
      res.json(data);
    } catch (err) {
      if (err instanceof Error && err.message === "PRODUCT_NOT_FOUND") {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
    }
  }
}