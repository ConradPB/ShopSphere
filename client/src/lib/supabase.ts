import { createClient, PostgrestError } from "@supabase/supabase-js";
import { Product } from "@/types/product";

// Temporary Database type placeholder.
// Replace with generated types when ready: `supabase gen types typescript --project-id <id>`
type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          title?: string;
          name?: string;
          price: number;
          image?: string;
          image_url?: string;
          description?: string;
          category?: string;
        };
      };
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

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

export async function getProducts(): Promise<{
  data: Product[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase.from("products").select("*");
  if (error || !data) return { data: null, error };
  return { data: data.map(normalizeRow), error: null };
}

export async function getProductById(
  id: string
): Promise<{ data: Product | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return { data: null, error };
  return { data: normalizeRow(data), error: null };
}
