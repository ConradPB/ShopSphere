import { createClient } from "@supabase/supabase-js";

/**
 * Product type — adjust id -> string if your DB uses UUIDs.
 * I used `number` since earlier seeds used serial IDs.
 */
export type Product = {
  id: number;
  name: string;
  title: string;
  price: number;
  image_url: string | null;
  created_at?: string;
};

/**
 * Minimal Database typing so .from("products") is inferred correctly.
 * Extend this as schema grows.
 */
export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id">;
        Update: Partial<Omit<Product, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn instead of throwing so CI/tests without env vars don't crash.
  // Remove or change this behavior in production if you prefer stricter checks.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are not set. Server will create client with empty keys."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Helper to get products.
 * Returns a consistent shape: { data: Product[], error: string | null }
 */
export async function getProducts(): Promise<{
  data: Product[];
  error: string | null;
}> {
  const res = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (res.error) {
    return { data: [], error: res.error.message };
  }
  // cast because createClient<Database> lets TS infer, but runtime still any-ish
  return { data: (res.data ?? []) as Product[], error: null };
}
