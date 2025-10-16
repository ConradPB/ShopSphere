import { getRecommendations } from "@/lib/recommendations";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

// Mock the supabase client
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("getRecommendations", () => {
  const mockSelect = jest.fn();
  const mockNeq = jest.fn();
  const mockLimit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Chain the supabase mock methods
    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect.mockReturnValue({
        neq: mockNeq.mockReturnValue({
          limit: mockLimit,
        }),
      }),
    });
  });

  it("returns normalized product data when request succeeds", async () => {
    const mockData = [
      {
        id: "2",
        title: "Mock Product",
        price: 20,
        image: "/image.png",
        description: "A mock product",
        category: "Mock Category",
      },
      {
        id: "3",
        name: "Fallback Title",
        price: 10,
        image_url: "/img.png",
      },
    ];

    mockLimit.mockResolvedValueOnce({ data: mockData, error: null });

    const result = await getRecommendations("1");

    expect(supabase.from).toHaveBeenCalledWith("products");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockNeq).toHaveBeenCalledWith("id", "1");
    expect(result).toHaveLength(2);

    // ✅ Normalization checks
    expect(result[0]).toMatchObject<Product>({
      id: "2",
      title: "Mock Product",
      price: 20,
      image: "/image.png",
      description: "A mock product",
      category: "Mock Category",
    });

    // Fallbacks covered
    expect(result[1].title).toBe("Fallback Title");
    expect(result[1].image).toBe("/img.png");
    expect(result[1].description).toBe("No description available");
    expect(result[1].category).toBe("Uncategorized");
  });

  it("returns empty array and logs error when request fails", async () => {
    const mockError = new Error("Failed to fetch");
    mockLimit.mockResolvedValueOnce({ data: null, error: mockError });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const result = await getRecommendations("1");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching recommendations:",
      mockError
    );

    consoleSpy.mockRestore();
  });
});
