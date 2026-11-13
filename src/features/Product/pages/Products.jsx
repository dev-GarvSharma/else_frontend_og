import React, { useCallback, useEffect, useState } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 10000, categorySlug: "", note: "", sort: "popularity" });
  const limit = 10;
  const updateFilters = useCallback((updates) => {
    setFilters((current) => ({ ...current, ...updates }));
    setPage(1);
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, filters]);
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
              ) : products.map((product) => (
                <div className="min-w-0 p-1" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              className="mt-10"
            />
          </section>
        </div>

        <section className="mx-auto mt-16 max-w-4xl border-t border-neutral-200 pt-8 text-sm leading-7 text-neutral-600 sm:mt-20">
          <h2 className="font-serif text-2xl text-neutral-900">
            Explore designer and niche perfume samples
          </h2>
          <p className="mt-3">
            Discover a curated selection of authentic fragrances from the
            world’s leading designer and niche houses. Every sample is poured
            from an original bottle, so you can try a scent before choosing a
            full-size fragrance.
          </p>
        </section>
      </div>
    </main>
  );
}
