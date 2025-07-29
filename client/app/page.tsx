import type { FC } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Home: FC = async () => {
  const { data: products, error } = await supabase.from("products").select("*");
};

export default Home;
