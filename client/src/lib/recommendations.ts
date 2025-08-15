import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";

export async function getRecommendations(
  limit: number = 4
): Promise<Product[]> {
  const products = await getProducts();

  // If there are fewer products than limit, just return all
  if (products.length <= limit) return products;

  // Shuffle and take first `limit`
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
