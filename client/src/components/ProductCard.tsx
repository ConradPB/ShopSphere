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
    <article className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image wrapper */}
      <div className="relative w-full aspect-[4/3] bg-neutral-100 flex items-center justify-center overflow-hidden">
        <Image
          src={imageSrc}
          alt={title || "Product image"}
          fill
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(400, 300)
          )}`}
          loading="lazy"
        />

        {/* Top-right wishlist button */}
        <div className="absolute top-2 right-2">
          <WishlistButton product={product} compact />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-neutral-900 truncate">
          {title}
        </h3>
        <p className="text-primary font-bold mt-1">${price.toFixed(2)}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 btn-primary py-2 text-sm"
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>

          <Link
            href={`/product/${id}`}
            className="px-3 py-2 border rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
