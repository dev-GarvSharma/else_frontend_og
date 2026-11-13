import React, { useEffect, useState } from "react";
import { ArrowDown, Check, ChevronDown, X } from "lucide-react";
import { getAllCategories } from "../features/Homepage/api";

const MAX_PRICE = 10000;
const DEFAULT_FILTERS = { minPrice: 0, maxPrice: MAX_PRICE, categorySlug: "", note: "", sort: "popularity" };
const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
];
const noop = () => {};
const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

export default function ProductFilter({ filters = DEFAULT_FILTERS, onChange = noop }) {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [note, setNote] = useState(filters.note);
  const [openTab, setOpenTab] = useState("");
  const [panelTab, setPanelTab] = useState("");

  useEffect(() => {
    let active = true;
    getAllCategories()
      .then(({ data }) => { if (active) setCategories(Array.isArray(data?.data) ? data.data : []); })
      .catch((error) => console.error("Error fetching product categories:", error));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => onChange({ minPrice: priceRange[0], maxPrice: priceRange[1] }), 400);
    return () => window.clearTimeout(timer);
  }, [priceRange, onChange]);

  useEffect(() => {
    const timer = window.setTimeout(() => onChange({ note }), 350);
    return () => window.clearTimeout(timer);
  }, [note, onChange]);

  const hasFilters = filters.categorySlug || filters.note || filters.minPrice > 0 || filters.maxPrice < MAX_PRICE || filters.sort !== "popularity";
  const clearAll = () => {
    setPriceRange([0, MAX_PRICE]);
    setNote("");
    onChange({ categorySlug: "", sort: "popularity" });
    setOpenTab("");
  };
  const toggleTab = (tab) => {
    if (openTab === tab) {
      setOpenTab("");
    } else {
      setPanelTab(tab);
      setOpenTab(tab);
    }
  };

  const tabs = [
    { id: "Category", label: "Category", value: categories.find((item) => item.slug === filters.categorySlug)?.name },
    { id: "Scent note", label: "Scent note", value: filters.note },
    { id: "Sort by", label: "Sort by", value: filters.sort !== "popularity" ? SORT_OPTIONS.find((item) => item.value === filters.sort)?.label : "" },
  ];

  return (
    <div className="mb-5 rounded-xl border border-[#e5e5e5] bg-white sm:mb-6">
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-4">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <span className="mr-1 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-neutral-500 sm:flex"><ArrowDown size={14} /> Filter</span>
          {tabs.map((tab) => (
            <button key={tab.id} type="button" aria-expanded={openTab === tab.id} onClick={() => toggleTab(tab.id)} className={`inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 text-xs transition sm:h-9 sm:flex-none sm:justify-start sm:gap-2 sm:px-3 sm:text-sm ${openTab === tab.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-[#e5e5e5] bg-white text-neutral-700 hover:border-neutral-400"}`}>
              <span className="truncate">{tab.label}{tab.value ? <span className="ml-1.5 hidden text-xs opacity-75 sm:inline">· {tab.value}</span> : null}</span>
              <ChevronDown size={14} className={`shrink-0 transition-transform ${openTab === tab.id ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>

        <div className="grid w-full grid-cols-[auto_1fr] items-center gap-x-3 border-t border-[#eee] pt-3 sm:flex sm:w-auto sm:justify-self-end sm:gap-3 sm:border-0 sm:pt-0">
          <div className="flex items-center justify-between gap-3 text-xs text-neutral-600">
            <span className="font-medium">Price</span>
            <span className="text-[11px] text-neutral-500">{formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}</span>
          </div>
          <div className="relative col-span-2 h-8 w-full sm:col-span-1 sm:w-40" style={{ "--price-min": `${(priceRange[0] / MAX_PRICE) * 100}%`, "--price-max": `${(priceRange[1] / MAX_PRICE) * 100}%` }}>
            <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#e5e5e5]" />
            <div aria-hidden="true" className="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-800" style={{ left: "var(--price-min)", right: `calc(100% - var(--price-max))` }} />
            <input aria-label="Minimum price" type="range" min="0" max={MAX_PRICE} step="100" value={priceRange[0]} onChange={(event) => setPriceRange(([min, max]) => [Math.min(Number(event.target.value), max), max])} className="price-range-thumb" style={{ zIndex: priceRange[0] > MAX_PRICE - 200 ? 5 : 3 }} />
            <input aria-label="Maximum price" type="range" min="0" max={MAX_PRICE} step="100" value={priceRange[1]} onChange={(event) => setPriceRange(([min, max]) => [min, Math.max(Number(event.target.value), min)])} className="price-range-thumb" style={{ zIndex: priceRange[1] < 200 ? 5 : 4 }} />
          </div>
        </div>

        {hasFilters && <button type="button" onClick={clearAll} className="inline-flex h-8 items-center justify-self-end gap-1 text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-900"><X size={13} /> Clear</button>}
      </div>

      <div
        aria-hidden={!openTab}
        inert={!openTab}
        className={`grid origin-top transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${openTab ? "grid-rows-[1fr] translate-y-0 opacity-100" : "grid-rows-[0fr] -translate-y-1 opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          {panelTab && <div className="border-t border-[#eee] px-4 py-4 sm:px-5">
          {panelTab === "Category" && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onChange({ categorySlug: "" })} className={`rounded-lg border px-3 py-2 text-sm ${!filters.categorySlug ? "border-neutral-900 bg-neutral-900 text-white" : "border-[#e5e5e5] text-neutral-700 hover:border-neutral-400"}`}>All categories</button>
              {categories.map((category) => <button key={category.id || category.slug} type="button" onClick={() => onChange({ categorySlug: category.slug })} className={`rounded-lg border px-3 py-2 text-sm ${filters.categorySlug === category.slug ? "border-neutral-900 bg-neutral-900 text-white" : "border-[#e5e5e5] text-neutral-700 hover:border-neutral-400"}`}>{category.name}</button>)}
              {!categories.length && <span className="text-sm text-neutral-500">Loading categories…</span>}
            </div>
          )}
          {panelTab === "Scent note" && (
            <div className="flex max-w-md items-center gap-2 rounded-lg border border-[#e5e5e5] px-3 focus-within:border-neutral-500">
              <input aria-label="Filter by scent note" value={note} onChange={(event) => setNote(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setOpenTab(""); }} placeholder="Enter a note, e.g. rose or oud" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400" />
              {note && <button type="button" aria-label="Clear scent note" onClick={() => setNote("")} className="text-neutral-400 hover:text-neutral-800"><X size={15} /></button>}
            </div>
          )}
          {panelTab === "Sort by" && (
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { onChange({ sort: option.value }); setOpenTab(""); }} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${filters.sort === option.value ? "border-neutral-900 bg-neutral-900 text-white" : "border-[#e5e5e5] text-neutral-700 hover:border-neutral-400"}`}>
                {filters.sort === option.value && <Check size={14} />}{option.label}
              </button>)}
            </div>
          )}
          </div>}
        </div>
      </div>
    </div>
  );
}
