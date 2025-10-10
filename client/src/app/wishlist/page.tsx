"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { addToCart } from "@/redux/cartSlice";
import Image from "next/image";
import WishlistButton from "@/components/ui/WishlistButton";
import type { Product } from "@/types/product";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [previewItem, setPreviewItem] = useState<Product | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<Product | null>(null);

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
    toast.success(`Moved "${title}" to cart`);
  };

  const handleRemove = (item: Product) => {
    setConfirmRemove(item);
  };

  const confirmRemoveAction = () => {
    if (confirmRemove) {
      dispatch(removeFromWishlist(confirmRemove.id));
      toast.error(`Removed "${confirmRemove.title}" from wishlist`);
      setConfirmRemove(null);
    }
  };

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-900 text-gray-100 py-20">
        <Toaster position="top-center" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-400 mb-8">
            Save items you love and come back later — we&lsquo;ll keep them here
            for you.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-[1.02] transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // Non-empty state
  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100 py-12 relative">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Wishlist</h1>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:scale-[1.02] transition"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <article
              key={item.id}
              className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative w-full h-52 bg-neutral-700 overflow-hidden">
                <Image
                  src={item.image ?? "/fallback-image.jpg"}
                  alt={item.title}
                  width={700}
                  height={475}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => setPreviewItem(item)}
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
                    aria-label={`Move ${item.title} to cart`}
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(item)}
                    className="px-3 py-2 border border-red-500 rounded-md text-sm text-red-400 hover:bg-red-900/20 transition"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => setPreviewItem(item)}
                    className="px-3 py-2 border border-neutral-600 rounded-md text-sm text-gray-200 hover:bg-neutral-700 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox Preview */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="relative max-w-2xl w-full bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
            >
              <X size={24} />
            </button>

            <Image
              src={previewItem.image ?? "/fallback-image.jpg"}
              alt={previewItem.title}
              width={1000}
              height={700}
              className="w-full h-auto object-cover"
              unoptimized
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{previewItem.title}</h2>
              <p className="text-indigo-400 text-xl font-semibold mb-4">
                ${previewItem.price.toFixed(2)}
              </p>
              <p className="text-gray-300 mb-6">
                {previewItem.description ??
                  "A premium product you'll love — more details coming soon."}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleMoveToCart(
                      previewItem.id,
                      previewItem.title,
                      previewItem.price,
                      previewItem.image
                    )
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
                <WishlistButton product={previewItem as Product} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirm Remove Modal */}
      {confirmRemove && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">
              Remove &#34;{confirmRemove.title}&rdquo; from your wishlist?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmRemove(null)}
                className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveAction}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
