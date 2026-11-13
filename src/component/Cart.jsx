import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  removeFromCart,
  setCartOpen,
  setCartQuantity,
} from "../features/Cart/cartSlice";
import { getAllProducts } from "../features/Homepage/api";
import { getPromotions } from "../features/Product/api";
import PromotionalGiftCard from "./PromotionalGiftCard";
import FreeDeliveryCard from "./FreeDeliveryCard";
import CartSuggestedProductCarousel from "./CartSuggestedProductCard";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock";

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
export default function Cart() {
  const dispatch = useDispatch();
  const minimumOrder = Number(import.meta.env.VITE_MINIMUM_CART_AMOUNT) || 1499;
  const deliveryCharge = Number(import.meta.env.VITE_DELIVERY_CHARGE) || 0;
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const { items = [], isOpen } = useSelector((state) => state.cart);
  // Subtotal
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + priceFor(item) * (item.quantity || 1),
        0,
      ),
    [items],
  );
  // Cart count
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  // Close cart
  const closeCart = () => {
    dispatch(setCartOpen(false));
  };
  // Increase quantity
  const increaseQuantity = (item) => {
    dispatch(
      setCartQuantity({
        id: item.id,
        variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
        quantity: (item.quantity || 1) + 1,
      }),
    );
  };
  // Decrease quantity
  const decreaseQuantity = (item) => {
    if ((item.quantity || 1) > 1) {
      dispatch(
        setCartQuantity({
          id: item.id,
          variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
          quantity: item.quantity - 1,
        }),
      );
    } else {
      dispatch(
        removeFromCart({
          id: item.id,
          variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
        }),
      );
    }
  };
  // Remove item
  const removeItem = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
        variantId: item.selectedVariantId ?? item.variants?.[0]?.id,
      }),
    );
  };
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await getAllProducts();
      const result = response?.data?.data;
      setProducts(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };
  const fetchPromotionalProducts = async () => {
    try {
      const response = await getPromotions();
      const promotions = response?.data?.data;
      setPromotionalProducts(Array.isArray(promotions) ? promotions : []);
    } catch (error) {
      console.error("Error fetching promotional products:", error);
    }
  };

  useEffect(() => {
    if (isOpen && items.length > 0) {
      fetchProducts();
      fetchPromotionalProducts();
    }
  }, [isOpen, items.length]);

  const recommendedProducts = products
    .filter((product) => !items.some((item) => item.id === product.id))
    .slice(0, 6);
  const promotion = promotionalProducts.find(
    (item) => item?.promotionalProduct?.active !== false,
  );
  const promoVariant = promotion?.promotionalProduct;
  const promoProduct = promoVariant?.product
    ? {
        name: promoVariant.product.name,
        size: promoVariant.options?.volumeMl
          ? `${promoVariant.options.volumeMl} ml`
          : promoVariant.options?.pack || promoVariant.options?.comboName || "",
        price: Number(promoVariant.price) || 0,
        image: imageUrlFor(promoVariant.product),
      }
    : null;

  // Escape key and body scroll handling
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(setCartOpen(false));
      }
    };

    document.addEventListener("keydown", onKeyDown);

    lockBodyScroll("cart-drawer");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockBodyScroll("cart-drawer");
    };
  }, [isOpen, dispatch]);

  return (
    <>
      {/* Backdrop */}
      <button
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        data-open={isOpen}
        className="cart-drawer-backdrop"
      />

      {/* Cart Drawer */}
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
        aria-hidden={!isOpen}
        data-open={isOpen}
        className="cart-drawer-panel"
      >
        {/* Header */}

        <header className="flex items-center justify-between border-b border-black/[.08] px-5 py-3 sm:px-2">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#F5F0EA]">
              <ShoppingBag size={17} className="text-[#3B2F2F]" />
            </div>

            <div>
              <h2 className="font-serif text-[23px] leading-none text-[#3B2F2F]">
                Your bag
              </h2>
            </div>
          </div>

          <button
            aria-label="Close cart"
            onClick={closeCart}
            className="grid h-8 w-8 place-items-center rounded-full border border-black/10 text-neutral-600 transition hover:bg-[#F5F0EA] hover:text-[#3B2F2F]"
          >
            <X size={17} />
          </button>
        </header>
        {items.length > 0 && (
          <FreeDeliveryCard
            cartSubtotal={subtotal}
            minimumOrder={minimumOrder}
            deliveryCharge={deliveryCharge}
          />
        )}

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="grid min-h-56 place-items-center text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-[#8a6d59]">
                  <ShoppingBag size={22} />
                </span>

                <p className="mt-4 font-serif text-xl">Your bag is empty</p>
              </div>
            </div>
          ) : (
            /* Cart Items */
            <section>
              <section
                aria-label="Items in your bag"
                className="my-3 overflow-hidden rounded-2xl border border-[#d9dfea] bg-white"
              >
                {items.map((item, index) => (
                  <article
                    key={`${item.id}-${item.selectedVariantId ?? item.variants?.[0]?.id ?? "default"}`}
                    className={`flex items-start gap-2.5 p-3 sm:gap-3 sm:p-4 ${
                      index !== 0 ? "border-t border-[#e0e5ee]" : ""
                    }`}
                  >
                    {/* Product Image */}
                    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e8edf6] bg-white sm:h-20 sm:w-20">
                      {imageUrlFor(item) && (
                        <img
                          src={imageUrlFor(item)}
                          alt={item.name || ""}
                          className="h-full w-full rounded-md object-contain p-1"
                        />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="line-clamp-1 text-[15px] font-semibold leading-tight text-[#2a2f36] sm:text-lg"
                        title={item.name}
                      >
                        {item.name || "Fragrance"}
                      </h3>

                      <p className="text-xs text-[#8b91a0] sm:text-[13px]">
                        {item.variants?.[0]?.options?.comboName ||
                          item.variants?.[0]?.options?.pack ||
                          (item.variants?.[0]?.options?.volumeMl
                            ? `${item.variants[0].options.volumeMl} ml`
                            : item.brand || "")}
                      </p>

                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        {/* Price */}
                        <div className="min-w-0">
                          <p className="text-base font-bold leading-tight text-[#13161b] sm:text-lg">
                            {money(priceFor(item) * (item.quantity || 1))}
                          </p>

                          {item.variants?.[0]?.compareAtPrice >
                            item.variants?.[0]?.price && (
                            <p className="mt-0.5 text-xs font-medium leading-tight text-[#8b91a0] line-through">
                              {money(
                                item.variants[0].compareAtPrice *
                                  (item.quantity || 1),
                              )}
                            </p>
                          )}
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex shrink-0 items-center gap-1.5 self-start sm:self-auto">
                          <div className="flex items-center rounded-xl border border-[#c6d6f2] bg-[#f6f9ff]">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => decreaseQuantity(item)}
                              className="grid h-8 w-8 place-items-center text-[#3b6de8]"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="grid h-8 min-w-8 place-items-center border-x border-[#c6d6f2] px-1.5 text-xs font-semibold sm:min-w-9 sm:px-2 sm:text-sm">
                              {item.quantity || 1}
                            </span>

                            <button
                              aria-label="Increase quantity"
                              onClick={() => increaseQuantity(item)}
                              className="grid h-8 w-8 place-items-center text-[#3b6de8]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item)}
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
              {promotion && promoProduct && (
                <PromotionalGiftCard
                  cartSubtotal={subtotal}
                  minimumSubtotal={Number(promotion.minimumSubtotal) || 0}
                  promotionName={promotion.name}
                  product={promoProduct}
                />
              )}
              <section
                aria-label="Suggested products"
                className="mt-4 border-t border-black/[.08] pt-4"
              >
                <CartSuggestedProductCarousel
                  title="People also bought"
                  products={recommendedProducts}
                  loading={productsLoading}
                />
              </section>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-black/[.08] bg-white px-6 py-2 sm:px-8 mt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Subtotal</span>

            <strong className="text-base font-medium">{money(subtotal)}</strong>
          </div>

          <button
            disabled={!items.length}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] py-4 text-[10px] font-medium uppercase tracking-[.2em] text-white transition hover:bg-[#38302c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue to checkout
            <ArrowRight size={14} />
          </button>
        </footer>
      </aside>
    </>
  );
}
