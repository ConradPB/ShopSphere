import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { getProductById } from "@/lib/supabase";
import { getRecommendations } from "@/lib/recommendations";

// Mock dependencies
jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(),
}));

jest.mock("@/lib/recommendations", () => ({
  getRecommendations: jest.fn(),
}));

describe("Product Page", () => {
  const mockProduct = {
    id: "123",
    title: "Test Product",
    price: 99.99,
    image: "https://example.com/test.jpg",
  };

  const mockRecommendations = [
    { id: "456", title: "Reco 1", price: 49.99, image: null },
    {
      id: "789",
      title: "Reco 2",
      price: 79.99,
      image: "https://example.com/reco.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details", async () => {
    (getProductById as jest.Mock).mockResolvedValue({
      data: mockProduct,
      error: null,
    });
    (getRecommendations as jest.Mock).mockResolvedValue(mockRecommendations);

    const params = Promise.resolve({ id: "123" });
    render(await ProductPage({ params }));

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    (getProductById as jest.Mock).mockResolvedValue({
      data: mockProduct,
      error: null,
    });
    (getRecommendations as jest.Mock).mockResolvedValue(mockRecommendations);

    const params = Promise.resolve({ id: "123" });
    render(await ProductPage({ params }));

    expect(await screen.findByText("Reco 1")).toBeInTheDocument();
    expect(await screen.findByText("Reco 2")).toBeInTheDocument();
  });

  it("handles notFound case", async () => {
    (getProductById as jest.Mock).mockResolvedValue({
      data: null,
      error: "Not found",
    });

    const params = Promise.resolve({ id: "does-not-exist" });
    const result = await ProductPage({ params });

    // since notFound() returns `never`, result should be undefined
    expect(result).toBeUndefined();
  });
});
