"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

export default function CartDebugger() {
  const items = useAppSelector((s) => s.cart.items);

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-lg rounded max-w-xs z-50">
      <h2 className="font-bold mb-2">Cart Debugger</h2>
      <pre className="text-xs overflow-auto max-h-40">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}
