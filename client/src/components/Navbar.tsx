"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold tracking-wide">
            <Link href="/">ShopSphere</Link>
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
            <Link
              href="/wishlist"
              className="relative hover:text-yellow-300 transition"
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative hover:text-yellow-300 transition"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full px-2 py-0.5">
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
          <Link
            href="/wishlist"
            className="block hover:text-yellow-300 relative"
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="block hover:text-yellow-300 relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-yellow-400 text-black text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
