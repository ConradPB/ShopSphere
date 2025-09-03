"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromWishlist, clearWishlist } from "@/redux/wishlistSlice";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="mb-6 text-gray-600">
          Browse products and add items you love.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-sm text-red-600 hover:underline"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-40">
              <Image
                src={item.image ?? "/fallback-image.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold text-gray-900 truncate">
                {item.title}
              </h2>
              <p className="text-indigo-600 font-bold">
                ${item.price.toFixed(2)}
              </p>
              <div className="mt-auto flex gap-2">
                <Link
                  href={`/product/${item.id}`}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-center hover:bg-indigo-700 transition"
                >
                  View
                </Link>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
