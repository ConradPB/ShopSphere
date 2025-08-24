import { getProducts, getProductById } from "@/lib/supabase";

// Mock supabase client
jest.mock("@/lib/supabaseClient", () => ({
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
}));

describe("supabase utils", () => {
  it("fetches all products", async () => {
    (require("@/lib/supabaseClient").select as jest.Mock).mockResolvedValueOnce(
      {
        data: [{ id: "1", title: "Test Product" }],
        error: null,
      }
    );
    const products = await getProducts();
    expect(products[0].title).toBe("Test Product");
  });

  it("fetches a product by id", async () => {
    (require("@/lib/supabaseClient").single as jest.Mock).mockResolvedValueOnce(
      {
        data: { id: "2", title: "Test Product 2" },
        error: null,
      }
    );
    const product = await getProductById("2");
    expect(product?.id).toBe("2");
  });
});
