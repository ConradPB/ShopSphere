// client/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
}

// Explicitly type database structure (can be partial)
interface Database {
  public: {
    Tables: {
      products: {
        Row: Product; // Row type
        Insert: Omit<Product, "id">; // Insert type without id
        Update: Partial<Omit<Product, "id">>; // Update type
      };
    };
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getProducts() {
  const { data, error } = await supabase
    .from<"products", Product>("products")
    .select("*");

  if (error) throw error;
  return data;
}
