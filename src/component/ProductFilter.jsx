import React from "react";
import {
  ArrowDownUp,
  Check,
  ChevronDown,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

const filterGroups = [
  {
    title: "Featured",
    options: ["Bestsellers", "New arrivals", "On sale"],
  },
  {
    title: "For",
    options: ["Women", "Men", "Unisex"],
  },
  {
    title: "Brand",
    options: ["Amouage", "Creed", "Louis Vuitton", "Parfums de Marly"],
  },
  {
    title: "Scent family",
    options: ["Fresh", "Floral", "Woody", "Amber"],
  },
  {
    title: "Price",
    options: ["Under ₹1,500", "₹1,500–₹3,000", "₹3,000 and above"],
  },
];

function FilterOption({ label, selected = false }) {
  return (
    <div className="flex items-center gap-3 py-2 text-sm text-neutral-700">
      <span
        aria-hidden="true"
        className={`grid h-4 w-4 place-items-center rounded border ${
          selected
            ? "border-neutral-900 bg-neutral-900 text-white"
            : "border-neutral-300 bg-white"
        }`}
      >
        {selected && <Check size={11} strokeWidth={2.5} />}
      </span>
      <span>{label}</span>
    </div>
  );
}

export default function ProductFilter({ compact = false }) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-700"
        >
          <Filter size={16} />
          Filter
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-700"
        >
          <ArrowDownUp size={16} />
          Sort by
        </button>
      </div>
    );
  }

  return (
    <aside className="hidden w-56 shrink-0 self-start pr-3 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto xl:w-60">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-2 font-medium text-neutral-900">
          <SlidersHorizontal size={17} />
          Filters
        </div>
        <span className="text-xs text-neutral-500">Clear all</span>
      </div>

      {filterGroups.map((group, index) => (
        <section
          key={group.title}
          className="border-b border-neutral-200 py-4 last:border-b-0"
        >
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-neutral-900">
            {group.title}
            <ChevronDown size={15} className="text-neutral-500" />
          </div>
          {group.options.map((option, optionIndex) => (
            <FilterOption
              key={option}
              label={option}
              selected={index === 0 && optionIndex === 0}
            />
          ))}
        </section>
      ))}
    </aside>
  );
}
