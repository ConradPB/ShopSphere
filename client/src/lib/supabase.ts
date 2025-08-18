import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types/product";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Ensure all required Product fields are present
  const mapped: Product[] =
    data?.map((item) => ({
      id: String(item.id ?? ""), // ensure string
      title: String(item.title ?? "Untitled Product"),
      price: Number(item.price ?? 0),
      image: item.image ?? "/placeholder.png",
      description: String(item.description ?? "No description available"),
      category: String(item.category ?? "Uncategorized"),
    })) || [];

  return mapped;
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
