import type { Product } from "@/types/product";
import { fallbackProducts } from "@/lib/products"; // if you have lib/products fallback; otherwise inline

/**
 * getRecommendationsMock
 * Returns an array of Product-like objects to show as "recommended".
 * In future this will call Mistral or a recommendations microservice.
 */
export async function getRecommendationsMock(
  productId: string,
  limit = 4
): Promise<Product[]> {
  // naive: pick fallback items excluding the same id
  // If you have a DB, you'd call a recommendation engine here.
  const items = (fallbackProducts || [])
    .filter((p) => String(p.id) !== String(productId))
    .slice(0, limit);
  // normalize shape to Product type
  return items.map((p) => ({
    id: String(p.id),
    title: p.title,
    price: p.price,
    image: p.image,
  }));
}
