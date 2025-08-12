"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
  initialRecs?: Product[];
  fetchRecs?: (id: string) => Promise<Product[]>;
}

export default function ProductDetailClient({
  product,
  initialRecs = [],
  fetchRecs,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    return <p>Product not found</p>;
  }

  // core fields we expect
  const { id, title, image, price } = product;

  // description is optional (not all products have it) — read safely
  const description: string | null =
    // prefer explicit typing change in src/types/product.ts (recommended)
    (product as any).description ?? null;

  // next/image does not accept null for `src` -> provide a string fallback
  const imageSrc: string =
    (image as string | null | undefined) ?? "/fallback-image.jpg";

  function handleAdd(qty = 1) {
    addToCart(product, qty);
  }

  function handleBuyNow() {
    addToCart(product, 1);
    router.push("/cart");
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="relative w-full h-[420px] rounded-lg overflow-hidden shadow">
            <Image
              src={imageSrc}
              alt={title ?? "Unnamed Product"}
              fill
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">
            {title ?? "Unnamed Product"}
          </h1>

          <p className="text-indigo-600 text-xl font-semibold mb-4">
            ${Number(price ?? 0).toFixed(2)}
          </p>

          {description && <p className="text-gray-700 mb-6">{description}</p>}

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleAdd(1)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              Add to cart
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Buy now
            </button>
          </div>

          {/* Recommendations (client-rendered or server can pass initialRecs) */}
          {/* Kept out for brevity here — if you want I can re-add the recs section */}
        </div>
      </div>
    </div>
  );
}
