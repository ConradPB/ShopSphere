import { Product } from "@/types/product";
import { supabase } from "./supabase";

export async function getRecommendations(
  productId: string
): Promise<Product[]> {
  // very simple mock: fetch 3 random products excluding current one
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(3);

  if (error || !data) {
    return [];
  }

  return data as Product[];
}

export async function getRecommendationsMock(
  productId: string,
  count: number = 4
): Promise<Product[]> {
  const { data: products, error } = await getProducts();

  if (error || !products) {
    console.error("getProducts error:", error);
    return [];
  }

  return products
    .filter((p) => p.id.toString() !== productId.toString())
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, count);
}
