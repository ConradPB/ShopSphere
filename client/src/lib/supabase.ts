import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  created_at?: string;
};

interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id">;
        Update: Partial<Omit<Product, "id">>;
      };
      // add other tables here when needed
    };
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // do not throw here — tests/CI might not provide env vars.
  // We warn so you know to set these for local/dev usage.
  // The client will still be created (with empty strings) which is safer for tests.
  // If you want stricter behavior, replace with a thrown Error in dev.
  // e.g. if (process.env.NODE_ENV !== "test") throw new Error("Missing SUPABASE env vars")
  // but for now we keep it permissive.
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are not set — supabase client created with empty strings."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Fetch products helper
 * Returns { data: Product[] (empty array on error), error: string | null }
 */
export async function getProducts(): Promise<{
  data: Product[];
  error: string | null;
}> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    return { data: [], error: error.message };
  }
  return { data: (data ?? []) as Product[], error: null };
}
