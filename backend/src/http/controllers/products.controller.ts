import { Request, Response } from 'express';
import { ProductCatalogAdapter } from '../../adapters/interfaces/ProductCatalogAdapter.ts';
import { AttachmentAdapter } from '../../adapters/interfaces/AttachmentAdapter.ts';
import { Express } from 'express-serve-static-core';
import multer from 'multer';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export class ProductsController {
  constructor(
    private productAdapter: ProductCatalogAdapter,
    private attachmentAdapter: AttachmentAdapter
  ) {}

  uploadImages = upload.array('images', 10);

  async createWithImages(req: Request, res: Response) {
    try {
      const productData = JSON.parse(req.body.product);
      const files = req.files as Express.Multer.File[];
      
      // Create product first
      const product = await this.productAdapter.createProduct(productData);
      
      // Upload and link images
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const attachment = await this.attachmentAdapter.upload(file, {
            entityType: 'product',
            entityId: product.id,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
            maxSize: 10 * 1024 * 1024
          });
          await this.productAdapter.addProductImage(product.id, attachment.id, i, i === 0);
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
      
      const attachment = await this.attachmentAdapter.upload(req.file, {
        entityType: 'product',
        entityId: productId,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });
      
      await this.productAdapter.addProductImage(productId, attachment.id, position, isDefault);
      
      res.json({ success: true, attachment });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async removeImage(req: Request, res: Response) {
    try {
      const { productId, attachmentId } = req.params;
      
      await this.productAdapter.removeProductImage(productId, attachmentId);
      await this.attachmentAdapter.delete(attachmentId);
      
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async setDefaultImage(req: Request, res: Response) {
    try {
      const { productId, attachmentId } = req.params;
      
      const success = await this.productAdapter.setDefaultImage(productId, attachmentId);
      
      res.json({ success });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}