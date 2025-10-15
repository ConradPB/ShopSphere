import * as dotenv from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Load environment variables once at module load
dotenv.config();

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw early if environment variables are missing
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create the Supabase client once
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Queries all products from the Supabase 'products' table
 * and logs them or any error that occurs.
 */
export async function testSupabase(): Promise<void> {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Supabase Error:", error.message);
      return;
    }

    console.log("Products:", products);
  } catch (e) {
    console.error("Unexpected Error:", e);
  }
}

// Allow this file to be run directly (node lib/test-supabase.ts)
if (typeof require !== "undefined" && require.main === module) {
  testSupabase();
}
