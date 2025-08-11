"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold tracking-wide">
            ShopSphere
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white font-medium">
            <a href="#" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Products
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              About
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 px-4 pt-2 pb-3 space-y-2 text-white font-medium">
          <a href="#" className="block hover:text-yellow-300">
            Home
          </a>
          <a href="#" className="block hover:text-yellow-300">
            Products
          </a>
          <a href="#" className="block hover:text-yellow-300">
            About
          </a>
          <a href="#" className="block hover:text-yellow-300">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
