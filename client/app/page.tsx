import type { NextPage } from "next";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
}

const Home: NextPage = async () => {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }
};

export default Home;
