import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../app/localStorageService";
import {
  addCartItem as addCartItemRequest,
  getCart,
  removeCartItem as removeCartItemRequest,
  updateCartItem as updateCartItemRequest,
} from "./api";

const getVariantId = (item) =>
  item?.selectedVariantId ?? item?.variants?.[0]?.id ?? null;

const getResponseData = (result) => result?.data?.data;

const readCartItems = (result) => {
  if (!result?.success) throw new Error(result?.message || "Couldn't load your cart.");
  const items = getResponseData(result);
  if (!Array.isArray(items)) throw new Error("The cart response was invalid.");
  return items;
};

// The API returns cart rows. Convert them to the product shape used by the drawer.
const formatCartItem = (cartItem) => {
  const variant = cartItem.variant || {};
  const product = variant.product || {};

  return {
    ...product,
    cartItemId: cartItem.id,
    selectedVariantId: cartItem.variantId || variant.id,
    variants: [variant],
    quantity: cartItem.quantity,
    isPromotional: Boolean(cartItem.isPromotional),
  };
};

const getErrorMessage = (result, fallback) =>
  result?.message || fallback;

// Load the saved account cart and merge any guest items by variant.
export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (_, { rejectWithValue }) => {
    try {
      let serverItems = readCartItems(await getCart());
      const guestItems = LocalStorageService.getCart();

      if (guestItems.length) {
        // Add each guest line through the API so other account cart rows stay intact.
        for (const item of guestItems) {
          const variantId = getVariantId(item);
          if (!variantId) continue;

          const result = await addCartItemRequest({
            variantId,
            quantity: Number(item.quantity) || 1,
          });

          // Keep failed guest lines saved, and remove successful ones to avoid duplicates.
          if (result?.success) {
            const remainingItems = LocalStorageService.getCart().filter(
              (guestItem) => getVariantId(guestItem) !== variantId,
            );
            LocalStorageService.setCart(remainingItems);
          }
        }

        // Fetch again so Redux has full product details and cart-item IDs.
        serverItems = readCartItems(await getCart());
      }

      return serverItems.map(formatCartItem);
    } catch (error) {
      return rejectWithValue(error.message || "Couldn't load your cart.");
    }
  },
);

// Signed-in carts use the API. Guest carts keep working from localStorage.
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState, rejectWithValue }) => {
    if (!getState().auth.isLoggedIn) return { guest: true, product };

    const variantId = getVariantId(product);
    if (!variantId) return rejectWithValue("Choose a product size first.");

    const result = await addCartItemRequest({ variantId, quantity: 1 });
    if (!result?.success) {
      return rejectWithValue(getErrorMessage(result, "Couldn't add this item."));
    }

    return { product, cartItem: getResponseData(result) };
  },
);

export const setCartQuantity = createAsyncThunk(
  "cart/setQuantity",
  async (change, { getState, rejectWithValue }) => {
    if (!getState().auth.isLoggedIn) return { ...change, guest: true };

    const item = getState().cart.items.find(
      (entry) => entry.id === change.id && getVariantId(entry) === change.variantId,
    );
    const cartItemId = change.cartItemId || item?.cartItemId;
    if (!cartItemId) return rejectWithValue("Couldn't find this item in your cart.");

    const result = await updateCartItemRequest(cartItemId, change.quantity);
    if (!result?.success) {
      return rejectWithValue(getErrorMessage(result, "Couldn't update this item."));
    }
    return { ...change, cartItemId, guest: false };
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeItem",
  async (change, { getState, rejectWithValue }) => {
    if (!getState().auth.isLoggedIn) return { ...change, guest: true };

    const item = getState().cart.items.find(
      (entry) => entry.id === change.id && getVariantId(entry) === change.variantId,
    );
    const cartItemId = change.cartItemId || item?.cartItemId;
    if (!cartItemId) return rejectWithValue("Couldn't find this item in your cart.");

    const result = await removeCartItemRequest(cartItemId);
    if (!result?.success) {
      return rejectWithValue(getErrorMessage(result, "Couldn't remove this item."));
    }
    return { ...change, cartItemId, guest: false };
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // A signed-in cart is loaded from the API after startup; only guests read localStorage.
    items: LocalStorageService.getAccessToken() ? [] : LocalStorageService.getCart(),
    isOpen: false,
    isLoading: false,
    isUpdating: false,
    error: null,
  },
  reducers: {
    setCartOpen(state, action) {
      state.isOpen = action.payload;
    },
    restoreGuestCart(state) {
      state.items = LocalStorageService.getCart();
      state.error = null;
    },
    clearCart(state) {
      state.items = [];
      LocalStorageService.setCart([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { product, guest, cartItem } = action.payload;
        const variantId = getVariantId(product);
        const existing = state.items.find(
          (item) => item.id === product.id && getVariantId(item) === variantId,
        );

        if (existing) {
          existing.quantity = guest
            ? (existing.quantity || 1) + 1
            : cartItem.quantity;
          if (!guest) existing.cartItemId = cartItem.id;
        } else {
          state.items.push({
            ...product,
            quantity: guest ? 1 : cartItem.quantity,
            ...(guest ? {} : { cartItemId: cartItem.id }),
          });
        }

        if (guest) LocalStorageService.setCart(state.items);
        state.isOpen = true;
        state.isUpdating = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(setCartQuantity.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(setCartQuantity.fulfilled, (state, action) => {
        const { id, variantId, quantity, guest } = action.payload;
        const item = state.items.find(
          (entry) => entry.id === id && getVariantId(entry) === variantId,
        );
        if (item) item.quantity = quantity;
        if (guest) LocalStorageService.setCart(state.items);
        state.isUpdating = false;
      })
      .addCase(setCartQuantity.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { id, variantId, cartItemId, guest } = action.payload;
        state.items = state.items.filter((item) =>
          guest
            ? item.id !== id || getVariantId(item) !== variantId
            : item.cartItemId !== cartItemId,
        );
        if (guest) LocalStorageService.setCart(state.items);
        state.isUpdating = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCartOpen, restoreGuestCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
