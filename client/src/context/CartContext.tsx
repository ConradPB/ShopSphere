"use client";
import React, { createContext, useContext, useReducer } from "react";
import type { Product } from "@/types/product";

type CartItem = Product & { quantity: number };

type State = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_ITEM"; product: Product; qty?: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR_CART" };

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, qty = 1 } = action;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity: qty }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.qty } : i
        ),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// Add helper function signatures
interface CartContextType {
  state: State;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: Product, qty: number = 1) =>
    dispatch({ type: "ADD_ITEM", product, qty });

  const removeFromCart = (id: string) => dispatch({ type: "REMOVE_ITEM", id });

  const updateQty = (id: string, qty: number) =>
    dispatch({ type: "UPDATE_QTY", id, qty });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
