import { Product } from "@/types/product";
import { getProducts } from "@/lib/supabase";
import { supabase } from "./supabase";

export async function getRecommendations(
  productId: string,
  count: number = 3
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(count);

  if (error || !data) {
    console.error("getRecommendations error:", error);
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
