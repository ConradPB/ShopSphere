import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/supabase";

export async function getRecommendations(
  productId: string,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(limit);

  if (error || !data) {
    console.error("Error fetching recommendations:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    title: (row as any).title ?? (row as any).name ?? "Untitled Product",
    price: row.price,
    image: (row as any).image ?? (row as any).image_url ?? "/fallback.png",
    description: (row as any).description ?? "No description available",
    category: (row as any).category ?? "Uncategorized",
  }));
}
