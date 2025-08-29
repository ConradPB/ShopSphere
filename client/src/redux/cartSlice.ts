import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Coerce id to string to avoid number/string mismatch issues
      const payload: CartItem = {
        ...action.payload,
        id: String(action.payload.id),
      };

      const existing = state.items.find((item) => item.id === payload.id);
      if (existing) {
        existing.quantity += payload.quantity;
      } else {
        state.items.push(payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const id = String(action.payload.id);
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = String(action.payload);
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = String(action.payload);
      const item = state.items.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
