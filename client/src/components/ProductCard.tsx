"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import { shimmer, toBase64 } from "@/lib/blur";
import type { Product } from "@/types/product";
import WishlistButton from "./ui/WishlistButton";

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

  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-neutral-100 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title || "Product image"}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(400, 300)
          )}`}
          loading="lazy"
        />

        {/* Wishlist floating button */}
        <div className="absolute top-3 right-3">
          <WishlistButton product={product} compact />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-primary font-bold mt-2">${price.toFixed(2)}</p>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg shadow hover:opacity-90 transition"
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>

          <Link
            href={`/product/${id}`}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
