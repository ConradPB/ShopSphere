"use client";
import { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/supabase";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await getProducts();
      if (error) {
        setError(error);
      } else {
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          ShopSphere
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover curated products — clean design, great prices.
        </p>
        <div className="mt-8">
          <a
            href="#products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium shadow hover:bg-indigo-700 transition"
          >
            Browse Featured
          </a>
        </div>
      </section>

      <section id="products" aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="text-2xl font-semibold text-gray-900 mb-6 text-center"
        >
          Featured Products
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden product-card"
              data-testid="product-card"
            >
              <img
                src={product.image_url || "/fallback-image.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-indigo-600 font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
