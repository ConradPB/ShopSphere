import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-white text-2xl font-extrabold tracking-wide drop-shadow-md">
            ShopSphere
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#"
              className="text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#"
              className="block text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#"
              className="block text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="block text-white font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
