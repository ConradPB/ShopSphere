"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">ShopSphere</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Shop
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white px-4 py-3 space-y-2">
          <a href="#" className="block hover:text-yellow-300 transition-colors">
            Home
          </a>
          <a href="#" className="block hover:text-yellow-300 transition-colors">
            Shop
          </a>
          <a href="#" className="block hover:text-yellow-300 transition-colors">
            About
          </a>
          <a href="#" className="block hover:text-yellow-300 transition-colors">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
