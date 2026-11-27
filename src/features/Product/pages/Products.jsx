import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import ProductCard from "../../../component/ProductCard";
import ProductFilter from "../../../component/ProductFilter";
import productsBanner from "../../../assets/Else Fragrances in Golden Jungle Light.png";
import { getAllProductsList } from "../api";
import Pagination from "../../../component/Pagination";
import { ProductCardSkeleton, SkeletonGroup } from "../../../component/CardSkeletons";

const imageBase = "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g";

function note(name, image) {
  return { name, image: `${imageBase}/${image}/public` };
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(() => ({
    minPrice: 0,
    maxPrice: 10000,
    categorySlug: searchParams.get("category") || "",
    note: "",
    sort: "popularity",
  }));
  const limit = 10;
  const updateFilters = useCallback((updates) => {
    setFilters((current) => ({ ...current, ...updates }));
    setPage(1);
  }, []);
  const clearFilters = () => {
    setFilters({ minPrice: 0, maxPrice: 10000, categorySlug: "", note: "", sort: "popularity" });
    setSearchParams({}, { replace: true });
    setPage(1);
  };
  const fetchProducts = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await getAllProductsList({
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        categorySlug: filters.categorySlug,
        note: filters.note,
        sort: filters.sort,
        page: page,
        recordPerPage: limit,
      });
      const { data, meta } = response.data;
      setProducts(Array.isArray(data) ? data : []);
      setTotalPages(meta.totalPages);
      setPage(meta.currentPage);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setLoadError("We couldn’t load the fragrances just now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, filters, reloadKey]);
  return (
    <main className="bg-[#faf9f6] px-4 pb-20 pt-0 text-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px]">
        <section
          aria-label="Perfume collection banner"
          className="relative -mx-4 h-[440px] w-[calc(100%+2rem)] overflow-hidden bg-neutral-200 sm:-mx-6 sm:h-[400px] sm:w-[calc(100%+3rem)] md:h-[440px] lg:-mx-8 lg:h-[500px] lg:w-[calc(100%+4rem)] xl:h-[540px]"
        >
          <img
            src={productsBanner}
            alt="ELSE — More Than a Fragrance, A Lasting Impression"
            fetchPriority="high"
            className="h-full w-full object-cover object-[76%_center] sm:object-center"
          />
        </section>

        <div className="mx-auto mt-8 max-w-[1016px]">
          <section className="min-w-0" aria-label="Perfume products">
            <ProductFilter filters={filters} onChange={updateFilters} />
            <div className="grid grid-cols-2 gap-1 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4">
              {loading ? (
                <SkeletonGroup count={limit} className="col-span-full grid grid-cols-2 gap-1 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4">
                  <div className="min-w-0 p-1"><ProductCardSkeleton /></div>
                </SkeletonGroup>
              ) : loadError ? (
                <div role="alert" className="col-span-full flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center">
                  <SearchX size={30} strokeWidth={1.5} className="text-neutral-400" />
                  <h2 className="mt-4 font-serif text-2xl font-medium text-neutral-800">Fragrances are taking a moment</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">{loadError}</p>
                  <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="mt-5 rounded-full bg-[#171717] px-5 py-2.5 text-sm text-white transition hover:bg-neutral-700">Try again</button>
                </div>
              ) : products.length > 0 ? products.map((product) => (
                <div className="min-w-0 p-1" key={product.id}>
                  <ProductCard product={product} />
                </div>
              )) : (
                <div role="status" className="col-span-full flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center">
                  <SearchX size={30} strokeWidth={1.5} className="text-[#a78b68]" />
                  <h2 className="mt-4 font-serif text-2xl font-medium text-neutral-800">No fragrances found</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">Try a different category or adjust your filters to discover more of ELSE.</p>
                  <button type="button" onClick={clearFilters} className="mt-5 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-50">Clear filters</button>
                </div>
              )}
            </div>
            {!loading && !loadError && products.length > 0 && <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              className="mt-10"
            />}
          </section>
        </div>
      </div>
    </main>
  );
}
