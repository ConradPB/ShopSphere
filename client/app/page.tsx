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

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to ShopSphere
          </h1>
          <p className="text-xl mb-8">
            Discover the best deals on electronics, fashion, and more!
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
