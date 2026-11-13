import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BatteryFull,
  Flame,
  Heart,
  Radio,
  Star,
  StarHalf,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock";

export default function ProductCard({
  product = {},
  onAddToCart,
  onToggleWishlist,
  compact = false,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [variantDialogClosing, setVariantDialogClosing] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants?.[0]?.id || "",
  );
  const variantCloseTimer = useRef(null);
  const scrollLockId = useId();
  const dispatch = useDispatch();
  const item = product || "";
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "";
  const imagePath =
    item.images?.[0]?.path || item.images?.[0] || "/default-image.jpg";
  const imageUrl = /^(https?:)?\/\//i.test(imagePath)
    ? imagePath
    : `${imageBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const closeVariantDialog = useCallback(() => {
    if (variantCloseTimer.current)
      window.clearTimeout(variantCloseTimer.current);
    setVariantDialogClosing(true);
    variantCloseTimer.current = window.setTimeout(() => {
      setVariantDialogOpen(false);
      setVariantDialogClosing(false);
      variantCloseTimer.current = null;
    }, 320);
  }, []);

  useEffect(() => {
    if (!variantDialogOpen) return undefined;
    lockBodyScroll(scrollLockId);
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeVariantDialog();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockBodyScroll(scrollLockId);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [variantDialogOpen, closeVariantDialog, scrollLockId]);

  useEffect(() => () => window.clearTimeout(variantCloseTimer.current), []);
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

  const addSelectedVariant = (variant) => {
    const cartProduct = variant
      ? { ...item, selectedVariantId: variant.id, variants: [variant] }
      : item;
    if (onAddToCart) onAddToCart(cartProduct);
    else dispatch(addToCart(cartProduct));
    closeVariantDialog();
  };

  const variantLabel = (variant) => {
    const options = variant?.options || {};
    if (options.volumeMl) return `${options.volumeMl} ml`;
    if (options.pack) return options.pack;
    if (options.comboName) return options.comboName;
    if (options.totalVolumeMl) return `${options.totalVolumeMl} ml`;
    return "Standard size";
  };

  const variantImage = (variant) => {
    const image =
      variant?.images?.[0]?.path || variant?.images?.[0] || imagePath;
    return /^(https?:)?\/\//i.test(image)
      ? image
      : `${imageBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  if (compact) {
    return (
      <article className="group relative flex min-h-[205px] w-full flex-col overflow-hidden rounded-xl border border-[#d9dfea] bg-white p-1.5 text-neutral-900 shadow-sm transition-shadow hover:shadow-md sm:min-h-[218px] sm:p-2">
        <div className="absolute left-1.5 top-1.5 z-10 flex max-w-[76%] flex-col items-start gap-1">
          <span className="max-w-full truncate rounded-sm bg-[#171717] px-1.5 py-1 text-[7px] font-bold leading-none text-white sm:text-[8px]">
            {item?.labelText || `EXCLUSIVE ${discountPercentage}% OFF`}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-black/5 bg-white/95 px-1.5 py-0.5 text-[7px] font-semibold shadow-sm sm:text-[8px]">
            {item?.category?.name || "Perfumes"}
            <Flame size={9} color="#F97316" />
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
        <Link
          to={`/perfume/${item.id}`}
          className="flex min-h-0 flex-1 flex-col items-center px-1 pt-8 text-center"
        >
          <div className="grid h-[70px] w-full place-items-center sm:h-[76px]">
            <img
              src={imageUrl}
              alt={`${item.brand || ""} ${item.name || ""} perfume bottle`}
              className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onAddToCart ? onAddToCart(item) : dispatch(addToCart(item));
          }}
          className="mt-1 flex min-h-7 w-full items-center justify-center gap-1 rounded-md bg-neutral-900 px-1 text-[7px] text-white transition-colors hover:bg-neutral-700 sm:text-[8px]"
        >
          <span>From</span>
          {item.variants?.[0]?.compareAtPrice > item.variants?.[0]?.price && (
            <s className="text-white/50">{compareAtPrice}</s>
          )}
          <strong className="font-medium">{price}</strong>
        </button>
      </article>
    );
  }

  return (
    <>
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
                <span
                  className="flex gap-0.5 text-[#f5a623]"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    return (
                      <span key={index}>
                        {rating >= index + 1 ? (
                          <Star
                            size={14}
                            fill="currentColor"
                            strokeWidth={1.5}
                          />
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
                if (item.variants?.length) {
                  if (variantCloseTimer.current)
                    window.clearTimeout(variantCloseTimer.current);
                  setVariantDialogClosing(false);
                  setSelectedVariantId(item.variants[0].id);
                  setVariantDialogOpen(true);
                } else {
                  addSelectedVariant(item.variants?.[0]);
                }
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
      {variantDialogOpen &&
        createPortal(
          <div
            className={`variant-dialog-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4 ${variantDialogClosing ? "is-closing" : "is-opening"}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeVariantDialog();
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby={`variant-title-${item.id}`}
              className={`variant-dialog-panel flex max-h-[92dvh] min-h-0 w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl ${variantDialogClosing ? "is-closing" : "is-opening"}`}
            >
              <header className="flex shrink-0 items-start justify-between border-b border-neutral-200 px-4 py-4 sm:px-6">
                <div className="min-w-0 pr-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                    Choose your size
                  </p>
                  <h2
                    id={`variant-title-${item.id}`}
                    className="mt-1 truncate text-lg font-semibold text-neutral-900"
                  >
                    {item.name}
                  </h2>
                  {(item.ratingAverage || item.reviewCount > 0) && (
                    <div
                      className="mt-1 flex items-center gap-1.5 text-xs text-neutral-600"
                      aria-label={`${item.ratingAverage ? `${Number(item.ratingAverage).toFixed(1)} out of 5` : "No rating yet"}, ${item.reviewCount || 0} reviews`}
                    >
                      {item.ratingAverage && (
                        <>
                          <Star
                            size={13}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                          <span className="font-medium">
                            {Number(item.ratingAverage).toFixed(1)}
                          </span>
                        </>
                      )}
                      {item.reviewCount > 0 && (
                        <span>
                          {item.ratingAverage ? "· " : ""}
                          {item.reviewCount}{" "}
                          {item.reviewCount === 1 ? "review" : "reviews"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={closeVariantDialog}
                  aria-label="Close size selection"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                >
                  <X size={18} />
                </button>
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6">
                <div className="space-y-2">
                  {item.variants?.map((variant) => {
                    const selected = selectedVariantId === variant.id;
                    const volume = variantLabel(variant);
                    const priceValue = Number(variant.price || 0);
                    const compareValue = Number(variant.compareAtPrice || 0);
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        aria-pressed={selected}
                        className={`flex min-h-[84px] w-full items-center gap-3 rounded-xl border p-2.5 text-left transition sm:gap-4 sm:p-3 ${selected ? "border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900" : "border-neutral-200 hover:border-neutral-400"}`}
                      >
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#faf9f6] sm:h-[72px] sm:w-[72px]">
                          <img
                            src={variantImage(variant)}
                            alt=""
                            className="h-full w-full object-contain p-1"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-md font-medium text-neutral-900">
                            {item.name}
                          </span>
                          <span className="block text-xs font-bold text-neutral-900">
                            {volume}
                          </span>
                          {variant.options?.comboName && (
                            <span className="mt-0.5 block truncate text-xs text-neutral-500">
                              {variant.options.quantity
                                ? `${variant.options.quantity} × ${variant.options.volumePerBottleMl || Math.round((variant.options.totalVolumeMl || 0) / variant.options.quantity)} ml`
                                : `${variant.options.totalVolumeMl || ""} ml`}{" "}
                              · {variant.options.fragrances || item.brand}
                            </span>
                          )}
                          {variant.options?.pack && (
                            <span className="mt-0.5 block text-xs text-neutral-500">
                              {variant.options.bottleCount
                                ? `${variant.options.bottleCount} bottles`
                                : "Discovery set"}
                            </span>
                          )}
                          <span className="mt-1.5 flex flex-wrap gap-1">
                            {item.category?.name && (
                              <span className="rounded-full bg-[#f2f2f2] px-2 py-0.5 text-[10px] text-neutral-600">
                                {item.category.name}
                              </span>
                            )}
                            {item.labelText && (
                              <span className="rounded-full bg-[#f7f0e7] px-2 py-0.5 text-[10px] text-[#765735]">
                                {item.labelText}
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block text-sm font-semibold text-neutral-900">
                            {formatPrice(priceValue)}
                          </span>
                          {compareValue > priceValue && (
                            <span className="mt-0.5 block text-xs text-neutral-400 line-through">
                              {formatPrice(compareValue)}
                            </span>
                          )}
                        </span>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${selected ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`}
                        >
                          {selected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <footer className="shrink-0 border-t border-neutral-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
                <button
                  type="button"
                  disabled={!item.variants?.length}
                  onClick={() =>
                    addSelectedVariant(
                      item.variants.find(
                        (variant) => variant.id === selectedVariantId,
                      ) || item.variants[0],
                    )
                  }
                  className="flex min-h-12 w-full items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
                >
                  Add to cart{" "}
                  {selectedVariantId
                    ? `· ${formatPrice(item.variants.find((variant) => variant.id === selectedVariantId)?.price || 0)}`
                    : ""}
                </button>
              </footer>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
