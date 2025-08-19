"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

interface ProductDetailClientProps {
  product: {
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

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image ?? "/fallback-image.jpg", // fallback for null images
        quantity: 1, // always add 1, user can adjust in cart
      })
    );
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
