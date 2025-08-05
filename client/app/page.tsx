// app/page.tsx
import { FC } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  category?: string;
}

const FALLBACK_IMAGE = "https://via.placeholder.com/300x192";

// URL validation helper
const isValidUrl = (url: string | null): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const Home: FC = async () => {
  // Fetch products from Supabase
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
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
        {/* Error message */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <p className="text-center text-red-600">
              Error loading products: {error?.message}
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
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
        {/* No products message */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <p className="text-center">No products available.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
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

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={
                    isValidUrl(product.image_url)
                      ? product.image_url!
                      : FALLBACK_IMAGE
                  }
                  alt={product.name || "Unnamed Product"}
                  width={300}
                  height={192}
                  className="w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">
                  {product.name || "Unnamed Product"}
                </h3>
                <p className="text-gray-600">
                  ${(product.price || 0).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
