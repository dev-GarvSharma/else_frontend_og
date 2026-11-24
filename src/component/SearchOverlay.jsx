import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import Pagination from "./Pagination";
import { getAllProductsList } from "../features/Product/api";

const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 10000,
  categorySlug: "",
  note: "",
  sort: "popularity",
};

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const closeTimer = useRef(null);
  const searchInput = useRef(null);

  const closeSearch = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(onClose, 230);
  }, [isClosing, onClose]);

  const updateFilters = useCallback((updates) => {
    setFilters((current) => ({ ...current, ...updates }));
    setPage(1);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    searchInput.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeSearch]);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setLoadError("");
      try {
        const response = await getAllProductsList({
          ...filters,
          search: query.trim(),
          page,
          recordPerPage: 10,
        });
        if (!active) return;
        const result = response?.data;
        setProducts(Array.isArray(result?.data) ? result.data : []);
        setTotalPages(Number(result?.meta?.totalPages) || 1);
        if (result?.meta?.currentPage) setPage(Number(result.meta.currentPage));
      } catch (error) {
        if (!active) return;
        setProducts([]);
        setLoadError(error?.message || "We couldn’t load products right now.");
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [filters, page, query, reloadKey]);

  return (
    <>
      <button
        aria-label="Close search"
        onClick={closeSearch}
        className={`search-overlay-backdrop fixed inset-0 z-[60] cursor-default bg-black/25 backdrop-blur-[5px] ${isClosing ? "is-closing" : ""}`}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Search ELSE fragrances"
        className={`search-overlay-panel fixed inset-x-0 top-0 z-[61] flex max-h-[94vh] flex-col overflow-hidden rounded-b-[28px] border-t-[5px] border-[#373737] bg-white px-4 pb-0 pt-5 text-[#202020] shadow-[0_22px_55px_rgba(0,0,0,.22)] sm:px-8 sm:pt-6 ${isClosing ? "is-closing" : ""}`}
      >
        <form onSubmit={(event) => event.preventDefault()} className="mx-auto flex w-full max-w-[1280px] items-center gap-3">
          <label className="flex h-[50px] min-w-0 flex-1 items-center gap-3 rounded-full border border-[#888] px-4 shadow-[inset_0_0_0_2px_#eee,0_0_0_2px_#d7d7d7] sm:h-12">
            <Search size={18} strokeWidth={1.7} className="shrink-0" />
            <input
              ref={searchInput}
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search perfumes, brands, or notes…"
              aria-label="Search perfumes, brands, or notes"
              className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#777]"
            />
            {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); setPage(1); }} className="grid h-8 w-8 place-items-center rounded-full text-[#777] hover:bg-neutral-100"><X size={16} /></button>}
          </label>
          <button type="button" onClick={closeSearch} aria-label="Close search" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f3f3f3] text-[#555] transition hover:bg-[#e8e8e8] sm:h-11 sm:w-11"><X size={19} /></button>
        </form>

        <div className="mx-auto mt-3 grid min-h-0 w-full max-w-[1280px] flex-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1">
          <aside className="max-h-[40vh] overflow-y-auto border-b border-[#e5e5e5] pb-3 md:max-h-none md:border-b-0 md:border-r md:pb-0 md:pr-4">
            <ProductFilter layout="sidebar" filters={filters} onChange={updateFilters} />
          </aside>

          <div className="min-h-0 overflow-y-auto pb-5 md:pl-5">
            <div className="flex items-center justify-between gap-3 py-3">
              <h2 className="text-sm font-medium">{query.trim() ? `Results for “${query.trim()}”` : "Explore ELSE fragrances"}</h2>
              {!loading && <span className="text-xs text-neutral-500">{products.length} {products.length === 1 ? "product" : "products"}</span>}
            </div>

            {loading ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-3" aria-label="Loading products" role="status">
                {Array.from({ length: 6 }, (_, index) => <div key={index} className="min-h-[248px] animate-pulse rounded-xl border border-neutral-200 bg-neutral-100" />)}
              </div>
            ) : loadError ? (
              <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center text-sm text-neutral-600">
                <p>{loadError}</p>
                <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50">Try again</button>
              </div>
            ) : products.length ? (
              <>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} compact compactSize="search" onNavigate={closeSearch} />
                  ))}
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="mt-5" />
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <Search size={24} className="text-neutral-400" />
                <p className="text-sm text-neutral-600">No products found. Try another search or adjust your filters.</p>
              </div>
            )}
          </div>
        </div>

        <Link to="/perfumes" onClick={closeSearch} className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-2 border-t border-neutral-200 py-3 text-xs font-medium text-neutral-700 transition hover:text-black">
          Browse all fragrances <ArrowUpRight size={14} />
        </Link>
      </section>
    </>
  );
}
