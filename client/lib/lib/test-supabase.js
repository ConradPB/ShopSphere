import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(supabaseUrl, supabaseKey);
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
    }
    catch (e) {
        console.error("Unexpected Error:", e);
    }
}
testSupabase();
