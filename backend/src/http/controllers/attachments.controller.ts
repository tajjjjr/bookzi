import { Request, Response } from 'express';
import { AttachmentAdapter } from '../../adapters/interfaces/AttachmentAdapter.ts';
import multer from 'multer';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export class AttachmentsController {
  constructor(private attachmentAdapter: AttachmentAdapter) {}

  uploadFile = upload.single('file');

  async handleUpload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const { entityType, entityId } = req.body;
      
      const attachment = await this.attachmentAdapter.upload(req.file, {
        entityType,
        entityId,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        maxSize: 10 * 1024 * 1024
      });

      res.json(attachment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const attachment = await this.attachmentAdapter.getById(req.params.id);
      if (!attachment) {
        return res.status(404).json({ error: 'Attachment not found' });
      }
      res.json(attachment);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getByEntity(req: Request, res: Response) {
    try {
      const { entityType, entityId } = req.params;
      const attachments = await this.attachmentAdapter.getByEntity(entityType, entityId);
      res.json(attachments);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await this.attachmentAdapter.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Attachment not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}