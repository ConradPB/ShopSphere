"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import type { Product } from "@/types/product";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const prodId = String(product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === prodId);
  const [animate, setAnimate] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const newStatus = !isInWishlist;
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400); // reset animation

    if (isInWishlist) {
      dispatch(removeFromWishlist(prodId));
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
          >
            <span>💔 Removed from Wishlist</span>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3`}
          >
            <span>💚 Added to Wishlist</span>
          </motion.div>
        ),
        { duration: 2000 }
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
    <motion.button
      type="button"
      onClick={toggleWishlist}
      aria-pressed={isInWishlist}
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all border flex items-center gap-2 select-none
        ${
          isInWishlist
            ? "bg-transparent border-red-500 text-red-500 hover:bg-red-500/10"
            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 dark:border-gray-600 hover:brightness-110"
        }
        ${compact ? "text-xs py-1 px-2" : ""}
      `}
      aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
    >
      <motion.span
        aria-hidden
        animate={animate ? { scale: [1, 1.5, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={`${
          isInWishlist ? "text-red-500" : "text-gray-500 dark:text-gray-300"
        }`}
      >
        {isInWishlist ? "♥" : "♡"}
      </motion.span>
      {!compact && <span>{isInWishlist ? "Wishlisted" : "Wishlist"}</span>}
    </motion.button>
  );
}
