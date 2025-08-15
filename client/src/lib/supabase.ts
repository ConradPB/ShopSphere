import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  // ✅ Ensure all required Product fields are present
  const mapped: Product[] = data.map((item) => ({
    id: String(item.id),
    title: item.title ?? "Untitled Product",
    price: Number(item.price) ?? 0,
    image: item.image ?? "/fallback-image.jpg",
    description: item.description ?? "No description available.",
    category: item.category ?? "Uncategorized",
  }));

  return mapped;
}
