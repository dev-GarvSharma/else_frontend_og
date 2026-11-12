import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../app/localStorageService";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: LocalStorageService.getCart(), isOpen: false },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!product?.id) return;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity = (existing.quantity || 1) + 1;
      else state.items.push({ ...product, quantity: 1 });
      LocalStorageService.setCart(state.items);
      state.isOpen = true;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      LocalStorageService.setCart(state.items);
    },
    setCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) item.quantity = Math.max(1, quantity);
      LocalStorageService.setCart(state.items);
    },
    setCartOpen(state, action) { state.isOpen = action.payload; },
  },
});

export const { addToCart, removeFromCart, setCartQuantity, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;
