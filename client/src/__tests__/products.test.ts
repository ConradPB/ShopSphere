import {
  fallbackProducts,
  getAllProducts,
  getProductById,
  getRecommendations,
} from "@/lib/products";

describe("lib/products", () => {
  it("exports fallbackProducts and basic shape", () => {
    expect(Array.isArray(fallbackProducts)).toBe(true);
    expect(fallbackProducts.length).toBeGreaterThan(0);
    const p = fallbackProducts[0];
    expect(p).toHaveProperty("id");
    expect(p).toHaveProperty("title");
    expect(typeof p.price).toBe("number");
  });

  it("getAllProducts resolves to fallbackProducts", async () => {
    const data = await getAllProducts();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toEqual(fallbackProducts);
  });

  it("getProductById returns a matching product", async () => {
    const first = fallbackProducts[0];
    const found = await getProductById(first.id);
    expect(found).toBeDefined();
    expect(found).toMatchObject({ id: first.id, title: first.title });
  });

  it("getProductById returns undefined for unknown id", async () => {
    const found = await getProductById("this-id-does-not-exist");
    expect(found).toBeUndefined();
  });

  it("getRecommendations returns other products", async () => {
    const first = fallbackProducts[0];
    const recs = await getRecommendations(first.id, 2);
    // getRecommendations in this lib returns a Promise of { data: Product[] }
    expect(recs).toBeDefined();
    if ("data" in recs) {
      expect(Array.isArray(recs.data)).toBe(true);
      // none of the recs should have the same id as the seed
      expect(recs.data.every((r) => r.id !== first.id)).toBe(true);
    }
  });
});
