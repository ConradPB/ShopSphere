"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { addToCart } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";

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
    dispatch(removeFromWishlist(id)); // remove after adding to cart
  };

  if (wishlistItems.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">Your wishlist is empty.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image ?? "/fallback-image.jpg"}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="text-indigo-600 font-bold mt-2">
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

                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="px-3 py-2 border rounded-md text-sm text-red-600 hover:bg-red-100"
                >
                  Remove
                </button>

                <Link
                  href={`/product/${item.id}`}
                  className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  View
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
