"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white mt-20">
      {/* subtle top glow */}
      <div className="absolute -top-6 left-0 w-full h-6 bg-gradient-to-t from-[#2563eb] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
                    className="hover:text-white transition-colors duration-150"
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
            <div className="flex space-x-4 mt-2">
              {[
                {
                  Icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  Icon: Facebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                { Icon: Github, href: "https://github.com", label: "GitHub" },
              ].map(({ Icon, href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                >
                  <Icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/80">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">ShopSphere</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
