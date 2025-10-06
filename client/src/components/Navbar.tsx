"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-display font-bold">
          ShopSphere
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:text-accent-green">
            Products
          </Link>

          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 text-white group-hover:text-accent-green transition-colors" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/wishlist" className="relative group">
            <Heart className="w-5 h-5 text-white group-hover:text-accent-green transition-colors" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
