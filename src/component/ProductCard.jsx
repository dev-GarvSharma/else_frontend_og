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
import { Link } from "react-router-dom";

export default function ProductCard({
  product = {},
  onAddToCart,
  onToggleWishlist,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const item = product || "";
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const imageUrl = `${imageBaseUrl}${item.images?.[0]?.path || "/default-image.jpg"}`;
  const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;
  const price = formatPrice(item.variants?.[0]?.price || 0);
  const compareAtPrice = formatPrice(item.variants?.[0]?.compareAtPrice || 0);
  const discountPercentage = item.variants?.[0]?.compareAtPrice
    ? Math.round(
        ((item.variants[0].compareAtPrice - item.variants[0].price) /
          item.variants[0].compareAtPrice) *
          100,
      )
    : 0;

  const toggleWishlist = () => {
    setIsSaved((saved) => !saved);
  };

  return (
    <article className="group relative isolate flex min-h-[326px] w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white p-2 text-neutral-900 shadow-sm transition-[box-shadow,transform] duration-200 ease-out before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_#d9d9d9,inset_0_0_0_4px_#fff] hover:shadow-[0_8px_24px_rgba(0,0,0,.1)] sm:min-h-[498px] sm:rounded-xl sm:p-3 md:min-h-[651px] md:rounded-2xl md:p-4 lg:min-h-[601px]">
      <Link to={`/perfume/${item.id}`}>
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[70%] left-0 -z-10 h-[404px] w-full scale-x-[2] object-cover object-center opacity-30 blur-xl saturate-[1.2]"
        />
        <div className="relative flex w-full flex-1 flex-col rounded-lg focus:outline-none sm:rounded-none">
          <div className="absolute left-0 top-1 z-10 flex flex-col items-start gap-1 sm:top-0 sm:gap-2">
            <span className="rounded-br-lg rounded-tl-md bg-[#151515] px-2.5 py-1.5 text-[9px] font-bold text-white sm:text-[11px]">
              {item?.labelText || `EXCLUSIVE ${discountPercentage}% OFF`}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] shadow-sm sm:text-[11px] font-bold">
              {item?.category?.name || "Category"}{" "}
              <Flame size={12} strokeWidth={1.8} color="#F97316" />
            </span>
          </div>
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isSaved}
            className={`absolute right-1 top-1 z-20 grid min-h-8 min-w-8 place-items-center rounded-full bg-white/85 text-[20px] text-[#555] shadow-sm transition-transform duration-150 hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${isSaved ? "text-rose-600" : ""}`}
          >
            <Heart
              size={18}
              strokeWidth={1.7}
              fill={isSaved ? "currentColor" : "none"}
            />
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
            aria-label={`${Number(item.ratingAverage || 0)} out of 5 stars`}
          >
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-[#f5a623]" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => {
                  const rating = Number(item.ratingAverage || 0);

                  return (
                    <span key={index}>
                      {rating >= index + 1 ? (
                        <Star size={14} fill="currentColor" strokeWidth={1.5} />
                      ) : rating >= index + 0.5 ? (
                        <StarHalf
                          size={14}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Star size={14} strokeWidth={1.5} />
                      )}
                    </span>
                  );
                })}
              </span>

              <span className="text-xs font-bold">
                {item.ratingAverage
                  ? `${Number(item.ratingAverage).toFixed(1)}`
                  : ""}
              </span>
            </div>
          </div>
          <div className="hidden flex-wrap justify-center gap-2 sm:flex sm:gap-3">
            {item?.featureNotes?.map((note, index) => (
              <div
                key={index}
                title={note.text}
                className="flex flex-col items-center"
              >
                <div className="mb-1 flex h-8 items-end justify-center md:h-10">
                  <img
                    src={`${imageBaseUrl}${note.image}`}
                    alt={note.text}
                    className="h-7 w-7 shrink-0 object-contain md:h-9 md:w-9"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <span className="line-clamp-2 flex h-8 max-w-16 items-start justify-center text-center text-[9px] leading-tight sm:text-[10px]">
                  {note.text}
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
                {item.projection || "5"}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px]">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-neutral-200 text-emerald-600">
                <BatteryFull size={11} strokeWidth={1.6} />
              </span>
              <span>Longevity</span>
              <span className="rounded-full border border-neutral-200 px-1.5 py-0.5">
                {item.longevity || "4.5"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart?.(item)}
            className="mt-auto flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-2 text-[10px] text-white transition-colors hover:bg-neutral-700 sm:min-h-12 sm:text-[11px]"
          >
            <span>From</span>
            <s className="text-white/50">{compareAtPrice || "₹0"}</s>
            <strong className="font-medium">{price || "₹0"}</strong>
          </button>
        </div>
      </Link>
    </article>
  );
}
