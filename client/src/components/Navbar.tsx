"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const linkClass = (href: string) =>
    `relative transition hover:scale-105 ${
      pathname === href
        ? "font-bold text-cyan-400 underline underline-offset-4"
        : "text-gray-800 dark:text-gray-200 hover:text-cyan-300"
    }`;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 navbar-root transition-all duration-300"
      aria-label="Main navigation"
    >
      {/* 💡 Improved adaptive background */}
      <div
        className="
          backdrop-blur-md border-b
          bg-white/70 dark:bg-zinc-900/70
          border-white/20 dark:border-zinc-700/50
          shadow-sm dark:shadow-[0_0_15px_rgba(0,0,0,0.6)]
        "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <span className="inline-block w-8 h-8 rounded-md bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-md" />
                <span className="text-gray-900 dark:text-white font-display text-lg font-bold drop-shadow-sm">
                  ShopSphere
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={linkClass(href)}>
                  {label}
                </Link>
              ))}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative flex items-center gap-2 group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-cyan-400 transition-colors" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 group"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-cyan-400 transition-colors" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen((s) => !s)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200/20 transition"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-white/20 dark:border-zinc-700/50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href) + " block py-2"}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/wishlist"
              className="block py-2 text-gray-800 dark:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
            </Link>

            <Link
              href="/cart"
              className="block py-2 text-gray-800 dark:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
