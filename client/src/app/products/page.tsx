"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Later, this will fetch from backend API
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              Loading products...
            </p>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-[#111] hover:bg-[#181818] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative w-full aspect-square bg-neutral-800">
                  <Image
                    src={product.image ?? "/fallback-image.jpg"}
                    alt={product.title || "Product image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{product.title}</h3>
                  <p className="text-indigo-400 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
