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
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";

export default function ProductCard({
  product = {},
  onAddToCart,
  onToggleWishlist,
  compact = false,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const item = product || "";
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "";
  const imagePath = item.images?.[0]?.path || item.images?.[0] || "/default-image.jpg";
  const imageUrl = /^(https?:)?\/\//i.test(imagePath)
    ? imagePath
    : `${imageBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
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
  const rating = Math.min(5, Math.max(0, Number(item.ratingAverage) || 0));

  const toggleWishlist = () => {
    setIsSaved((saved) => !saved);
    onToggleWishlist?.(item);
  };

  if (compact) {
    return (
      <article className="group relative flex min-h-[205px] w-full flex-col overflow-hidden rounded-xl border border-[#d9dfea] bg-white p-1.5 text-neutral-900 shadow-sm transition-shadow hover:shadow-md sm:min-h-[218px] sm:p-2">
        <div className="absolute left-1.5 top-1.5 z-10 flex max-w-[76%] flex-col items-start gap-1">
          <span className="max-w-full truncate rounded-sm bg-[#171717] px-1.5 py-1 text-[7px] font-bold leading-none text-white sm:text-[8px]">
            {item?.labelText || `EXCLUSIVE ${discountPercentage}% OFF`}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-black/5 bg-white/95 px-1.5 py-0.5 text-[7px] font-semibold shadow-sm sm:text-[8px]">
            {item?.category?.name || "Perfumes"}<Flame size={9} color="#F97316" />
          </span>
        </div>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isSaved}
          className={`absolute right-1.5 top-1.5 z-20 grid h-6 w-6 place-items-center rounded-full border border-black/5 bg-white/90 text-neutral-500 shadow-sm ${isSaved ? "text-rose-600" : ""}`}
        >
          <Heart size={13} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <Link to={`/perfume/${item.id}`} className="flex min-h-0 flex-1 flex-col items-center px-1 pt-8 text-center">
          <div className="grid h-[70px] w-full place-items-center sm:h-[76px]">
            <img src={imageUrl} alt={`${item.brand || ""} ${item.name || ""} perfume bottle`} className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105" />
          </div>
          <p className="mt-1 w-full truncate text-[7px] text-neutral-600 sm:text-[8px]">{item.brand || "ELSE"}</p>
          <h3 className="w-full truncate text-[9px] font-medium leading-3.5 sm:text-[10px]">{item.name || "Fragrance"}</h3>
          <div className="mt-0.5 flex items-center gap-0.5 text-[7px] text-[#f5a623]" aria-label={`${rating} out of 5 stars`}>
            <span aria-hidden="true">{"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}</span>
            {item.ratingAverage ? <span className="font-semibold text-neutral-700">{Number(item.ratingAverage).toFixed(1)}</span> : null}
          </div>
        </Link>
        <button type="button" onClick={(event) => { event.preventDefault(); onAddToCart ? onAddToCart(item) : dispatch(addToCart(item)); }} className="mt-1 flex min-h-7 w-full items-center justify-center gap-1 rounded-md bg-neutral-900 px-1 text-[7px] text-white transition-colors hover:bg-neutral-700 sm:text-[8px]">
          <span>From</span>
          {item.variants?.[0]?.compareAtPrice > item.variants?.[0]?.price && <s className="text-white/50">{compareAtPrice}</s>}
          <strong className="font-medium">{price}</strong>
        </button>
      </article>
    );
  }

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
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onAddToCart ? onAddToCart(item) : dispatch(addToCart(item));
            }}
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
