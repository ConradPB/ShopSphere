import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

type ProductRow = {
  id: string;
  title?: string;
  name?: string;
  price: number;
  image?: string;
  image_url?: string;
  description?: string;
  category?: string;
};

function normalizeRow(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title ?? row.name ?? "Untitled Product",
    price: row.price,
    image: row.image ?? row.image_url ?? "/fallback.png",
    description: row.description ?? "No description available",
    category: row.category ?? "Uncategorized",
  };
}

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

  return data.map(normalizeRow);
}
