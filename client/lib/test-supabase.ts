import { supabase } from "./supabase";

async function testSupabase() {
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

testSupabase();
