import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  created_at?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // warning only so tests/CI without env vars don't crash; in prod/dev you may prefer to throw
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
