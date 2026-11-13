import React, { useEffect, useState } from "react";
import { ArrowDownUp, ChevronDown } from "lucide-react";
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
  const limit = 10;
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProductsList({
        minPrice: 0,
        maxPrice: 10000,
        categorySlug: "",
        note: "",
        sort: "popularity",
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
  }, [page, limit]);
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

        <div className="mt-8 flex items-start gap-6 sm:mt-12 lg:gap-8">
          <ProductFilter />
          <section className="min-w-0 flex-1" aria-label="Perfume products">
            <div className="mb-5 flex flex-col gap-4 border-y border-neutral-200 py-4 sm:sticky sm:top-[68px] sm:z-20 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:bg-[#faf9f6]/95 sm:backdrop-blur-md">
              <p className="text-sm text-neutral-600">
                <span className="sm:hidden">1,492 perfumes</span>
                <span className="hidden sm:inline">
                  Now browsing{" "}
                  <span className="font-medium text-neutral-900">1,492</span>{" "}
                  perfumes
                </span>
              </p>
              <ProductFilter compact />
              <div className="hidden items-center gap-3 lg:flex">
                <button
                  type="button"
                  className="h-10 rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-700 transition hover:border-neutral-500"
                >
                  Find My Scent
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-700 transition hover:border-neutral-500"
                >
                  <span>
                    Sort by:{" "}
                    <b className="font-medium text-neutral-900">Our Picks</b>
                  </span>
                  <ArrowDownUp size={15} />
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>
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
