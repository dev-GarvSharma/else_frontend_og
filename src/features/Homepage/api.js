import { get } from "../../app/axiosWrapper";

export const getAllCategories = async () => await get(`catalog/categories`);
export const getAllProducts = async () =>
  await get(`catalog/homepage/products`);
export const getAllBlogArticles = async (page, limit) =>
  await get(`blogs?page=${page}&limit=${limit}`);
