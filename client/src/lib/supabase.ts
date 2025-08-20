import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

const FALLBACK_IMAGE = "/fallback-image.jpg";

export async function getProducts(): Promise<{
  data: Product[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return { data: null, error: error.message };
  }

  const normalized = (data ?? []).map((p) => ({
    id: String(p.id),
    title: p.title,
    price: p.price,
    image: p.image ?? FALLBACK_IMAGE, // ✅ enforce string
  }));

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

  const normalized: Product = {
    id: String(data.id),
    title: data.title,
    price: data.price,
    image: data.image ?? FALLBACK_IMAGE, // ✅ enforce string
  };

  return { data: normalized, error: null };
}
