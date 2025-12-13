import { Request, Response } from 'express';
import { AttachmentService } from '../../services/attachment.service.js';
import multer from 'multer';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export class AttachmentsController {
  private attachmentService: AttachmentService;

  constructor() {
    this.attachmentService = new AttachmentService();
  }

  uploadFile = upload.single('file');

  async handleUpload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const { entityType, entityId } = req.body;
      
      const attachment = await this.attachmentService.upload(req.file, {
        entityType,
        entityId
      });

      res.json(attachment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const attachment = await this.attachmentService.getById(req.params.id);
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
      const attachments = await this.attachmentService.getByEntity(entityType, entityId);
      res.json(attachments);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await this.attachmentService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Attachment not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}