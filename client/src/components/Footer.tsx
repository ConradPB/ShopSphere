"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary/90 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-display font-bold">ShopSphere</h2>
            <p className="mt-2 text-sm text-gray-200">
              Your one-stop shop for everything you love. Quality products,
              seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold">Quick Links</h3>
            <Link href="/" className="hover:text-accent-green">
              Home
            </Link>
            <Link href="/products" className="hover:text-accent-green">
              Products
            </Link>
            <Link href="/about" className="hover:text-accent-green">
              About
            </Link>
            <Link href="/contact" className="hover:text-accent-green">
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold">Connect with us</h3>
            <div className="flex space-x-4 mt-2">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-accent-green"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-accent-green"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-accent-green"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
