import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

/**
 * Minimal Database typing to help TS infer .from("products")
 * can expand as schema grows.
 */
type DbProductRow = {
  id?: number | string;
  name?: string | null;
  title?: string | null;
  price?: number | string | null;
  image?: string | null;
  image_url?: string | null;
  created_at?: string | null;
};

type Database = {
  public: {
    Tables: {
      products: {
        Row: DbProductRow;
        Insert: Partial<DbProductRow>;
        Update: Partial<DbProductRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!url || !key) {
  // warn but don't throw — CI/test envs may not set these
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set."
  );
}

export const supabase = createClient<Database>(url, key);

/**
 * getProducts()
 * Returns { data: Product[], error: string | null }
 * It maps flexible DB rows (name/title, image/image_url) into the UI Product shape.
 */
export async function getProducts(): Promise<{
  data: Product[];
  error: string | null;
}> {
  const res = await supabase.from("products").select("*");

  if (res.error) {
    return { data: [], error: res.error.message };
  }

  const rows = (res.data ?? []) as DbProductRow[];

  const mapped: Product[] = rows.map((r) => ({
    id: String(r.id ?? ""),
    title: r.title ?? r.name ?? "Unnamed Product",
    price: Number(r.price ?? 0),
    image: r.image ?? r.image_url ?? null,
  }));

  return { data: mapped, error: null };
}
