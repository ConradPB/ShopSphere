"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">Your cart is empty.</p>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                src={item.image ?? "/fallback-image.jpg"}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-md"
                unoptimized
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                –
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="ml-4 text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end">
        <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
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
