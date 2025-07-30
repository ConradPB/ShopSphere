import { supabase } from "./supabase";

async function test() {
  const { data, error } = await supabase.from("products").select("*");
}

test();
