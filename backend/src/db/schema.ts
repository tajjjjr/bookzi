import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  email: text('email').notNull().unique(),
  phone_number: text('phone_number'),
  country: text('country'),
  zip_code: text('zip_code'),
  password: text('password').notNull(),
  role: text('role').default('user'),
  isActive: integer('isActive', { mode: 'boolean' }).default(true),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(), // New field
  author: text('author'), // New field
  description: text('description'),
  price: integer('price').notNull(),
  compareAtPrice: integer('compareAtPrice'),
  currency: text('currency').notNull().default('USD'),
  sku: text('sku').notNull().unique(),
  barcode: text('barcode'),
  serialNumber: text('serialNumber'),
  stock: integer('stock').notNull().default(0),
  lowStockThreshold: integer('lowStockThreshold'),
  trackInventory: integer('trackInventory', { mode: 'boolean' }).notNull().default(true),
  allowBackorder: integer('allowBackorder', { mode: 'boolean' }).notNull().default(false),
  category: text('category'), // Updated field
  categoryId: text('categoryId'),
  tags: text('tags').default('[]'),
  brand: text('brand'),
  vendor: text('vendor'),
  weight: integer('weight'),
  dimensions: text('dimensions'),
  hasVariants: integer('hasVariants', { mode: 'boolean' }).notNull().default(false),
  slug: text('slug').notNull().unique(),
  metaTitle: text('metaTitle'),
  metaDescription: text('metaDescription'),
  image: text('image'), // New field
  rating: real('rating').default(0), // New field
  reviews: integer('reviews').default(0), // New field
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
  isFeatured: integer('isFeatured', { mode: 'boolean' }).default(false),
  isDigital: integer('isDigital', { mode: 'boolean' }).default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
  publishedAt: text('publishedAt'),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  orderNumber: text('orderNumber').notNull().unique(),
  userId: text('userId').notNull(),
  items: text('items').notNull(),
  subtotal: real('subtotal').notNull(),
  discount: real('discount'),
  discountCode: text('discountCode'),
  tax: real('tax').notNull(),
  shippingCost: real('shippingCost').notNull(),
  total: real('total').notNull(),
  currency: text('currency').notNull(),
  paymentStatus: text('paymentStatus').notNull(),
  paymentMethod: text('paymentMethod'),
  paymentIntentId: text('paymentIntentId'),
  fulfillmentStatus: text('fulfillmentStatus').notNull(),
  shippingAddress: text('shippingAddress'),
  billingAddress: text('billingAddress'),
  shippingMethod: text('shippingMethod'),
  trackingNumber: text('trackingNumber'),
  trackingUrl: text('trackingUrl'),
  customerEmail: text('customerEmail').notNull(),
  customerPhone: text('customerPhone'),
  notes: text('notes'),
  internalNotes: text('internalNotes'),
  status: text('status').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
  paidAt: text('paidAt'),
  shippedAt: text('shippedAt'),
  deliveredAt: text('deliveredAt'),
  cancelledAt: text('cancelledAt'),
  refundedAt: text('refundedAt'),
});

export const attachments = sqliteTable('attachments', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('originalName').notNull(),
  mimeType: text('mimeType').notNull(),
  size: integer('size').notNull(),
  url: text('url').notNull(),
  path: text('path').notNull(),
  entityType: text('entityType'),
  entityId: text('entityId'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const productImages = sqliteTable('product_images', {
  productId: text('productId').notNull(),
  attachmentId: text('attachmentId').notNull(),
  position: integer('position').notNull().default(0),
  isDefault: integer('isDefault', { mode: 'boolean' }).notNull().default(false),
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('productId').notNull(),
  userId: text('userId').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  reviewerName: text('reviewerName').notNull(),
  reviewerEmail: text('reviewerEmail'),
  isVerified: integer('isVerified', { mode: 'boolean' }).default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});