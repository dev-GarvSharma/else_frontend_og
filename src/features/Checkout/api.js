import { get, post, put } from "../../app/axiosWrapper";

export const getAddresses = () => get("addresses");
export const addAddress = (address) => post("addresses", address);
export const updateAddress = (id, address) => put(`addresses/${id}`, address);
export const syncCart = (items) => put("cart", { items });
export const validateCoupon = (code) => post("coupons/validate", { code });
export const createOrder = (details) => post("orders", details);
export const verifyPayment = (orderId, payment) =>
  post(`orders/${orderId}/payment/verify`, payment);
