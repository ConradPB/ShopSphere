import { createBrowserClient } from "@supabase/ssr";
import type { Product } from "@/types/product";

/**
 * ✅ Safely load environment variables for CI / build
 * If missing, fallback to empty strings and warn — no runtime crash.
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
 * ✅ Create a Supabase client only if env vars exist.
 * Otherwise, use a mock client that won't throw errors during tests/builds.
 */
const createSafeSupabaseClient = () => {
  if (supabaseUrl && supabaseKey) {
    return createBrowserClient(supabaseUrl, supabaseKey);
  }

  // --- Mock client for builds/tests ---
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      eq: () => Promise.resolve({ data: null, error: null }),
      neq: () => Promise.resolve({ data: [], error: null }),
      limit: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
    }),
  } as any;
};

export const supabase = createSafeSupabaseClient();

/**
 * --- Type-safe DB row normalization ---
 */
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

/**
 * --- Public functions for fetching data ---
 */
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
