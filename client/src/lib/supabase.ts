import { createBrowserClient } from "@supabase/ssr";
import type { Product } from "@/types/product";

/**
 * Safely load environment variables for CI / build
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "⚠️ Supabase environment variables are missing. Using mock client for tests/builds."
    );
  }
}

/**
 * Infer the Supabase client type from the factory so we can type the mock without `any`.
 */
type ClientType = ReturnType<typeof createBrowserClient>;

const createSafeSupabaseClient = (): ClientType => {
  if (supabaseUrl && supabaseKey) {
    return createBrowserClient(supabaseUrl, supabaseKey);
  }

  // Minimal mock implementing the chaining used in this repo:
  const mock = {
    from: (_table: string) => ({
      // `select()` used to fetch arrays
      select: async () => ({ data: [] as unknown[], error: null }),
      // `eq().select()` and `eq().single()` patterns
      eq: (_col: string, _val: string) => ({
        select: async () => ({ data: null, error: null }),
        single: async () => ({ data: null, error: null }),
      }),
      // `neq().limit()` and `neq().select()` patterns
      neq: (_col: string, _val: string) => ({
        select: async () => ({ data: [] as unknown[], error: null }),
        limit: async (_n: number) => ({ data: [] as unknown[], error: null }),
      }),
      // some callers call `.limit()` directly after `.from(...).select(...).limit(...)`
      limit: async (_n: number) => ({ data: [] as unknown[], error: null }),
      // `.single()` sometimes used directly
      single: async () => ({ data: null, error: null }),
    }),
  };

  // cast via unknown to the real client type (avoids `any`)
  return mock as unknown as ClientType;
};

export const supabase = createSafeSupabaseClient();

/* ---------- rest of your file unchanged ---------- */

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
    image: row.image ?? null,
    description: row.description ?? undefined,
    category: row.category ?? undefined,
  };
}

export async function getProducts(): Promise<{
  data: Product[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return { data: null, error: error.message };
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
  if (error || !data)
    return { data: null, error: error?.message ?? "Not found" };
  return { data: normalizeRow(data as DBRow), error: null };
}

export async function getRecommendations(
  productId: string,
  count = 4
): Promise<{ data: Product[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(count);

  if (error) return { data: null, error: error.message };
  const normalized = (data as DBRow[] | null)?.map(normalizeRow) ?? [];
  return { data: normalized, error: null };
}

export async function getRandomRecommendations(
  productId: string,
  count = 4
): Promise<{ data: Product[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId);

  if (error) return { data: null, error: error.message };
  if (!data || data.length === 0) return { data: [], error: null };

  const shuffled = (data as DBRow[]).sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count).map(normalizeRow);

  return { data: selected, error: null };
}
