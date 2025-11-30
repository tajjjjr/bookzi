import { BaseAttachmentAdapter } from './abstract.ts';
import { UploadOptions } from '../interfaces/AttachmentAdapter.ts';
import { Attachment } from '../../types/models.ts';
import { SQLiteAdapter } from '../sqlite/sqlite.adapter.ts';
import { Express } from 'express-serve-static-core';
import * as fs from 'fs';
import * as path from 'path';

export class LocalAttachmentAdapter extends BaseAttachmentAdapter {
  private db: SQLiteAdapter;
  private uploadDir: string;
  private baseUrl: string;

  constructor(db: SQLiteAdapter, uploadDir = './uploads', baseUrl = '/uploads') {
    super();
    this.db = db;
    this.uploadDir = uploadDir;
    this.baseUrl = baseUrl;
    this.ensureUploadDir();
  }

  async upload(file: Express.Multer.File, options?: UploadOptions): Promise<Attachment> {
    this.validateFile(file, options);
    
    const filename = this.generateFilename(file.originalname);
    const filePath = path.join(this.uploadDir, filename);
    const url = `${this.baseUrl}/${filename}`;
    
    // Write file to disk
    fs.writeFileSync(filePath, file.buffer);
    
    // Save to database
    const database = this.db.getDatabase();
    const now = new Date().toISOString();
    const id = `att_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    database.prepare(`
      INSERT INTO attachments (id, filename, originalName, mimeType, size, url, path, entityType, entityId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, filename, file.originalname, file.mimetype, file.size,
      url, filePath, options?.entityType || null, options?.entityId || null,
      now, now
    );

    return this.getById(id) as Promise<Attachment>;
  }

  async getById(id: string): Promise<Attachment | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM attachments WHERE id = ?").get(id) as Record<string, unknown>;
    
    if (!result) return null;
    
    return this.mapRowToAttachment(result);
  }

  async getByEntity(entityType: string, entityId: string): Promise<Attachment[]> {
    const database = this.db.getDatabase();
    const results = database.prepare(
      "SELECT * FROM attachments WHERE entityType = ? AND entityId = ? ORDER BY createdAt DESC"
    ).all(entityType, entityId) as Record<string, unknown>[];
    
    return results.map(row => this.mapRowToAttachment(row));
  }

  async delete(id: string): Promise<boolean> {
    const attachment = await this.getById(id);
    if (!attachment) return false;
    
    // Delete file from disk
    if (fs.existsSync(attachment.path)) {
      fs.unlinkSync(attachment.path);
    }
    
    // Delete from database
    const database = this.db.getDatabase();
    const result = database.prepare("DELETE FROM attachments WHERE id = ?").run(id);
    return result.changes > 0;
  }

  getUrl(attachment: Attachment): string {
    return attachment.url;
  }

  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private mapRowToAttachment(row: Record<string, unknown>): Attachment {
    return {
      id: row.id as string,
      filename: row.filename as string,
      originalName: row.originalName as string,
      mimeType: row.mimeType as string,
      size: row.size as number,
      url: row.url as string,
      path: row.path as string,
      entityType: row.entityType as string | undefined,
      entityId: row.entityId as string | undefined,
      createdAt: new Date(row.createdAt as string),
      updatedAt: new Date(row.updatedAt as string)
    };
  }
}