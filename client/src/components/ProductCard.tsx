"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    dispatch(addToCart({ id, title, price, image: imageSrc, quantity: 1 }));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="
        group relative backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] 
        hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] 
        overflow-hidden transition-all duration-500
      "
    >
      {/* Glow border effect */}
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-cyan-400/60 transition-all duration-500" />

      {/* Product Image */}
      <Link
        href={`/product/${id}`}
        className="block relative w-full h-64 overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt={title || "Product image"}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(400, 300)
          )}`}
          loading="lazy"
        />
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} compact />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 text-center text-white">
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 hover:text-cyan-300 transition">
            {title}
          </h3>
        </Link>

        <p className="text-cyan-300 font-bold mt-2 text-lg drop-shadow-sm">
          ${price.toFixed(2)}
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Add to Cart
          </motion.button>

          <Link
            href={`/product/${id}`}
            className="px-4 py-2 border border-cyan-400/40 rounded-lg text-sm text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-300"
          >
            View
          </Link>
        </div>
      </div>

      {/* Neon pulse effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-2xl transition-opacity duration-700"></div>
    </motion.article>
  );
}
