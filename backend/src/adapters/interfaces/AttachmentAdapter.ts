import { Attachment } from '../../types/models.ts';
import { Express } from 'express-serve-static-core';

export interface UploadOptions {
  entityType?: string;
  entityId?: string;
  allowedMimeTypes?: string[];
  maxSize?: number; // bytes
}

type MulterFile = Express.Multer.File;

export interface AttachmentAdapter {
  upload(file: MulterFile, options?: UploadOptions): Promise<Attachment>;
  getById(id: string): Promise<Attachment | null>;
  getByEntity(entityType: string, entityId: string): Promise<Attachment[]>;
  delete(id: string): Promise<boolean>;
  getUrl(attachment: Attachment): string;
}