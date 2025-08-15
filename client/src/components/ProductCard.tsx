"use client";

import React from "react";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const name = product.title || "Unnamed Product";
  const imageSrc = product.image ?? "/fallback-image.jpg";

  function handleAdd() {
    // ✅ Pass product in correct structure
    dispatch(addToCart({ product, quantity: 1 }));
  }

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-indigo-600 font-bold mt-2">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAdd}
            className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition"
            aria-label={`Add ${name} to cart`}
          >
            Add to cart
          </button>
          <a
            href={`/product/${product.id}`}
            className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
}
