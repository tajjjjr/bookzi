import { AttachmentAdapter, UploadOptions } from '../interfaces/AttachmentAdapter.ts';
import { Attachment } from '../../types/models.ts';
import { Express } from 'express-serve-static-core';

type MulterFile = Express.Multer.File;

export abstract class BaseAttachmentAdapter implements AttachmentAdapter {
  abstract upload(file: MulterFile, options?: UploadOptions): Promise<Attachment>;
  abstract getById(id: string): Promise<Attachment | null>;
  abstract getByEntity(entityType: string, entityId: string): Promise<Attachment[]>;
  abstract delete(id: string): Promise<boolean>;
  abstract getUrl(attachment: Attachment): string;

  protected validateFile(file: MulterFile, options?: UploadOptions): void {
    if (options?.maxSize && file.size > options.maxSize) {
      throw new Error(`File size ${file.size} exceeds maximum ${options.maxSize} bytes`);
    }
    
    if (options?.allowedMimeTypes && !options.allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(`File type ${file.mimetype} not allowed`);
    }
  }

  protected generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const ext = originalName.split('.').pop();
    return `${timestamp}_${random}.${ext}`;
  }
}