"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

interface ProductDetailClientProps {
  product: Product;
  setCart?: React.Dispatch<React.SetStateAction<Product[]>>; // For local state cart
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, setCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (setCart) {
      // If setCart is provided, update local state
      setCart((prevCart) => [...prevCart, product]);
    } else {
      // Otherwise, use Redux
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={product.image || "/placeholder.png"} // Fallback if no image
            alt={product.name}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">${product.price.toFixed(2)}</p>

          {/* Description */}
          {product.description && (
            <p className="mt-4 text-gray-700">{product.description}</p>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
