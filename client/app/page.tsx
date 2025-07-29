import type { FC } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Home: FC = async () => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    console.log("Supabase Response:", { products, error });

    if (error) {
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
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Featured Products
              </h2>
              <p className="text-center text-red-600">
                Error loading products: {error.message}
              </p>
            </div>
          </section>
        </div>
      );
    }

    if (!products || products.length === 0) {
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
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">\$${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (e) {
    console.error("Unexpected error:", e);
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
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <p className="text-center text-red-600">
              Unexpected error loading products
            </p>
          </div>
        </section>
      </div>
    );
  }
};

export default Home;
