import { createClient } from "@supabase/supabase-js";
import { Product } from "../types/product";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

export async function getProducts(): Promise<{
  data: Product[];
  error: string | null;
}> {
  const { data, error } = await supabase.from("products").select("*");
  return {
    data: data || [],
    error: error ? error.message : null,
  };
}
