import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Product } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type DBRow = {
  id: string;
  title?: string; // optional
  name?: string; // optional
  price: number;
  image?: string; // optional
  image_url?: string; // optional
  description?: string;
  category?: string;
};

function normalizeRow(row: DBRow): Product {
  return {
    id: row.id,
    title: row.title ?? row.name ?? "Untitled Product",
    price: row.price,
    image: row.image ?? row.image_url ?? "/fallback.png",
    description: row.description ?? "No description available",
    category: row.category ?? "Uncategorized",
  };
}

export async function getProducts(): Promise<{
  data: Product[] | null;
  error: any;
}> {
  const { data, error } = await supabase.from("products").select("*");
  if (error || !data) return { data: null, error };
  return { data: data.map(normalizeRow), error: null };
}

export async function getProductById(
  id: string
): Promise<{ data: Product | null; error: any }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return { data: null, error };
  return { data: normalizeRow(data), error: null };
}
