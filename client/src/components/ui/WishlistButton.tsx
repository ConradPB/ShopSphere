"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import type { Product } from "@/types/product";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface WishlistButtonProps {
  product: Product;
  compact?: boolean;
}

export default function WishlistButton({
  product,
  compact,
}: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const prodId = String(product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === prodId);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(prodId));
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
          >
            <span>❌ Removed from Wishlist</span>
          </div>
        ),
        { duration: 2000 }
      );
    } else {
      dispatch(
        addToWishlist({
          id: prodId,
          title: product.title ?? "Unnamed Product",
          price: Number(product.price ?? 0),
          image: product.image ?? "/fallback-image.jpg",
        })
      );
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3`}
          >
            <span>💚 Added to Wishlist</span>
            <button
              onClick={() => {
                router.push("/wishlist");
                toast.dismiss(t.id);
              }}
              className="text-sm underline font-medium hover:text-white/80"
            >
              View
            </button>
          </div>
        ),
        { duration: 3000 }
      );
    }
  };
}
