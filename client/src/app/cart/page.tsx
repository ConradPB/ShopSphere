"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-gray-400">
        <p>Loading your cart...</p>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-gray-400">
        <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
        <Link
          href="/products"
          className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white py-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center font-display tracking-tight">
          Your Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-neutral-900/70 border border-neutral-800 p-4 rounded-xl shadow-sm backdrop-blur-sm hover:bg-neutral-900/80 transition"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Image
                  src={item.image ?? "/fallback-image.jpg"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  unoptimized
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-indigo-400 text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-8 h-8 bg-neutral-800 rounded-md text-lg hover:bg-neutral-700"
                >
                  –
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="w-8 h-8 bg-neutral-800 rounded-md text-lg hover:bg-neutral-700"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-indigo-400 hidden sm:block">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-neutral-800 pt-6">
          <p className="text-2xl font-semibold mb-6 sm:mb-0">
            Total: <span className="text-indigo-400">${total.toFixed(2)}</span>
          </p>
          <Link
            href="/checkout"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
