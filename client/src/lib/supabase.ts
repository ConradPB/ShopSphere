import { createClient } from "@supabase/supabase-js";

// Define database schema (optional but avoids type errors)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          image_url: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image_url: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          image_url?: string;
        };
      };
    };
  };
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
