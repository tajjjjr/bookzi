import { BaseProductCatalogAdapter } from './abstract.ts';
import { CreateProductInput, UpdateProductInput, ProductFilters, ProductSortOptions, PaginationOptions, PaginatedResult } from '../interfaces/ProductCatalogAdapter.ts';
import { Product, ProductVariant, ProductImage } from '../../types/models.ts';
import { SQLiteAdapter } from '../sqlite/sqlite.adapter.ts';
import { AttachmentAdapter } from '../interfaces/AttachmentAdapter.ts';

export class ProductCatalogAdapter extends BaseProductCatalogAdapter {
  private db: SQLiteAdapter;
  private attachmentAdapter: AttachmentAdapter;

  constructor(db: SQLiteAdapter, attachmentAdapter: AttachmentAdapter) {
    super();
    this.db = db;
    this.attachmentAdapter = attachmentAdapter;
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    await this.ensureSkuUnique(data.sku);
    await this.ensureSlugUnique(data.slug);

    const database = this.db.getDatabase();
    const now = new Date().toISOString();
    const productId = `prod_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    database.prepare(`
      INSERT INTO products (
        id, name, description, price, compareAtPrice, currency, sku, barcode, serialNumber,
        stock, lowStockThreshold, trackInventory, allowBackorder, categoryId, tags,
        brand, vendor, weight, dimensions, hasVariants, slug, metaTitle, metaDescription,
        isActive, isFeatured, isDigital, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      productId, data.name, data.description || null, data.price, data.compareAtPrice || null,
      data.currency, data.sku, data.barcode || null, data.serialNumber || null,
      data.stock, data.lowStockThreshold || null, data.trackInventory ? 1 : 0,
      data.allowBackorder ? 1 : 0, data.categoryId || null, JSON.stringify(data.tags || []),
      data.brand || null, data.vendor || null, data.weight || null,
      JSON.stringify(data.dimensions || null), data.hasVariants ? 1 : 0,
      data.slug, data.metaTitle || null, data.metaDescription || null,
      data.isActive ? 1 : 0, data.isFeatured ? 1 : 0, data.isDigital ? 1 : 0,
      now, now
    );
    console.log('Created product with ID:', productId);
    
    // Link images if provided
    if (data.imageIds && data.imageIds.length > 0) {
      for (let i = 0; i < data.imageIds.length; i++) {
        await this.addProductImage(productId, data.imageIds[i], i, i === 0);
      }
    }

    const product = await this.getProductById(productId);
    console.log('Retrieved product:', product ? 'found' : 'not found');
    if (!product) {
      throw new Error(`Failed to retrieve created product with ID: ${productId}`);
    }
    return product;
  }

  async getProductById(id: string): Promise<Product | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM products WHERE id = ?").get(id) as Record<string, unknown>;
    
    if (!result) return null;

    return this.mapRowToProduct(result);
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM products WHERE sku = ?").get(sku) as Record<string, unknown>;
    
    if (!result) return null;

    return this.mapRowToProduct(result);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM products WHERE slug = ?").get(slug) as Record<string, unknown>;
    
    if (!result) return null;

    return this.mapRowToProduct(result);
  }

  async getProducts(filters?: ProductFilters, sort?: ProductSortOptions, pagination?: PaginationOptions): Promise<PaginatedResult<Product>> {
    const database = this.db.getDatabase();
    let query = "SELECT * FROM products WHERE 1=1";
    const params: unknown[] = [];

    // Apply filters
    if (filters?.isActive !== undefined) {
      query += " AND isActive = ?";
      params.push(filters.isActive ? 1 : 0);
    }
    if (filters?.isFeatured !== undefined) {
      query += " AND isFeatured = ?";
      params.push(filters.isFeatured ? 1 : 0);
    }
    if (filters?.searchQuery) {
      query += " AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)";
      const searchTerm = `%${filters.searchQuery}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Apply sorting
    if (sort) {
      query += ` ORDER BY ${sort.field} ${sort.order.toUpperCase()}`;
    } else {
      query += " ORDER BY createdAt DESC";
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const offset = (page - 1) * limit;
    
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const results = database.prepare(query).all(...params) as Record<string, unknown>[];
    const total = database.prepare("SELECT COUNT(*) as count FROM products WHERE 1=1").get() as { count: number };

    const products = await Promise.all(results.map(row => this.mapRowToProduct(row)));

    return {
      data: products,
      total: total.count,
      page,
      limit,
      totalPages: Math.ceil(total.count / limit)
    };
  }

  async updateProduct(id: string, data: UpdateProductInput): Promise<Product | null> {
    await this.ensureProductExists(id);
    
    if (data.sku) {
      await this.ensureSkuUnique(data.sku, id);
    }
    if (data.slug) {
      await this.ensureSlugUnique(data.slug, id);
    }

    const database = this.db.getDatabase();
    const setParts: string[] = [];
    const values: unknown[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'tags' || key === 'dimensions') {
          setParts.push(`${key} = ?`);
          values.push(JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          setParts.push(`${key} = ?`);
          values.push(value ? 1 : 0);
        } else {
          setParts.push(`${key} = ?`);
          values.push(value);
        }
      }
    });

    if (setParts.length === 0) {
      return await this.getProductById(id);
    }

    setParts.push('updatedAt = ?');
    values.push(new Date().toISOString());
    values.push(id);

    database.prepare(`UPDATE products SET ${setParts.join(', ')} WHERE id = ?`).run(...values);
    
    return await this.getProductById(id);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const database = this.db.getDatabase();
    const result = database.prepare("DELETE FROM products WHERE id = ?").run(id);
    return result.changes > 0;
  }

  async productExists(id: string): Promise<boolean> {
    const product = await this.getProductById(id);
    return product !== null;
  }

  async skuExists(sku: string, excludeProductId?: string): Promise<boolean> {
    const database = this.db.getDatabase();
    let query = "SELECT COUNT(*) as count FROM products WHERE sku = ?";
    const params = [sku];
    
    if (excludeProductId) {
      query += " AND id != ?";
      params.push(excludeProductId);
    }
    
    const result = database.prepare(query).get(...params) as { count: number };
    return result.count > 0;
  }

  async slugExists(slug: string, excludeProductId?: string): Promise<boolean> {
    const database = this.db.getDatabase();
    let query = "SELECT COUNT(*) as count FROM products WHERE slug = ?";
    const params = [slug];
    
    if (excludeProductId) {
      query += " AND id != ?";
      params.push(excludeProductId);
    }
    
    const result = database.prepare(query).get(...params) as { count: number };
    return result.count > 0;
  }

  async updateStock(productId: string, quantity: number, variantId?: string): Promise<boolean> {
    const database = this.db.getDatabase();
    
    if (variantId) {
      const result = database.prepare("UPDATE product_variants SET stock = ? WHERE id = ?").run(quantity, variantId);
      return result.changes > 0;
    } else {
      const result = database.prepare("UPDATE products SET stock = ? WHERE id = ?").run(quantity, productId);
      return result.changes > 0;
    }
  }

  async adjustStock(productId: string, adjustment: number, variantId?: string): Promise<boolean> {
    const database = this.db.getDatabase();
    
    if (variantId) {
      const result = database.prepare("UPDATE product_variants SET stock = stock + ? WHERE id = ?").run(adjustment, variantId);
      return result.changes > 0;
    } else {
      const result = database.prepare("UPDATE products SET stock = stock + ? WHERE id = ?").run(adjustment, productId);
      return result.changes > 0;
    }
  }

  async getLowStockProducts(): Promise<Product[]> {
    const database = this.db.getDatabase();
    const results = database.prepare(`
      SELECT * FROM products 
      WHERE trackInventory = 1 AND stock <= COALESCE(lowStockThreshold, 5)
      ORDER BY stock ASC
    `).all() as Record<string, unknown>[];

    return Promise.all(results.map(row => this.mapRowToProduct(row)));
  }

  async getOutOfStockProducts(): Promise<Product[]> {
    const database = this.db.getDatabase();
    const results = database.prepare("SELECT * FROM products WHERE stock = 0").all() as Record<string, unknown>[];

    return Promise.all(results.map(row => this.mapRowToProduct(row)));
  }

  async createVariant(productId: string, data: Omit<ProductVariant, 'id' | 'productId'>): Promise<ProductVariant> {
    await this.ensureProductExists(productId);
    
    const database = this.db.getDatabase();
    const variantId = `${productId}_var_${Date.now()}`;
    
    database.prepare(`
      INSERT INTO product_variants (id, productId, name, sku, barcode, price, compareAtPrice, stock, options, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      variantId, productId, data.name, data.sku, data.barcode || null,
      data.price || null, data.compareAtPrice || null, data.stock,
      JSON.stringify(data.options), data.isActive ? 1 : 0
    );

    return this.getVariantById(variantId) as Promise<ProductVariant>;
  }

  async getVariantById(variantId: string): Promise<ProductVariant | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM product_variants WHERE id = ?").get(variantId) as Record<string, unknown>;
    
    if (!result) return null;

    return {
      id: result.id as string,
      productId: result.productId as string,
      name: result.name as string,
      sku: result.sku as string,
      barcode: result.barcode as string | undefined,
      price: result.price as number | undefined,
      compareAtPrice: result.compareAtPrice as number | undefined,
      stock: result.stock as number,
      options: JSON.parse((result.options as string) || '[]'),
      isActive: Boolean(result.isActive)
    };
  }

  async getVariantsByProductId(productId: string): Promise<ProductVariant[]> {
    const database = this.db.getDatabase();
    const results = database.prepare("SELECT * FROM product_variants WHERE productId = ?").all(productId) as Record<string, unknown>[];

    return results.map(result => ({
      id: result.id as string,
      productId: result.productId as string,
      name: result.name as string,
      sku: result.sku as string,
      barcode: result.barcode as string | undefined,
      price: result.price as number | undefined,
      compareAtPrice: result.compareAtPrice as number | undefined,
      stock: result.stock as number,
      options: JSON.parse((result.options as string) || '[]'),
      isActive: Boolean(result.isActive)
    }));
  }

  async updateVariant(variantId: string, data: Partial<Omit<ProductVariant, 'id' | 'productId'>>): Promise<ProductVariant | null> {
    const database = this.db.getDatabase();
    const setParts: string[] = [];
    const values: unknown[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'options') {
          setParts.push(`${key} = ?`);
          values.push(JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          setParts.push(`${key} = ?`);
          values.push(value ? 1 : 0);
        } else {
          setParts.push(`${key} = ?`);
          values.push(value);
        }
      }
    });

    if (setParts.length === 0) {
      return await this.getVariantById(variantId);
    }

    values.push(variantId);
    database.prepare(`UPDATE product_variants SET ${setParts.join(', ')} WHERE id = ?`).run(...values);
    
    return await this.getVariantById(variantId);
  }

  async deleteVariant(variantId: string): Promise<boolean> {
    const database = this.db.getDatabase();
    const result = database.prepare("DELETE FROM product_variants WHERE id = ?").run(variantId);
    return result.changes > 0;
  }

  async searchProducts(query: string, filters?: ProductFilters): Promise<Product[]> {
    const database = this.db.getDatabase();
    const searchTerm = `%${query}%`;
    
    let sql = `
      SELECT * FROM products 
      WHERE (name LIKE ? OR description LIKE ? OR sku LIKE ?)
    `;
    const params: unknown[] = [searchTerm, searchTerm, searchTerm];

    if (filters?.isActive !== undefined) {
      sql += " AND isActive = ?";
      params.push(filters.isActive ? 1 : 0);
    }

    sql += " ORDER BY name ASC";
    
    const results = database.prepare(sql).all(...params) as Record<string, unknown>[];
    return Promise.all(results.map(row => this.mapRowToProduct(row)));
  }

  async getFeaturedProducts(limit = 10): Promise<Product[]> {
    const database = this.db.getDatabase();
    const results = database.prepare(`
      SELECT * FROM products 
      WHERE isFeatured = 1 AND isActive = 1 
      ORDER BY createdAt DESC 
      LIMIT ?
    `).all(limit) as Record<string, unknown>[];

    return Promise.all(results.map(row => this.mapRowToProduct(row)));
  }

  async getRecentProducts(limit = 10): Promise<Product[]> {
    const database = this.db.getDatabase();
    const results = database.prepare(`
      SELECT * FROM products 
      WHERE isActive = 1 
      ORDER BY createdAt DESC 
      LIMIT ?
    `).all(limit) as Record<string, unknown>[];

    return Promise.all(results.map(row => this.mapRowToProduct(row)));
  }

  async addProductImage(productId: string, attachmentId: string, position = 0, isDefault = false): Promise<boolean> {
    const database = this.db.getDatabase();
    
    // If setting as default, unset other defaults
    if (isDefault) {
      database.prepare("UPDATE product_images SET isDefault = 0 WHERE productId = ?").run(productId);
    }
    
    const result = database.prepare(`
      INSERT INTO product_images (productId, attachmentId, position, isDefault)
      VALUES (?, ?, ?, ?)
    `).run(productId, attachmentId, position, isDefault ? 1 : 0);
    
    return result.changes > 0;
  }

  async removeProductImage(productId: string, attachmentId: string): Promise<boolean> {
    const database = this.db.getDatabase();
    const result = database.prepare(
      "DELETE FROM product_images WHERE productId = ? AND attachmentId = ?"
    ).run(productId, attachmentId);
    
    return result.changes > 0;
  }

  async setDefaultImage(productId: string, attachmentId: string): Promise<boolean> {
    const database = this.db.getDatabase();
    
    // Unset all defaults for this product
    database.prepare("UPDATE product_images SET isDefault = 0 WHERE productId = ?").run(productId);
    
    // Set new default
    const result = database.prepare(
      "UPDATE product_images SET isDefault = 1 WHERE productId = ? AND attachmentId = ?"
    ).run(productId, attachmentId);
    
    return result.changes > 0;
  }

  private async mapRowToProduct(row: Record<string, unknown>): Promise<Product> {
    const database = this.db.getDatabase();
    
    // Get images from attachments
    const rowId = String(row.id);
    const attachments = await this.attachmentAdapter.getByEntity('product', rowId);
    const imageAttachments = database.prepare(
      "SELECT attachmentId, position, isDefault FROM product_images WHERE productId = ? ORDER BY position ASC"
    ).all(rowId) as Record<string, unknown>[];
    
    const images = imageAttachments.map(img => {
      const attachment = attachments.find(a => a.id === img.attachmentId);
      return attachment ? {
        id: attachment.id,
        url: attachment.url,
        alt: attachment.originalName,
        position: img.position,
        isDefault: Boolean(img.isDefault)
      } : null;
    }).filter(Boolean);
    
    // Get variants if hasVariants is true
    let variants: ProductVariant[] = [];
    if (row.hasVariants) {
      variants = await this.getVariantsByProductId(rowId);
    }

    return {
      id: rowId,
      name: row.name as string,
      description: row.description as string,
      price: row.price as number,
      compareAtPrice: row.compareAtPrice as number,
      currency: row.currency as string,
      sku: row.sku as string,
      barcode: row.barcode as string,
      serialNumber: row.serialNumber as string,
      stock: row.stock as number,
      lowStockThreshold: row.lowStockThreshold as number,
      trackInventory: Boolean(row.trackInventory),
      allowBackorder: Boolean(row.allowBackorder),
      images: images as ProductImage[],
      categoryId: row.categoryId as string | undefined,
      tags: JSON.parse((row.tags as string) || '[]'),
      brand: row.brand as string | undefined,
      vendor: row.vendor as string | undefined,
      weight: row.weight as number | undefined,
      dimensions: row.dimensions ? JSON.parse(row.dimensions as string) : undefined,
      hasVariants: Boolean(row.hasVariants),
      variants: variants.length > 0 ? variants : undefined,
      slug: row.slug as string,
      metaTitle: row.metaTitle as string | undefined,
      metaDescription: row.metaDescription as string | undefined,
      isActive: Boolean(row.isActive),
      isFeatured: Boolean(row.isFeatured),
      isDigital: Boolean(row.isDigital),
      createdAt: new Date(row.createdAt as string),
      updatedAt: new Date(row.updatedAt as string),
      publishedAt: row.publishedAt ? new Date(row.publishedAt as string) : undefined
    };
  }
}