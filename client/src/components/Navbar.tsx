"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-primary/90 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-display font-bold tracking-wide drop-shadow-md">
            ShopSphere
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white font-medium items-center">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center hover:scale-110 transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-purple text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-card">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative flex items-center hover:scale-110 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-green text-xs text-white font-bold px-1.5 py-0.5 rounded-full shadow-card">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:scale-110 transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-lg bg-primary-dark/95 px-4 pt-2 pb-3 space-y-2 text-white font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/wishlist"
            className={linkClass("/wishlist")}
            onClick={() => setIsOpen(false)}
          >
            Wishlist ({wishlistCount})
          </Link>
          <Link
            href="/checkout"
            className={linkClass("/checkout")}
            onClick={() => setIsOpen(false)}
          >
            Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
