import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Check,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  addToCart,
  removeFromCart,
  setCartOpen,
  setCartQuantity,
} from "../features/Cart/cartSlice";
import { getAllProductsList, getPromotions } from "../features/Product/api";
import ProductCard from "./ProductCard";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock";

const FREE_GIFT_THRESHOLD = 2500;
const imageUrlFor = (product) => {
  const path =
    product?.images?.[0]?.path ||
    product?.images?.[0] ||
    product?.image ||
    product?.imageUrl;
  if (!path) return "";
  if (/^(https?:)?\/\//i.test(path)) return path;
  const base = import.meta.env.VITE_IMAGE_BASE_URL || "";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};
const priceFor = (product) =>
  Number(product?.variants?.[0]?.price ?? product?.price ?? 0);
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isOpen } = useSelector((state) => state.cart);
  const [promotions, setPromotions] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [promotionLoading, setPromotionLoading] = useState(false);
  const [promotionError, setPromotionError] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + priceFor(item) * (item.quantity || 1),
        0,
      ),
    [items],
  );
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const giftThreshold = Math.max(1, Number(
    promotions[0]?.minimumOrderAmount ??
      promotions[0]?.minOrderAmount ??
      promotions[0]?.threshold ??
      FREE_GIFT_THRESHOLD,
  ));
  const giftUnlocked = subtotal >= giftThreshold;
  const progress = Math.min((subtotal / giftThreshold) * 100, 100);
  const remaining = Math.max(giftThreshold - subtotal, 0);
  const suggestions = suggestedProducts.filter(
    (product) => !items.some((item) => item.id === product.id),
  ).slice(0, 8);

  useEffect(() => {
    if (!isOpen || promotions.length || promotionLoading) return;
    let active = true;
    setPromotionLoading(true);
    getPromotions()
      .then((response) => {
        const result = response?.data?.data;
        if (active)
          setPromotions(
            Array.isArray(result)
              ? result
              : Array.isArray(result?.promotions)
                ? result.promotions
                : [],
          );
      })
      .catch(() => {
        if (active) setPromotionError(true);
      })
      .finally(() => {
        if (active) setPromotionLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isOpen, promotions.length, promotionLoading]);

  useEffect(() => {
    if (!isOpen || suggestedProducts.length || suggestionsLoading) return;
    let active = true;
    setSuggestionsLoading(true);
    getAllProductsList({
      minPrice: 0,
      maxPrice: 100000,
      categorySlug: "",
      note: "",
      sort: "popularity",
      page: 1,
      recordPerPage: 10,
    }).then((response) => {
      const result = response?.data?.data;
      const products = Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : [];
      if (active) setSuggestedProducts(products);
    }).catch(() => {
      if (active) setSuggestedProducts([]);
    }).finally(() => {
      if (active) setSuggestionsLoading(false);
    });
    return () => { active = false; };
  }, [isOpen, suggestedProducts.length, suggestionsLoading]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") dispatch(setCartOpen(false));
    };
    document.addEventListener("keydown", onKeyDown);
    lockBodyScroll("cart-drawer-component");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockBodyScroll("cart-drawer-component");
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <button
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => dispatch(setCartOpen(false))}
        data-open={isOpen}
        className="cart-drawer-backdrop"
      />
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
        aria-hidden={!isOpen}
        data-open={isOpen}
        className="cart-drawer-panel"
      >
        <header className="flex items-center justify-between border-b border-black/[.08] px-6 py-5 sm:px-8">
          <div>
            <h2 className="font-serif text-[25px] leading-none">
              Your bag{" "}
              <span className="ml-1 align-middle font-sans text-xs text-neutral-500">
                ({cartCount})
              </span>
            </h2>
          </div>
          <button
            aria-label="Close cart"
            onClick={() => dispatch(setCartOpen(false))}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 transition hover:bg-white"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8">

          {items.length === 0 ? (
            <div className="grid min-h-56 place-items-center text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-[#8a6d59]">
                  <ShoppingBag size={22} />
                </span>
                <p className="mt-4 font-serif text-xl">Your bag is empty</p>
              </div>
            </div>
          ) : (
            <section aria-label="Items in your bag" className="my-3 overflow-hidden rounded-2xl border border-[#d9dfea] bg-white">
              {items.map((item, index) => (
                <article key={`${item.id}-${item.selectedVariantId ?? item.variants?.[0]?.id ?? "default"}`} className={`flex items-start gap-2.5 p-3 sm:gap-3 sm:p-4 ${index > 0 ? "border-t border-[#e0e5ee]" : ""}`}>
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e8edf6] bg-white sm:h-20 sm:w-20">
                    {imageUrlFor(item) && (
                      <img
                        src={imageUrlFor(item)}
                        alt={item.name || ""}
                        className="h-full w-full rounded-md object-contain p-1"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-[15px] font-semibold leading-tight text-[#2a2f36] sm:text-lg" title={item.name}>
                      {item.name || "Fragrance"}
                    </h3>
                    <p className="text-xs text-[#8b91a0] sm:text-[13px]">{item.variants?.[0]?.options?.comboName || item.variants?.[0]?.options?.pack || (item.variants?.[0]?.options?.volumeMl ? `${item.variants[0].options.volumeMl} ml` : item.brand || "")}</p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-base font-bold leading-tight text-[#13161b] sm:text-lg">{money(priceFor(item) * (item.quantity || 1))}</p>
                        {item.variants?.[0]?.compareAtPrice > item.variants?.[0]?.price && <p className="mt-0.5 text-xs font-medium leading-tight text-[#8b91a0] line-through">{money(item.variants[0].compareAtPrice * (item.quantity || 1))}</p>}
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5 self-start sm:self-auto">
                        <div className="flex items-center rounded-xl border border-[#c6d6f2] bg-[#f6f9ff]">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            item.quantity > 1
                              ? dispatch(
                                  setCartQuantity({
                                    id: item.id,
                                    variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              : dispatch(removeFromCart({ id: item.id, variantId: item.selectedVariantId ?? item.variants?.[0]?.id }))
                          }
                          className="grid h-8 w-8 place-items-center text-[#3b6de8]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="grid h-8 min-w-8 place-items-center border-x border-[#c6d6f2] px-1.5 text-xs font-semibold sm:min-w-9 sm:px-2 sm:text-sm">
                          {item.quantity || 1}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            dispatch(
                              setCartQuantity({
                                id: item.id,
                                variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
                                quantity: (item.quantity || 1) + 1,
                              }),
                            )
                          }
                          className="grid h-8 w-8 place-items-center text-[#3b6de8]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart({ id: item.id, variantId: item.selectedVariantId ?? item.variants?.[0]?.id }))}
                        aria-label={`Remove ${item.name}`}
                        className="grid h-8 w-8 place-items-center rounded-xl bg-[#f5f6f9] text-[#7a8391] transition hover:bg-[#eceff6] hover:text-[#2c3644]"
                      >
                        <Trash2 size={14} />
                      </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          <section aria-label="Free gift progress" className="my-3 rounded-xl border border-[#cfe5d3] bg-[#eff8ef] px-3.5 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-[#344b3a]">{giftUnlocked ? "Your free gift is unlocked" : `Add ${money(remaining)} more to unlock your free gift.`}</p>
              <Gift size={17} className="shrink-0 text-[#48825b]" />
            </div>
            <div className="relative mt-2.5 h-1.5 rounded-full bg-[#d7e8d9]">
              <div className="h-full rounded-full bg-[#14703d] transition-[width] duration-500" style={{ width: `${progress}%` }} />
              <span className="absolute -right-0.5 -top-[5px] grid h-4 w-4 place-items-center rounded-full border-2 border-[#eff8ef] bg-[#14703d]">{giftUnlocked && <Check size={9} className="text-white" />}</span>
            </div>
          </section>

          <section aria-label="Suggested products" className="mt-4 border-t border-black/[.08] pt-4">
            <h3 className="mb-3 text-sm font-medium text-[#52627d]">You’ll love these too</h3>
            {suggestionsLoading ? <p className="py-6 text-center text-xs text-neutral-500">Loading products…</p> : suggestions.length ? (
              <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none]">
                {suggestions.map((product) => <ProductCard key={product.id} product={product} compact onAddToCart={(item) => dispatch(addToCart(item))} />)}
              </div>
            ) : null}
          </section>
        </div>

        <footer className="border-t border-black/[.08] bg-white px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Subtotal</span>
            <strong className="text-base font-medium">{money(subtotal)}</strong>
          </div>
          <button
            disabled={!items.length}
            onClick={() => {
              dispatch(setCartOpen(false));
              navigate("/checkout");
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] py-4 text-[10px] font-medium uppercase tracking-[.2em] text-white transition hover:bg-[#38302c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue to checkout <ArrowRight size={14} />
          </button>
        </footer>
      </aside>
    </>
  );
}
