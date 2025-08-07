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

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }
};

export default Home;
