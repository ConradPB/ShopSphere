"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductDetailClientProps {
  product: Product;
  initialRecs?: Product[];
  fetchRecs: (id: string) => Promise<Product[]>;
}

export default function ProductDetailClient({
  product,
  initialRecs = [],
  fetchRecs,
}: ProductDetailClientProps) {
  const [recs, setRecs] = useState<Product[]>(initialRecs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const newRecs = await fetchRecs(product.id.toString());
      setRecs(newRecs);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Could not load recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Product info */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">You may also like</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {recs.map((rec) => (
            <div
              key={rec.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={rec.image || "/placeholder.png"}
                alt={rec.title}
                width={150}
                height={150}
                className="rounded-md object-cover mb-2"
              />
              <p className="text-sm font-medium">{rec.title}</p>
              <p className="text-gray-600">${rec.price}</p>
            </div>
          ))}
          {recs.length === 0 && !loading && (
            <p className="text-gray-500">No recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
