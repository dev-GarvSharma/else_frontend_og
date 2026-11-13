import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../app/localStorageService";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: LocalStorageService.getCart(), isOpen: false },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!product?.id) return;
      const variantId = product.selectedVariantId ?? product.variants?.[0]?.id ?? null;
      const existing = state.items.find((item) =>
        item.id === product.id &&
        (item.selectedVariantId ?? item.variants?.[0]?.id ?? null) === variantId,
      );
      if (existing) existing.quantity = (existing.quantity || 1) + 1;
      else state.items.push({ ...product, quantity: 1 });
      LocalStorageService.setCart(state.items);
      state.isOpen = true;
    },
    removeFromCart(state, action) {
      const payload = action.payload;
      state.items = state.items.filter((item) => {
        if (typeof payload !== "object" || payload === null) return item.id !== payload;
        return item.id !== payload.id ||
          (payload.variantId != null && (item.selectedVariantId ?? item.variants?.[0]?.id) !== payload.variantId);
      });
      LocalStorageService.setCart(state.items);
    },
    setCartQuantity(state, action) {
      const { id, variantId, quantity } = action.payload;
      const item = state.items.find((entry) =>
        entry.id === id && (variantId == null || (entry.selectedVariantId ?? entry.variants?.[0]?.id) === variantId),
      );
      if (item) item.quantity = Math.max(1, quantity);
      LocalStorageService.setCart(state.items);
    },
    setCartOpen(state, action) { state.isOpen = action.payload; },
  },
});

export const { addToCart, removeFromCart, setCartQuantity, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;
