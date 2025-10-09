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
  useEffect(() => setMounted(true), []);

  const prodId = String(product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === prodId);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent accidental link navigation
    e.preventDefault();

    if (isInWishlist) {
      dispatch(removeFromWishlist(prodId));
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
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
            } bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3`}
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

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="px-3 py-2 border rounded-md text-sm opacity-50 cursor-wait"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-pressed={isInWishlist}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all border flex items-center gap-2
        ${
          isInWishlist
            ? "bg-transparent border-red-500 text-red-500 hover:bg-red-500/10"
            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 dark:border-gray-600 hover:brightness-110"
        }
        ${compact ? "text-xs py-1 px-2" : ""}
      `}
      aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
    >
      <span
        aria-hidden
        className={isInWishlist ? "text-red-500" : "text-gray-500"}
      >
        {isInWishlist ? "♥" : "♡"}
      </span>
      {!compact && <span>{isInWishlist ? "Wishlisted" : "Wishlist"}</span>}
    </button>
  );
}
