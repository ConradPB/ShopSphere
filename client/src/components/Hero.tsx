"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-6 sm:px-10 py-20 bg-gradient-to-br from-accent-green via-cyan-500 to-blue-600 text-white overflow-hidden">
      {/* Glow overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight drop-shadow-md">
          Discover Products that Inspire
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/90 leading-relaxed">
          Explore top-quality items curated for your lifestyle — only at{" "}
          <span className="font-semibold text-white">ShopSphere</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:scale-105 transition-all duration-200"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Subtle floating background accent */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10 top-32 left-1/2 -translate-x-1/2" />

      {/* Smooth blend to next section - removes white gap */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
