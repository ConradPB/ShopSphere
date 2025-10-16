import { z } from "zod";

/**
 * Cart item schema
 */
export const OrderItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

/**
 * Checkout form schema
 */
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
 * Request + response schema
 */
export const OrderRequestSchema = z.object({
  form: CheckoutFormSchema.optional(),
  items: z.array(OrderItemSchema).min(1),
  metadata: z
    .object({
      coupon: z.string().optional(),
    })
    .optional(),
});
export type OrderRequest = z.infer<typeof OrderRequestSchema>;

export const OrderResponseSchema = z.object({
  success: z.boolean(),
  orderId: z.string().optional(),
  message: z.string().optional(),
});
export type OrderResponse = z.infer<typeof OrderResponseSchema>;

/**
 * ✅ Main checkout function
 * Simulates an API checkout request.
 */
export async function processCheckout(
  items: OrderItem[]
): Promise<OrderResponse> {
  // 1. Handle empty cart
  if (!items || items.length === 0) {
    return { success: false, message: "Cart is empty" };
  }

  // 2. Validate items using Zod
  const validation = z.array(OrderItemSchema).safeParse(items);
  if (!validation.success) {
    return { success: false, message: "Invalid cart items" };
  }

  // 3. Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 4. Generate fake order ID
  const fakeOrderId = `ORD-${Math.random()
    .toString(36)
    .substring(2, 9)
    .toUpperCase()}`;

  // 5. Return success
  return {
    success: true,
    orderId: fakeOrderId,
    message: "Order processed successfully",
  };
}
