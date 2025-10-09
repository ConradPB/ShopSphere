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

export default function WishlistButton({ product, compact }: WishlistButtonProps) {
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

}
