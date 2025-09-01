"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  CheckoutFormSchema,
  OrderRequestSchema,
  OrderRequest,
} from "@/lib/checkout";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/cartSlice";
import type { z } from "zod";

type FormShape = z.infer<typeof CheckoutFormSchema>;

export default function CheckoutPage() {
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormShape>({
    resolver: zodResolver(CheckoutFormSchema),
  });

  const total = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  async function onSubmit(values: FormShape) {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const payload: OrderRequest = {
      form: values,
      items: cartItems.map((i) => ({
        id: String(i.id),
        title: i.title,
        price: Number(i.price),
        quantity: Number(i.quantity),
      })),
    };

    // final client-side schema check
    const parsed = OrderRequestSchema.safeParse(payload);
    if (!parsed.success) {
      console.error("Invalid order payload:", parsed.error.format());
      alert("Invalid order data. Please review and try again.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Checkout failed", data);
        alert("Checkout failed. Try again later.");
        return;
      }

      // success: clear cart and show confirmation
      dispatch(clearCart());
      alert(`Order placed! ID: ${data.orderId ?? "(none)"}`);
    } catch (err) {
      console.error("Network error during checkout", err);
      alert("Network error during checkout.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/" className="text-indigo-600">
            Back to shop
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm">Name</label>
              <input
                {...register("name")}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm">Email</label>
              <input
                {...register("email")}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm">Address</label>
              <textarea
                {...register("address")}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
              {errors.address && (
                <p className="text-xs text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm">City</label>
                <input
                  {...register("city")}
                  className="mt-1 block w-full rounded border px-3 py-2"
                />
                {errors.city && (
                  <p className="text-xs text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm">Postal</label>
                <input
                  {...register("postal")}
                  className="mt-1 block w-full rounded border px-3 py-2"
                />
                {errors.postal && (
                  <p className="text-xs text-red-600">
                    {errors.postal.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm">Country</label>
              <input
                {...register("country")}
                className="mt-1 block w-full rounded border px-3 py-2"
              />
              {errors.country && (
                <p className="text-xs text-red-600">{errors.country.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Placing order…"
                : `Place order — $${total.toFixed(2)}`}
            </button>
          </form>

          <aside className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Order summary</h2>
            <ul className="space-y-2">
              {cartItems.map((it) => (
                <li key={it.id} className="flex justify-between">
                  <span>
                    {it.title} × {it.quantity}
                  </span>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
