"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-6 text-center">
      {/* Overlay for subtle depth */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Discover the Future of Shopping
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-100">
          Explore unique products, add your favorites to your wishlist, and shop
          effortlessly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/wishlist"
            className="bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-600 transition"
          >
            View Wishlist
          </Link>
        </div>
      </div>
    </section>
  );
}
