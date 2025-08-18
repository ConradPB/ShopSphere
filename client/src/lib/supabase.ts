import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

// tolerant mapping from DB row to our Product type
function mapRowToProduct(row: any): Product {
  return {
    id: String(row.id),
    title: row.title ?? row.name ?? "Untitled",
    price: Number(row.price ?? 0),
    image: row.image ?? row.image_url ?? undefined,
    description: row.description ?? "",
    category: row.category ?? "General",
  };
}

export async function getProducts(): Promise<{
  data: Product[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return { data: null, error: error.message };
  }

  const mapped = (data ?? []).map(mapRowToProduct);
  return { data: mapped, error: null };
}

export async function getProductById(id: string): Promise<{
  data: Product | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { data: null, error: error.message };
  }
  if (!data) return { data: null, error: "Not found" };

  return { data: mapRowToProduct(data), error: null };
}
