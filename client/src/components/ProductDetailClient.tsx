"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import WishlistButton from "./ui/WishlistButton";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid"; // for recommended section
import { shimmer, toBase64 } from "@/lib/blur";

interface Props {
  product: Product;
  initialRecs?: Product[];
}

export default function ProductDetailClient({ product, initialRecs }: Props) {
  const dispatch = useAppDispatch();

  const id = String(product.id);
  const title = product.title ?? "Unnamed Product";
  const price = Number(product.price ?? 0);
  const imageSrc: string = product.image ?? "/fallback-image.jpg";
  const description =
    product.description ?? "No description available for this product.";

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image: imageSrc, quantity: 1 }));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white px-6 md:px-12 py-16"
    >
      {/* Product container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(56,189,248,0.3)]"
        >
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={600}
            className="object-cover w-full h-[450px] md:h-[550px] rounded-2xl"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 600)
            )}`}
          />

          <div className="absolute top-3 right-3 z-10">
            <WishlistButton product={product} compact />
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-30 transition duration-700 blur-2xl rounded-2xl"></div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-300">
            {title}
          </h1>
          <p className="text-xl font-semibold text-cyan-400">
            ${price.toFixed(2)}
          </p>
          <p className="text-gray-300 leading-relaxed">{description}</p>

          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-cyan-500/40 transition-all duration-300"
            >
              Add to Cart
            </motion.button>

            <WishlistButton product={product} />
          </div>
        </motion.div>
      </div>

      {/* Recommended Section */}
      {initialRecs && initialRecs.length > 0 && (
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold mb-8 text-cyan-300">
            You might also like
          </h2>
          <ProductGrid initialProducts={initialRecs} />
        </div>
      )}
    </motion.section>
  );
}
