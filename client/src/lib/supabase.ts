import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

const FALLBACK_IMAGE = "/fallback-image.jpg";

// Shape we expect back from the DB (relaxed/optional)
type DBRow = {
  id: string | number;
  title?: string | null;
  price?: number | null;
  image?: string | null;
  description?: string | null;
  category?: string | null;
};

function normalizeRow(row: DBRow): Product {
  return {
    id: String(row.id),
    title: row.title ?? "Untitled Product",
    price: Number(row.price ?? 0),
    image: row.image ?? FALLBACK_IMAGE, // always a string
    description: row.description ?? "", // default empty
    category: row.category ?? "General", // sensible default
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

  const normalized = (data as DBRow[] | null)?.map(normalizeRow) ?? [];
  return { data: normalized, error: null };
}

export async function getProductById(
  id: string
): Promise<{ data: Product | null; error: string | null }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return { data: null, error: error?.message ?? "Not found" };
  }

  return { data: normalizeRow(data as DBRow), error: null };
}
