"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">Your cart is empty.</p>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="font-semibold">x{item.quantity}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <Link
          href="/checkout"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
