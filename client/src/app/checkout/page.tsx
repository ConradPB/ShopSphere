"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/cartSlice";
import Link from "next/link";

type CheckoutForm = {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  country: string;
};

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    try {
      // Simulate async order processing (replace with real API call later).
      await new Promise((resolve) => setTimeout(resolve, 800));

      // After successful "order", clear cart and show confirmation:
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (err) {
      // handle or show error to user in a real implementation
      console.error("Checkout failed", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you — order placed!</h2>
        <p className="mb-4">
          We emailed a receipt to {form.email || "your address"}.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {cartItems.length === 0 ? (
          <div>
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link href="/" className="text-indigo-600 hover:underline">
              Back to shop
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    name="postal"
                    value={form.postal}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting
                    ? "Placing order…"
                    : `Place order — $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <aside>
        <h2 className="text-lg font-semibold mb-3">Order summary</h2>
        <div className="bg-white p-4 rounded shadow">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((it) => (
                <li key={it.id} className="flex justify-between">
                  <span>
                    {it.title} × {it.quantity}
                  </span>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
