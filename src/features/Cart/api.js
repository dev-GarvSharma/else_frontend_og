import { destroy, get, patch, post } from "../../app/axiosWrapper";

export const getCart = () => get("cart");
export const addCartItem = (item) => post("cart/items", item);
export const updateCartItem = (id, quantity) =>
  patch(`cart/items/${id}`, { quantity });
export const removeCartItem = (id) => destroy(`cart/items/${id}`);
