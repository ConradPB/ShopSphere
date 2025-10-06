"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-display font-bold tracking-wide text-white">
              ShopSphere
            </h2>
            <p className="mt-3 text-sm text-white/90 leading-relaxed max-w-xs">
              Your one-stop shop for everything you love. Quality products,
              seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-white/90">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Connect with us
            </h3>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Github, href: "https://github.com" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 inline-flex items-center justify-center"
                  aria-label={`Open ${href}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/75">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">ShopSphere</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
