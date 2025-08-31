"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks"; // typed selector hook
import type { CartItem } from "@/redux/cartSlice";

export default function CartDebugger() {
  // typed selector — avoids 'any'
  const items: CartItem[] = useAppSelector((state) => state.cart.items);

  // prevent render on server / before client mount to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-lg rounded max-w-xs z-50">
      <h2 className="font-bold mb-2">Cart Debugger</h2>
      <pre className="text-xs overflow-auto max-h-40">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}
