import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  created_at?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from<Product>("products").select("*");
  if (error) throw new Error(error.message);
  return data ?? [];
}
