import { describe, it, expect } from "@jest/globals";
import { processCheckout } from "@/lib/checkout";

describe("checkout utility", () => {
  it("handles empty cart gracefully", async () => {
    const result = await processCheckout([]);
    expect(result).toBeDefined();
  });

  it("handles valid cart items", async () => {
    const cart = [{ id: "1", name: "Test Product", price: 10, quantity: 1 }];
    const result = await processCheckout(cart);
    expect(result.success).toBe(true);
  });
});
