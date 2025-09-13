"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const id = String(product.id);
  const title = product.title ?? "Unnamed Product";
  const price = Number(product.price ?? 0);
  const imageSrc: string = product.image ?? "/fallback-image.jpg";

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        image: imageSrc,
        quantity: 1,
      })
    );
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id,
          title,
          price,
          image: imageSrc,
        })
      );
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Image wrapper: fixed responsive heights to prevent image blowout */}
      <div className="relative w-full h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden bg-neutral-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          priority={false}
          unoptimized
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-primary font-bold mt-2">${price.toFixed(2)}</p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark transition"
            aria-label={`Add ${title} to cart`}
          >
            Add to cart
          </button>

          <button
            onClick={toggleWishlist}
            className={`px-3 py-2 border rounded-md text-sm transition ${
              isInWishlist
                ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
          >
            {isInWishlist ? "♥ Wishlisted" : "♡ Wishlist"}
          </button>

          <Link
            href={`/product/${id}`}
            className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
