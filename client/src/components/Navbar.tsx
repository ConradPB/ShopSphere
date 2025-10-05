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

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const linkClass = (href: string) =>
    `relative transition-colors duration-200 hover:text-accent-green ${
      pathname === href
        ? "font-semibold text-accent-green underline underline-offset-4"
        : "text-white/90"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-primary/95 border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-display font-bold tracking-wide">
            ShopSphere
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center hover:scale-110 transition-transform"
            >
              <Heart className="w-5 h-5 text-white" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-purple text-xs text-white font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative flex items-center hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-green text-xs text-white font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:scale-110 transition-transform"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-primary-dark/95 px-4 py-4 space-y-3 text-white font-medium border-t border-white/10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={linkClass(href)}
            >
              {label}
            </Link>
          ))}

          <div className="flex space-x-6 pt-2">
            <Link href="/wishlist" onClick={() => setIsOpen(false)}>
              Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
