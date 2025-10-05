"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Transition Fade (smooth gradient merge) */}
      <div className="h-16 bg-gradient-to-b from-white via-cyan-50 to-transparent -mt-4" />

      {/* Welcome Section */}
      <section className="relative bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-600 text-white py-24 shadow-lg overflow-hidden rounded-b-2xl mt-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold font-display drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to ShopSphere
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Discover the best products, curated just for you. Shop smarter, live
            better.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-accent-green hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition glow-green"
            >
              Shop Now
            </motion.a>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
