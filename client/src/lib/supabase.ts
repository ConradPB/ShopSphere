import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Fetch a single product
export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, price, image")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  // Force id to string for type safety
  return {
    ...data,
    id: String(data.id),
  } as Product;
}

// ✅ Fetch recommendations (exclude current product)
export async function getRecommendations(
  productId: string,
  count: number = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, price, image")
    .neq("id", productId)
    .limit(count);

  if (error) {
    console.error("Error fetching recommendations:", error.message);
    return [];
  }

  // Force all ids to string for stability
  return (data ?? []).map((p) => ({
    ...p,
    id: String(p.id),
  })) as Product[];
}
