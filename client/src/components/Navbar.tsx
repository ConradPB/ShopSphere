"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold tracking-wide">
            ShopSphere
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white font-medium items-center">
            <Link href="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-yellow-300 transition">
              Products
            </Link>
            <Link href="/about" className="hover:text-yellow-300 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative flex items-center">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 px-4 pt-2 pb-3 space-y-2 text-white font-medium">
          <Link href="/" className="block hover:text-yellow-300">
            Home
          </Link>
          <Link href="/products" className="block hover:text-yellow-300">
            Products
          </Link>
          <Link href="/about" className="block hover:text-yellow-300">
            About
          </Link>
          <Link href="/contact" className="block hover:text-yellow-300">
            Contact
          </Link>
          <Link href="/wishlist" className="block hover:text-yellow-300">
            Wishlist ({wishlistCount})
          </Link>
          <Link href="/checkout" className="block hover:text-yellow-300">
            Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
