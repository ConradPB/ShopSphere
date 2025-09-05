import { z } from "zod";

/**
 * Cart item shape (matches CartItem)
 */
export const OrderItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const CheckoutFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(1),
  postal: z.string().min(1),
  country: z.string().min(1),
});

export type CheckoutForm = z.infer<typeof CheckoutFormSchema>;

/**
 * Full request body expected by the server
 */
export const OrderRequestSchema = z.object({
  form: CheckoutFormSchema,
  items: z.array(OrderItemSchema).min(1),
  metadata: z
    .object({
      // any optional metadata, e.g. coupon code, userId, etc.
      coupon: z.string().optional(),
    })
    .optional(),
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;

export const OrderResponseSchema = z.object({
  success: z.boolean(),
  orderId: z.string().optional(),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
