"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import type { Product } from "@/types/product";
import WishlistButton from "./ui/WishlistButton";

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
  const router = useRouter();

  const seeded = useMemo(
    () => recommendations ?? initialRecs ?? [],
    [recommendations, initialRecs]
  );
  const [recs, setRecs] = useState<Product[]>(seeded);
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setRecs(seeded ?? []);
  }, [seeded]);

  const imgSrc = product.image ?? "/fallback-image.jpg";

  function handleAdd(qtyToAdd = 1) {
    setAdding(true);
    dispatch(
      addToCart({
        id: String(product.id),
        title: product.title ?? "Unnamed Product",
        price: Number(product.price ?? 0),
        image: imgSrc,
        quantity: qtyToAdd,
      })
    );
    // small UX delay for feedback
    setTimeout(() => setAdding(false), 350);
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Left: image + back button */}
      <div className="relative w-full rounded-lg overflow-hidden shadow max-h-[75vh] bg-neutral-900/40">
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-black/50 text-white px-3 py-2 rounded-lg backdrop-blur-sm hover:opacity-90 transition"
            aria-label="Back to products"
          >
            ← Back
          </button>
        </div>

        {/* Wishlist btn placed top-right */}
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton
            product={
              {
                id: String(product.id),
                title: product.title ?? "Unnamed Product",
                price: Number(product.price ?? 0),
                image: product.image ?? "/fallback-image.jpg",
              } as Product
            }
            compact
          />
        </div>

        {/* Image (use intrinsic width/height to reserve space) */}
        <div className="relative w-full h-[min(60vh,600px)] bg-neutral-800/20 flex items-center justify-center">
          <Image
            src={imgSrc}
            alt={product.title || "Product image"}
            width={1200}
            height={900}
            className="object-contain w-full h-full"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Right: info */}
      <div className="flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {product.title}
          </h1>
          <p className="text-cyan-300 font-bold text-xl mt-2">
            ${Number(product.price ?? 0).toFixed(2)}
          </p>
          <p className="text-neutral-300 mt-3">{product.description}</p>
        </div>

        {/* Quantity + Add to cart */}
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-900/40 p-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 rounded-md bg-transparent hover:bg-white/5 transition text-white"
              >
                −
              </button>
              <div className="px-4 py-2 font-medium text-white min-w-[48px] text-center">
                {qty}
              </div>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 rounded-md bg-transparent hover:bg-white/5 transition text-white"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleAdd(qty)}
              disabled={adding}
              className="ml-3 inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg hover:scale-102 transition transform"
            >
              {adding ? "Adding..." : "Add to cart"}
            </button>

            <Link
              href="/cart"
              className="ml-2 inline-flex items-center px-4 py-2 border border-neutral-700 rounded-lg text-white hover:bg-white/5 transition"
            >
              View cart
            </Link>
          </div>

          {/* small meta row */}
          <div className="mt-4 text-sm text-neutral-400">
            <div>Category: {product.category ?? "General"}</div>
            <div className="mt-1">SKU: {String(product.id)}</div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            You might also like
          </h3>

          {recs.length === 0 ? (
            <p className="text-sm text-neutral-400">No recommendations yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {recs.map((r) => {
                const rImg = r.image ?? "/fallback-image.jpg";
                return (
                  <Link
                    key={r.id}
                    href={`/product/${r.id}`}
                    className="flex items-center gap-3 bg-neutral-900/40 p-2 rounded-lg hover:shadow-md transition"
                  >
                    <div className="w-16 h-16 bg-neutral-800 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={rImg}
                        alt={r.title || "Recommended product"}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="text-sm text-white line-clamp-1">
                        {r.title}
                      </div>
                      <div className="text-xs text-cyan-300">
                        ${Number(r.price ?? 0).toFixed(2)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
