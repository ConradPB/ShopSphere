"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await getProducts();
      if (error) {
        setError(error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!products.length)
    return <p className="text-center py-6">No products found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow"
        >
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
