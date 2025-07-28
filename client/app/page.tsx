import type { FC } from "react";
import { supabase } from "@/lib/supabase";

const Home: FC = async () => {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
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
      {/* Product Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8"></section>
    </div>
  );
};

export default Home;
