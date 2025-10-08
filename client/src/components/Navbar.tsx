"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

/**
 * Navbar
 *
 * - Desktop: translucent blurred bar with nav links + wishlist/cart badges
 * - Mobile: toggle menu
 * - Shows numeric badges only after mount to avoid hydration mismatch
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // read redux state
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    // mount guard for hydration-safe badge rendering
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const linkClass = (href: string) =>
    `relative transition hover:scale-105 hover:text-secondary-light ${
      pathname === href
        ? "font-bold text-secondary underline underline-offset-4"
        : ""
    }`;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 navbar-root"
      aria-label="Main navigation"
    >
      <div className="backdrop-blur-md bg-white/8 dark:bg-black/20 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <span className="inline-block w-8 h-8 rounded-md bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-md" />
                <span className="text-white font-display text-lg font-bold drop-shadow-sm">
                  ShopSphere
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
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
                <Heart className="w-5 h-5 text-white group-hover:text-accent-2 transition-colors" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-2 text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-card">
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
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-card">
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
                className="p-2 rounded-md text-white hover:bg-white/10 transition"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/6 backdrop-blur-lg border-t border-white/6">
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
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
            </Link>

            <Link
              href="/cart"
              className="block py-2"
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
