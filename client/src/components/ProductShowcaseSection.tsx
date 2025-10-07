"use client";

import React from "react";
import ProductGrid from "./ProductGrid";

export default function ProductShowcaseSection() {
  return (
    <section
      id="products"
      className="
        relative w-full py-24 sm:py-32 
        bg-gradient-to-b from-gray-900 via-gray-950 to-black 
        text-white overflow-hidden
      "
    >
      {/* Neon divider line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 opacity-60 blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
          Featured Products
        </h2>

        {/* Product Grid (uses your existing logic) */}
        <ProductGrid title="" />

        {/* Neon divider bottom (blends into footer) */}
        <div className="mt-24 h-[2px] bg-gradient-to-r from-purple-600 via-cyan-400 to-blue-500 opacity-60 blur-sm"></div>
      </div>

      {/* Subtle moving glow in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(56,189,248,0.12),transparent_70%)]"></div>
    </section>
  );
}
