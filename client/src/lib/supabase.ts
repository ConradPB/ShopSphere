import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProducts() {
  const { data, error } = await supabase.from<Product>("products").select("*");
  return { data, error: error ? error.message : null };
}
