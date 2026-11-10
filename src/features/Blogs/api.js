import { get, post } from "../../app/axiosWrapper";

export const getAllBlogArticles = async (page, limit) =>
  await get(`blogs?page=${page}&limit=${limit}`);

export const getBlogArticleById = async (slug) => await get(`blogs/${slug}`);
export const addBlogComment = async (slug, commentData) =>
  await post(`blogs/${slug}/comments`, commentData);