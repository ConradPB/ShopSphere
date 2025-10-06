"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="text-primary w-6 h-6" />
          <span className="text-xl font-semibold text-gray-800">
            ShopSphere
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link
          href="/shop"
          className={`hidden md:inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            scrolled
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-white text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Shop Now
        </Link>
      </div>
    </motion.nav>
  );
}
