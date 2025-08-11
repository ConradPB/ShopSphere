import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-extrabold tracking-wide drop-shadow-md">
              ShopSphere
            </h1>
          </div>

          {/* Links */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
