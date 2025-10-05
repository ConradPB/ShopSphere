"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-display font-bold tracking-wide text-white drop-shadow-md hover:opacity-90 transition-opacity"
          >
            ShopSphere
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-white/90 font-medium">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-accent-green transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="relative group">
              <Heart className="w-5 h-5 text-white group-hover:text-accent-green transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-white group-hover:text-accent-green transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-accent-green transition"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/70 backdrop-blur-md border-t border-white/10 py-4 text-center space-y-3 text-white font-medium">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block hover:text-accent-green transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
