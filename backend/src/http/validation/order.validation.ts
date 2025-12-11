import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string(),
  items: z.string(), // JSON string of order items
  subtotal: z.number(),
  discount: z.number().optional(),
  discountCode: z.string().optional(),
  tax: z.number(),
  shippingCost: z.number(),
  total: z.number(),
  currency: z.string().default('USD'),
  paymentStatus: z.string().default('pending'),
  fulfillmentStatus: z.string().default('pending'),
  customerEmail: z.email(),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().default('pending')
});

export const updateOrderStatusSchema = z.object({
  status: z.string()
});

export const cancelOrderSchema = z.object({
  reason: z.string().optional()
});