"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 w-full">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-4 text-gray-500">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
