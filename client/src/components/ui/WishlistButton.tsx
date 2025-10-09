"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import type { Product } from "@/types/product";
import toast from "react-hot-toast";

interface WishlistButtonProps {
  product: Product;
  compact?: boolean; // smaller version for cards
}

export default function WishlistButton({
  product,
  compact,
}: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const prodId = String(product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === prodId);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(prodId));
      toast.error(`Removed "${product.title ?? "Item"}" from wishlist`);
    } else {
      dispatch(
        addToWishlist({
          id: prodId,
          title: product.title ?? "Unnamed Product",
          price: Number(product.price ?? 0),
          image: product.image ?? "/fallback-image.jpg",
        })
      );
      toast.success(`Added "${product.title ?? "Item"}" to wishlist`);
    }
  };

  // Prevent hydration mismatch by not rendering button until mounted
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="px-3 py-2 border rounded-md text-sm opacity-50 cursor-wait"
        aria-hidden
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
      className={`px-3 py-2 border rounded-md text-sm transition inline-flex items-center justify-center gap-2 ${
        isInWishlist
          ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
          : "text-gray-700 hover:bg-gray-50"
      } ${compact ? "text-xs py-1 px-2" : ""}`}
      aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
    >
      <span aria-hidden>{isInWishlist ? "♥" : "♡"}</span>
      <span className="sr-only">
        {isInWishlist ? "Wishlisted" : "Add to wishlist"}
      </span>
      {!compact && <span>{isInWishlist ? "Wishlisted" : "Wishlist"}</span>}
    </button>
  );
}
