import type { Product } from "@/types/product";

const FALLBACK_IMAGE = "/fallback-image.jpg";

// Mock recommendations until we wire in a real recommender
export async function getRecommendationsMock(
  productId: string,
  limit = 4
): Promise<Product[]> {
  // Just generate mock products based on productId
  const recommendations: Product[] = Array.from({ length: limit }).map(
    (_, idx) => ({
      id: `${productId}-rec-${idx + 1}`,
      title: `Recommended Product ${idx + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: FALLBACK_IMAGE,
      description: "This is a recommended product.",
      category: "Recommended",
    })
  );

  return recommendations;
}
