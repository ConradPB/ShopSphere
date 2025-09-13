"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Trash, Plus, Minus } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // ensure body scroll is unlocked on unmount / close
    if (!open) document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const goTo = (path: string) => {
    // close drawer then navigate
    onClose();
    // small timeout ensures drawer begins closing before navigation; optional
    setTimeout(() => {
      router.push(path);
    }, 120);
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-60 w-full sm:w-[420px] transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 ${
          open ? "opacity-100" : "opacity-0"
        } transition-opacity`}
      />

      <div className="relative h-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-medium">Your Cart</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-neutral-500 hover:text-neutral-700"
              aria-label="Clear cart"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded hover:bg-neutral-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center text-neutral-500 py-10">
              Your cart is empty.
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-3">
                  <div className="w-20 h-20 relative rounded overflow-hidden bg-neutral-100">
                    <Image
                      src={it.image || "/fallback-image.jpg"}
                      alt={it.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{it.title}</h4>
                      <button
                        onClick={() => dispatch(removeFromCart(it.id))}
                        aria-label={`Remove ${it.title}`}
                        className="p-1 rounded hover:bg-neutral-100"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center rounded border overflow-hidden">
                        <button
                          onClick={() => dispatch(decreaseQuantity(it.id))}
                          className="px-2 py-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="px-3 border-l border-r text-sm">
                          {it.quantity}
                        </div>
                        <button
                          onClick={() => dispatch(increaseQuantity(it.id))}
                          className="px-2 py-1"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-primary">
                        ${(it.price * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-neutral-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => goTo("/cart")}
              className="flex-1 px-4 py-2 rounded-xl border bg-white text-neutral-800 hover:bg-neutral-50 transition"
              aria-label="View full cart"
            >
              View Cart
            </button>

            <button
              onClick={() => goTo("/checkout")}
              className="flex-1 px-4 py-2 rounded-xl bg-primary text-white"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
