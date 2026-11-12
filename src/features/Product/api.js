import { get } from "../../app/axiosWrapper";

export const getAllProductsList = async ({ minPrice, maxPrice, categorySlug, note, sort, page, recordPerPage }) =>
  await get(`catalog/products?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${categorySlug}&note=${note}&sort=${sort}&page=${page}&recordPerPage=${recordPerPage}`);

export const getProductById = async (id) => await get(`catalog/products/${id}`);
export const getPromotions = async () => await get("catalog/promotions");
