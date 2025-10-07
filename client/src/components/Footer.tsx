"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-display font-bold tracking-wide">
              ShopSphere
            </h2>
            <p className="mt-3 text-sm text-gray-300 max-w-xs">
              Your one-stop shop for quality products and modern shopping
              experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition"
              >
                <Twitter className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition"
              >
                <Github className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">ShopSphere</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
