import type { FC } from "react";
import { supabase } from "@/lib/supabase";

const Home: FC = async () => {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }
};

export default Home;
