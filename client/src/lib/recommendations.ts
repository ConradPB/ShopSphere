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
