"use client";

import React, { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  initialRecs?: Product[];
  fetchRecs?: (id: string) => Promise<Product[]>;
};

export default function ProductDetailClient({
  product,
  initialRecs = [],
  fetchRecs,
}: Props) {
  const dispatch = useAppDispatch();
  const [recs, setRecs] = useState<Product[]>(initialRecs ?? []);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if ((!initialRecs || initialRecs.length === 0) && fetchRecs) {
      fetchRecs(product.id)
        .then(setRecs)
        .catch(() => setRecs([]));
    }
  }, [initialRecs, fetchRecs, product.id]);

  function handleAdd(qty = 1) {
    setAdding(true);
    dispatch(addToCart({ product, quantity: qty }));
    setTimeout(() => setAdding(false), 250);
  }

  function handleBuyNow() {
    dispatch(addToCart({ product, quantity: 1 }));
    router.push("/cart");
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={product.image ?? "/fallback-image.jpg"}
            alt={product.title}
            className="w-full h-[420px] object-cover rounded-lg shadow"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-indigo-600 text-xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">
            A high-quality product — description will go here.
          </p>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleAdd(1)}
              disabled={adding}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              {adding ? "Adding..." : "Add to cart"}
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Buy now
            </button>
          </div>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-3">You might also like</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recs && recs.length > 0 ? (
                recs.map((r) => (
                  <article
                    key={r.id}
                    className="bg-white rounded-md shadow-sm overflow-hidden"
                  >
                    <img
                      src={r.image ?? "/fallback-image.jpg"}
                      alt={r.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="text-sm font-medium truncate">
                        {r.title}
                      </h4>
                      <p className="text-xs text-indigo-600">
                        ${r.price.toFixed(2)}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No recommendations available.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
