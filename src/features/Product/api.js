import { get } from "../../app/axiosWrapper";

export const getAllProductsList = async ({ minPrice, maxPrice, categorySlug, note, sort, page, recordPerPage, search = "" }) => {
  const params = new URLSearchParams({
    minPrice: String(minPrice ?? 0),
    maxPrice: String(maxPrice ?? 10000),
    category: categorySlug || "",
    note: note || "",
    sort: sort || "popularity",
    page: String(page ?? 1),
    recordPerPage: String(recordPerPage ?? 10),
  });
  if (search.trim()) params.set("search", search.trim());
  return get(`catalog/products?${params.toString()}`);
};

export const getProductById = async (id) => await get(`catalog/products/${id}`);
export const getPromotions = async () => await get("catalog/promotions");
