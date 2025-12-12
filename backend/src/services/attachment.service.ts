import { randomUUID } from 'crypto';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { Buffer } from 'buffer';
import { AttachmentRepository } from '../repositories/index.js';

export class AttachmentService {
  private attachmentRepo: AttachmentRepository;
  private uploadDir = './uploads';

  constructor() {
    this.attachmentRepo = new AttachmentRepository();
  }

  async upload(file: { originalname: string; mimetype: string; size: number; buffer: Buffer }, options?: { entityType?: string; entityId?: string }) {
    const id = randomUUID();
    const filename = `${Date.now()}_${id.slice(0, 11)}.${file.originalname.split('.').pop()}`;
    const path = join(this.uploadDir, filename);
    const url = `/uploads/${filename}`;

    // Ensure upload directory exists
    await mkdir(this.uploadDir, { recursive: true });
    
    // Write file to disk
    await writeFile(path, file.buffer);

    const now = new Date().toISOString();
    return await this.attachmentRepo.create({
      id,
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url,
      path,
      entityType: options?.entityType || null,
      entityId: options?.entityId || null,
      createdAt: now,
      updatedAt: now,
    });
  }

  async getById(id: string) {
    return await this.attachmentRepo.findById(id);
  }

  async getByEntity(entityType: string, entityId: string) {
    return await this.attachmentRepo.findByEntity(entityType, entityId);
  }

  async delete(id: string) {
    await this.attachmentRepo.delete(id);
    return true;
  }
}