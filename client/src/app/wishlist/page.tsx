"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { addToCart } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/components/ui/WishlistButton";
import type { Product } from "@/types/product";

export default function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const handleMoveToCart = (
    id: string,
    title: string,
    price: number,
    image: string | null
  ) => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        image: image ?? "/fallback-image.jpg",
        quantity: 1,
      })
    );
    dispatch(removeFromWishlist(id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <article
              key={item.id}
              className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-52 bg-neutral-700 overflow-hidden">
                <Image
                  src={item.image ?? "/fallback-image.jpg"}
                  alt={item.title}
                  width={700}
                  height={475}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-white truncate">
                  {item.title}
                </h3>
                <p className="text-indigo-400 font-bold mt-2">
                  ${item.price.toFixed(2)}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      handleMoveToCart(
                        item.id,
                        item.title,
                        item.price,
                        item.image
                      )
                    }
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Move to Cart
                  </button>

                  <WishlistButton product={item as Product} />

                  <Link
                    href={`/product/${item.id}`}
                    className="px-3 py-2 border border-neutral-600 rounded-md text-sm text-gray-200 hover:bg-neutral-700 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
