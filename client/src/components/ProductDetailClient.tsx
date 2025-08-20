"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { useState, useEffect } from "react";

interface ProductDetailClientProps {
  product?: {
    id: string;
    title: string;
    price: number;
    image: string | null;
  };
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  // ✅ Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 bg-gray-300 h-80 rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ If product missing, fallback
  if (!product) {
    return (
      <div className="text-center text-red-500 py-10">Product not found.</div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image ?? "/fallback-image.jpg",
        quantity: 1,
      })
    );
  };

  const imgSrc = product.image ?? "/fallback-image.jpg";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* ✅ Product Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={imgSrc}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg shadow-md object-cover"
            priority
          />
        </div>

        {/* ✅ Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-800">${product.price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
