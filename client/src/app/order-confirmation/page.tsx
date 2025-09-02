"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/cartSlice";
import { calculateCartTotal } from "@/types/cart";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const subtotal = calculateCartTotal(cart);
  const shipping = 5;
  const total = subtotal + shipping;

  // ✅ clear cart when this page loads
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Confirmed!</h1>
      <p className="mb-6 text-lg text-gray-700">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="border rounded-lg p-6 mb-6 text-left bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)}</p>
        <p className="font-bold mt-2">Total: ${total.toFixed(2)}</p>
      </div>

      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
