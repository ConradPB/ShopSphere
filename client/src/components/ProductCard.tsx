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
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Image wrapper: responsive height so parent reserves space */}
      <div className="relative w-full h-44 sm:h-56 md:h-48 lg:h-56 bg-neutral-100 overflow-hidden">
        {/* Use width/height (stable intrinsic), but render responsively via CSS classes */}
        <Image
          src={imageSrc}
          alt={title || "Product image"}
          width={800}
          height={600}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(800, 600)
          )}`}
          loading="lazy"
          unoptimized
        />

        {/* Wishlist button in top-right of image */}
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton product={product} compact />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>

        <p className="text-primary font-bold mt-2">${price.toFixed(2)}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark transition"
            aria-label={`Add ${title} to cart`}
          >
            Add to cart
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
