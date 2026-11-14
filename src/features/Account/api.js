import { get, post, put, remove } from "../../app/axiosWrapper";

export const getMyOrders = () => get("orders");
export const getMyAddresses = () => get("addresses");
export const createAddress = (address) => post("addresses", address);
export const editAddress = (id, address) => put(`addresses/${id}`, address);
export const deleteAddress = (id) => remove(`addresses/${id}`);
