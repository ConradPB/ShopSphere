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
      data-testid="product-card"
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
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-cyan-400/60 transition-all duration-500" />

      <div className="absolute top-3 right-3 z-20">
        <WishlistButton product={product} compact />
      </div>

      <Link
        href={`/product/${id}`}
        className="block relative w-full h-64 overflow-hidden z-10"
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
      </Link>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-2xl transition-opacity duration-700"></div>
    </motion.article>
  );
}
