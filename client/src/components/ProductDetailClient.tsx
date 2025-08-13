"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

interface Product {
  id: string;
  name: string;
  image: string | null;
  price: number;
  description?: string;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product.image) return; // Ensure image is not null before adding
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">
            {product.description || "No description available."}
          </p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="quantity" className="font-medium">
              Qty:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
