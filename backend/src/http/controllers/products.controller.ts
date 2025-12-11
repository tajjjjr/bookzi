import { Request, Response } from 'express';
import { ProductService } from '../../services/product.service.js';
import { AttachmentService } from '../../services/attachment.service.js';
import { Express } from 'express-serve-static-core';
import multer from 'multer';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export class ProductsController {
  private productService: ProductService;
  private attachmentService: AttachmentService;

  constructor() {
    this.productService = new ProductService();
    this.attachmentService = new AttachmentService();
  }

  uploadImages = upload.array('images', 10);

  async createWithImages(req: Request, res: Response) {
    try {
      const productData = JSON.parse(req.body.product);
      const files = req.files as Express.Multer.File[];
      
      // Create product first
      const product = await this.productService.createProduct(productData);
      
      // Upload and link images
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const attachment = await this.attachmentService.upload(file, {
            entityType: 'product',
            entityId: product.id
          });
          await this.productService.addProductImage(product.id, attachment.id, i, i === 0);
        }
      }
      
      res.status(201).json(product);
    } catch (error) {
      console.error('Product creation error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async addImage(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const { position = 0, isDefault = false } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
      }
      
      const attachment = await this.attachmentService.upload(req.file, {
        entityType: 'product',
        entityId: productId
      });
      
      await this.productService.addProductImage(productId, attachment.id, position, isDefault);
      
      res.json({ success: true, attachment });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async removeImage(req: Request, res: Response) {
    try {
      const { productId, attachmentId } = req.params;
      
      await this.productService.removeProductImage(productId, attachmentId);
      await this.attachmentService.delete(attachmentId);
      
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async setDefaultImage(req: Request, res: Response) {
    try {
      const { productId, attachmentId } = req.params;
      
      const success = await this.productService.setDefaultImage(productId, attachmentId);
      
      res.json({ success });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}