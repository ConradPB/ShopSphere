"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-primary/95 via-primary/90 to-primary text-white mt-20 border-t border-white/10">
      {/* Soft gradient for separation from white page background */}
      <div className="absolute -top-6 left-0 w-full h-6 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-display font-bold tracking-wide">
              ShopSphere
            </h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-xs">
              Your one-stop shop for everything you love. Quality products,
              seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-accent-green transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect with us</h3>
            <div className="flex space-x-5">
              {[
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Github, href: "https://github.com" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-accent-green hover:text-white transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">ShopSphere</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
