import { z } from 'zod';
import { OrderStatus, PaymentStatus, FulfillmentStatus } from '../../types/models.js';

export const createOrderSchema = z.object({
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    productName: z.string(),
    variantName: z.string().optional(),
    sku: z.string(),
    image: z.string().optional(),
    quantity: z.number().positive(),
    price: z.number().positive(),
    subtotal: z.number(),
    discount: z.number().optional(),
    tax: z.number(),
    total: z.number(),
    isFulfilled: z.boolean().default(false),
    isRefunded: z.boolean().default(false)
  })),
  subtotal: z.number(),
  discount: z.number().optional(),
  discountCode: z.string().optional(),
  tax: z.number(),
  shippingCost: z.number(),
  total: z.number(),
  currency: z.string().default('USD'),
  paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.PENDING),
  fulfillmentStatus: z.nativeEnum(FulfillmentStatus).default(FulfillmentStatus.UNFULFILLED),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.PENDING),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus)
});

export const cancelOrderSchema = z.object({
  reason: z.string().optional()
});