import { AttachmentAdapter } from '../interfaces/AttachmentAdapter.ts';
import { Attachment } from '../../types/models.ts';

export class MockAttachmentAdapter implements AttachmentAdapter {
  async upload(): Promise<Attachment> { throw new Error('Mock not implemented'); }
  async getById(): Promise<Attachment | null> { throw new Error('Mock not implemented'); }
  async getByEntity(): Promise<Attachment[]> { throw new Error('Mock not implemented'); }
  async delete(): Promise<boolean> { throw new Error('Mock not implemented'); }
  getUrl(): string { throw new Error('Mock not implemented'); }
}

export default new MockAttachmentAdapter();