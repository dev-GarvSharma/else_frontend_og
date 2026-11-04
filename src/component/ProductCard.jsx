import React, { useState } from "react";
import {
  BatteryFull,
  Flame,
  Heart,
  Radio,
  Star,
  StarHalf,
  TrendingUp,
} from "lucide-react";

const defaultProduct = {
  brand: "CREED",
  name: "Aventus",
  image:
    "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/2baeb436-d003-4cdf-5717-3e34c3515000/public",
  background: "#e9e8e6",
  discount: 28,
  tags: ["Bestseller"],
  rating: "4.8",
  notes: [
    {
      name: "Bergamot",
      image: "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/bergamot/public",
    },
    {
      name: "Black Currant",
      image:
        "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/black_currant/public",
    },
    {
      name: "Pineapple",
      image:
        "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/pineapple/public",
    },
  ],
  projection: "4.6",
  longevity: "4.9",
  price: 999,
  originalPrice: 1390,
};

export default function ProductCard({
  product = {},
  onAddToCart,
  onToggleWishlist,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const item = { ...defaultProduct, ...product };
  const imageUrl = item.image;
  const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

  const toggleWishlist = () => {
    setIsSaved((saved) => !saved);
    onToggleWishlist?.(item);
  };

  return (
    <article className="group relative isolate flex min-h-[326px] w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white p-2 text-neutral-900 shadow-sm transition-[box-shadow,transform] duration-200 ease-out before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_#d9d9d9,inset_0_0_0_4px_#fff] hover:shadow-[0_8px_24px_rgba(0,0,0,.1)] sm:min-h-[498px] sm:rounded-xl sm:p-3 md:min-h-[651px] md:rounded-2xl md:p-4 lg:min-h-[601px]">
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[70%] left-0 -z-10 h-[404px] w-full scale-x-[2] object-cover object-center opacity-30 blur-xl saturate-[1.2]"
      />
      <div className="relative flex w-full flex-1 flex-col rounded-lg focus:outline-none sm:rounded-none">
        <div className="absolute left-0 top-1 z-10 flex flex-col items-start gap-1 sm:top-0 sm:gap-2">
          <span className="rounded-br-lg rounded-tl-md bg-[#151515] px-2.5 py-1.5 text-[9px] text-white sm:text-[11px]">
            Black Friday -{item.discount}%
          </span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] shadow-sm sm:text-[11px]"
            >
              {tag === "Bold" ? <Flame size={12} strokeWidth={1.8} /> : <TrendingUp size={12} strokeWidth={1.8} />}
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isSaved}
          className={`absolute right-1 top-1 z-20 grid min-h-8 min-w-8 place-items-center rounded-full bg-white/85 text-[20px] text-[#555] shadow-sm transition-transform duration-150 hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${isSaved ? "text-rose-600" : ""}`}
        >
          <Heart size={18} strokeWidth={1.7} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <div className="relative mx-auto mb-3 mt-12 flex h-32 w-full items-center justify-center sm:mb-4 sm:mt-12 sm:h-40 md:mb-6 md:mt-14 md:h-56">
          <div className="flex h-full w-full items-center justify-center bg-white [mix-blend-mode:multiply]">
            <img
              src={imageUrl}
              alt={`${item.brand} ${item.name} perfume bottle`}
              className="h-full w-full object-contain saturate-[1.1] transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="relative flex flex-col text-center">
          <p className="text-[10px] text-neutral-600 sm:text-xs">
            {item.brand}
          </p>
          <h3 className="mt-0.5 truncate text-sm font-medium leading-5 sm:text-base md:text-lg">
            {item.name}
          </h3>
        </div>

        <div
          className="flex justify-center py-2 sm:py-3 md:pb-4 md:pt-3"
          aria-label={`${item.rating} out of 5 stars`}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex gap-0.5 text-[14px] leading-none text-[#f5a623] sm:text-base"
              aria-hidden="true"
            >
              <Star size={14} fill="currentColor" strokeWidth={1.5} />
              <Star size={14} fill="currentColor" strokeWidth={1.5} />
              <Star size={14} fill="currentColor" strokeWidth={1.5} />
              <Star size={14} fill="currentColor" strokeWidth={1.5} />
              <StarHalf size={14} fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="text-xs">{item.rating}</span>
          </div>
        </div>

        <div className="hidden flex-wrap justify-center gap-2 sm:flex sm:gap-3">
          {item.notes.map((note) => (
            <div
              key={note.name}
              title={note.name}
              className="flex flex-col items-center"
            >
              <div className="mb-1 flex h-8 items-end justify-center md:h-10">
                <img
                  src={note.image}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 object-contain md:h-9 md:w-9"
                />
              </div>
              <span className="line-clamp-2 flex h-8 max-w-16 items-start justify-center text-center text-[9px] leading-tight sm:text-[10px]">
                {note.name}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden w-full grid-cols-2 gap-2 py-2 sm:grid sm:gap-3 sm:py-3 md:py-5">
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px]">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-neutral-200 text-emerald-600">
              <Radio size={11} strokeWidth={1.6} />
            </span>
            <span>Projection</span>
            <span className="rounded-full border border-neutral-200 px-1.5 py-0.5">
              {item.projection}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px]">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-neutral-200 text-emerald-600">
              <BatteryFull size={11} strokeWidth={1.6} />
            </span>
            <span>Longevity</span>
            <span className="rounded-full border border-neutral-200 px-1.5 py-0.5">
              {item.longevity}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart?.(item)}
          className="mt-auto flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-2 text-[10px] text-white transition-colors hover:bg-neutral-700 sm:min-h-12 sm:text-[11px]"
        >
          <span>From</span>
          <s className="text-white/50">{formatPrice(item.originalPrice)}</s>
          <strong className="font-medium">{formatPrice(item.price)}</strong>
        </button>
      </div>
    </article>
  );
}
