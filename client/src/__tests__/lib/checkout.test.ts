import { describe, it, expect } from "@jest/globals";
import { processCheckout, OrderItem } from "@/lib/checkout";

describe("checkout utility", () => {
  it("handles empty cart gracefully", async () => {
    const result = await processCheckout([]);
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining("empty"),
      })
    );
  });

  it("handles valid cart items", async () => {
    const cart: OrderItem[] = [
      { id: "1", title: "Test Product", price: 10, quantity: 1 },
    ];

    const result = await processCheckout(cart);

    expect(result.success).toBe(true);
    expect(result.orderId).toMatch(/^ORD-/);
    expect(result.message).toBe("Order processed successfully");
  });

  it("rejects invalid cart items", async () => {
    // create an intentionally malformed payload at runtime while keeping TypeScript happy
    const invalidCart = [
      { name: "Broken", cost: 99 },
    ] as unknown as OrderItem[];

    const result = await processCheckout(invalidCart);
    expect(result.success).toBe(false);
    // message should indicate invalid items
    expect(result.message).toEqual(expect.stringContaining("Invalid"));
  });
});
