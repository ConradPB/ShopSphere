"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/cartSlice";
import type { CartItem } from "@/redux/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items) as CartItem[];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
