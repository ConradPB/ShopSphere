"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  // redux counts (hydration-safe: only show after mount)
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, it) => sum + it.quantity, 0)
  );
  const wishlistCount = useAppSelector((s) => s.wishlist.items.length);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rootClass = [
    "navbar-root fixed top-0 left-0 w-full z-50",
    scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent",
  ].join(" ");

  const linkActive = (href: string) =>
    pathname === href ? "font-semibold underline underline-offset-4" : "";

  return (
    <nav className={rootClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            className={`flex items-center gap-3 ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            <Link href="/" className="flex items-center gap-3">
              {/* small square logo mark */}
              <span
                aria-hidden
                className="w-8 h-8 rounded-md bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-primary)] shadow"
              />
              <span className="text-lg font-display font-bold tracking-wide">
                ShopSphere
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition hover:scale-105 ${
                  scrolled ? "text-neutral-900" : "text-white"
                } ${linkActive(l.href)}`}
              >
                {l.label}
              </Link>
            ))}

            {/* wishlist */}
            <Link href="/wishlist" className="relative flex items-center">
              <Heart
                className={`${
                  scrolled ? "text-neutral-700" : "text-white"
                } w-5 h-5`}
              />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-accent-2)] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* cart */}
            <Link href="/checkout" className="relative flex items-center">
              <ShoppingCart
                className={`${
                  scrolled ? "text-neutral-700" : "text-white"
                } w-5 h-5`}
              />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`${
                scrolled ? "text-neutral-900" : "text-white"
              } p-2 rounded-md`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`${
            scrolled ? "bg-white/95 text-neutral-900" : "bg-black/70 text-white"
          } md:hidden px-4 py-3`}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 ${linkActive(l.href)}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link
              href="/checkout"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
