"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type CartItem = Product & { quantity: number };

export default function CartPage() {
  const { state, removeFromCart, updateQty, clearCart } = useCart();
  const items: CartItem[] = state.items;
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border rounded p-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image ?? "/fallback-image.jpg"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1"
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      −
                    </button>
                    <div className="px-3">{item.quantity}</div>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="px-3 py-1"
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
            <div className="flex gap-3">
              <button
                onClick={() => clearCart()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  // simulate checkout — you can replace this with real checkout flow
                  alert(`Proceed to checkout — total: $${total.toFixed(2)}`);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
