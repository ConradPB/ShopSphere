"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import type { Product } from "@/types/product";
import Link from "next/link";
import { getRandomProducts } from "lib/supabase"; // new helper

export type ProductDetailClientProps = {
  product: Product;
  initialRecs?: Product[];
};

export default function ProductDetailClient({
  product,
  initialRecs,
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const [recs, setRecs] = useState<Product[]>(initialRecs ?? []);
  const [adding, setAdding] = useState(false);

  const imgSrc = product.image ?? "/fallback-image.jpg";

  function handleAdd(qty = 1) {
    setAdding(true);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: imgSrc,
        quantity: qty,
      })
    );
    setTimeout(() => setAdding(false), 250);
  }

  // Fetch random recommendations (excluding current product)
  useEffect(() => {
    const fetchRecs = async () => {
      const { data: products, error } = await getRandomProducts(4, product.id);
      if (!error) setRecs(products ?? []);
    };
    fetchRecs();
  }, [product.id]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white py-20">
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {/* Product Image */}
        <div className="relative w-full rounded-lg overflow-hidden shadow max-h-[70vh] bg-neutral-800">
          <Image
            src={imgSrc}
            alt={product.title || "Product image"}
            width={1200}
            height={900}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-indigo-400 text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-300 mb-6">
            {product.description ??
              "A high-quality product — description to come later."}
          </p>

          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => handleAdd(1)}
              disabled={adding}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <Link
              href="/cart"
              className="border border-gray-600 px-5 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          You might also like
        </h2>
        {recs.length === 0 ? (
          <p className="text-gray-400 text-sm">No recommendations available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {recs.map((r) => {
              const rImg = r.image ?? "/fallback-image.jpg";
              return (
                <Link
                  key={r.id}
                  href={`/product/${r.id}`}
                  className="bg-neutral-800 rounded-xl overflow-hidden shadow hover:shadow-indigo-500/30 transition"
                >
                  <div className="relative w-full aspect-square rounded overflow-hidden bg-neutral-700">
                    <Image
                      src={rImg}
                      alt={r.title || "Recommended product"}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h4 className="text-sm font-medium text-white truncate">
                      {r.title}
                    </h4>
                    <p className="text-indigo-400 text-xs mt-1">
                      ${r.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
