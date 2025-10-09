"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import type { Product } from "@/types/product";
import Link from "next/link";

export type ProductDetailClientProps = {
  product: Product;
  recommendations?: Product[];
  initialRecs?: Product[];
};

export default function ProductDetailClient({
  product,
  recommendations,
  initialRecs,
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();

  const seeded = useMemo(
    () => recommendations ?? initialRecs ?? [],
    [recommendations, initialRecs]
  );
  const [recs, setRecs] = useState<Product[]>(seeded);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setRecs(seeded ?? []);
  }, [seeded]);

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

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white py-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 z-10">
        {/* Left: Product Image */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-white/5 backdrop-blur-lg">
          <Image
            src={imgSrc}
            alt={product.title || "Product image"}
            width={1200}
            height={900}
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            priority
            unoptimized
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-cyan-400 text-2xl font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-300 leading-relaxed mb-8">
            {product.description ??
              "A high-quality product — detailed description coming soon."}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => handleAdd(1)}
              disabled={adding}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <Link
              href="/cart"
              className="border border-cyan-400/40 px-5 py-3 rounded-lg text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Go to Cart
            </Link>
          </div>

          <Link
            href="/products"
            className="text-sm text-cyan-400 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="relative max-w-6xl mx-auto mt-20 px-6 z-10">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-300">
          Related Products
        </h2>

        {recs.length === 0 ? (
          <p className="text-gray-500">No related products yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recs.map((r) => (
              <Link
                key={r.id}
                href={`/product/${r.id}`}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-md hover:shadow-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={r.image ?? "/fallback-image.jpg"}
                    alt={r.title || "Related product"}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-medium text-white truncate">
                    {r.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-semibold mt-1">
                    ${r.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
