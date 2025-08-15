"use client";

import React, { useState } from "react";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    // ✅ Pass product in correct structure
    dispatch(addToCart({ product, quantity }));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img
        src={product.image ?? "/fallback-image.jpg"}
        alt={product.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-gray-500 text-lg mt-2">{product.category}</p>
      <p className="text-indigo-600 text-2xl font-bold mt-4">
        ${Number(product.price).toFixed(2)}
      </p>

      <p className="mt-4 text-gray-700">{product.description}</p>

      <div className="flex items-center gap-4 mt-6">
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border rounded-md text-center"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
