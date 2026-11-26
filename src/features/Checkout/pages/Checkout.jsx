import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import {
  openAuthDialog,
  getIsLoggedIn,
  getCurrentUser,
} from "../../Auth/authSlice";
import { clearCart } from "../../Cart/cartSlice";
import {
  addAddress,
  createOrder,
  getAddresses,
  syncCart,
  updateAddress,
  validateCoupon,
  verifyPayment,
} from "../api";

const emptyAddress = {
  recipient: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "IN",
  isDefault: false,
};
export const indianStates = [
  { id: 1, name: "Andhra Pradesh" },
  { id: 2, name: "Arunachal Pradesh" },
  { id: 3, name: "Assam" },
  { id: 4, name: "Bihar" },
  { id: 5, name: "Chhattisgarh" },
  { id: 6, name: "Goa" },
  { id: 7, name: "Gujarat" },
  { id: 8, name: "Haryana" },
  { id: 9, name: "Himachal Pradesh" },
  { id: 10, name: "Jharkhand" },
  { id: 11, name: "Karnataka" },
  { id: 12, name: "Kerala" },
  { id: 13, name: "Madhya Pradesh" },
  { id: 14, name: "Maharashtra" },
  { id: 15, name: "Manipur" },
  { id: 16, name: "Meghalaya" },
  { id: 17, name: "Mizoram" },
  { id: 18, name: "Nagaland" },
  { id: 19, name: "Odisha" },
  { id: 20, name: "Punjab" },
  { id: 21, name: "Rajasthan" },
  { id: 22, name: "Sikkim" },
  { id: 23, name: "Tamil Nadu" },
  { id: 24, name: "Telangana" },
  { id: 25, name: "Tripura" },
  { id: 26, name: "Uttar Pradesh" },
  { id: 27, name: "Uttarakhand" },
  { id: 28, name: "West Bengal" },
  { id: 29, name: "Andaman and Nicobar Islands" },
  { id: 30, name: "Chandigarh" },
  { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu" },
  { id: 32, name: "Delhi" },
  { id: 33, name: "Jammu and Kashmir" },
  { id: 34, name: "Ladakh" },
  { id: 35, name: "Lakshadweep" },
  { id: 36, name: "Puducherry" },
];
const addressValidationSchema = Yup.object({
  recipient: Yup.string()
    .trim()
    .min(2, "Enter the recipient’s full name.")
    .max(80, "Name must be 80 characters or fewer.")
    .matches(/^[\p{L}][\p{L}\s.'-]*$/u, "Name can contain letters, spaces, apostrophes, periods, or hyphens only.")
    .required("Full name is required."),
  phone: Yup.string()
    .required("Phone number is required.")
    .test("indian-phone", "Enter a valid 10-digit Indian phone number.", (value) =>
      /^(?:\+?91)?[6-9]\d{9}$/.test((value || "").replace(/[\s()-]/g, "")),
    ),
  line1: Yup.string()
    .trim()
    .min(5, "Enter a complete street address.")
    .max(150, "Address must be 150 characters or fewer.")
    .required("Address line 1 is required."),
  line2: Yup.string().trim().max(150, "Address must be 150 characters or fewer."),
  city: Yup.string()
    .trim()
    .min(2, "Enter a valid city.")
    .max(80, "City must be 80 characters or fewer.")
    .matches(/^[\p{L}][\p{L}\s.'-]*$/u, "City can contain letters.")
    .required("City is required."),
  state: Yup.string()
    .oneOf(indianStates.map(({ name }) => name), "Choose a state or union territory from the list.")
    .required("State is required."),
  postalCode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code.")
    .required("PIN code is required."),
  country: Yup.string().oneOf(["IN"], "Choose India as the country."),
  isDefault: Yup.boolean(),
});
const responseData = (result) => result?.data?.data;
const money = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const imageUrl = (item) => {
  const path =
    item?.images?.[0]?.path ||
    item?.images?.[0] ||
    item?.image ||
    item?.imageUrl;
  if (!path || /^(https?:)?\/\//i.test(path)) return path || "";
  const base = import.meta.env.VITE_IMAGE_BASE_URL || "";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};
const selectedVariant = (item) =>
  item?.variants?.find((variant) => variant.id === item.selectedVariantId) ||
  item?.variants?.[0];

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutSkeleton() {
  return (
    <div
      className="mt-4 grid animate-pulse gap-4 lg:grid-cols-[minmax(0,1fr)_360px]"
      role="status"
      aria-label="Loading checkout"
    >
      <div className="space-y-4">
        <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
          <div className="h-6 w-44 rounded bg-neutral-200" />
          <div className="mt-4 space-y-3">
            {[0, 1 , 2].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-100 p-4">
                <div className="h-4 w-40 rounded bg-neutral-200" />
                <div className="mt-3 h-3 w-4/5 rounded bg-neutral-100" />
                <div className="mt-2 h-3 w-2/5 rounded bg-neutral-100" />
              </div>
            ))}
          </div>
          <div className="mt-4 h-4 w-36 rounded bg-neutral-100" />
        </section>
      </div>

      <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="h-6 w-40 rounded bg-neutral-200" />
        <div className="mt-4 h-20 rounded-xl bg-neutral-100" />
        <div className="mt-5 space-y-4">
          {[0].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-16 w-16 shrink-0 rounded-lg bg-neutral-200" />
              <div className="min-w-0 flex-1">
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-neutral-100" />
              </div>
              <div className="h-4 w-12 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3 border-t border-neutral-100 pt-5">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex justify-between gap-4">
              <div className="h-3 w-20 rounded bg-neutral-100" />
              <div className="h-3 w-14 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
        <div className="mt-5 h-12 rounded-full bg-neutral-200" />
      </aside>
    </div>
  );
}

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getCurrentUser);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [stateMenuOpen, setStateMenuOpen] = useState(false);
  const [stateMenuAbove, setStateMenuAbove] = useState(false);
  const stateMenuRef = useRef(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);
  const [confirmedTotals, setConfirmedTotals] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const addressFormik = useFormik({
    initialValues: emptyAddress,
    validationSchema: addressValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setBusy(true);
      setError("");
      try {
        const address = {
          ...values,
          recipient: values.recipient.trim(),
          phone: values.phone.trim(),
          line1: values.line1.trim(),
          line2: values.line2.trim(),
          city: values.city.trim(),
          postalCode: values.postalCode.trim(),
        };
        const result = editingAddressId
          ? await updateAddress(editingAddressId, address)
          : await addAddress({
              ...address,
              isDefault: addresses.length === 0 || address.isDefault,
            });
        const saved = responseData(result);
        if (!result?.success || !saved?.id)
          throw new Error(result?.message || "We couldn't save this address.");
        setAddresses((previous) =>
          editingAddressId
            ? previous.map((item) => (item.id === saved.id ? saved : item))
            : [saved, ...previous],
        );
        setSelectedAddressId(saved.id);
        setShowAddressForm(false);
        setEditingAddressId(null);
        setStateMenuOpen(false);
        setNotice("Address saved.");
        resetForm({ values: emptyAddress });
      } catch (requestError) {
        setError(requestError.message || "We couldn't save this address.");
      } finally {
        setBusy(false);
      }
    },
  });

  useEffect(() => {
    if (!stateMenuOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!stateMenuRef.current?.contains(event.target)) setStateMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setStateMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [stateMenuOpen]);

  const toggleStateMenu = () => {
    if (stateMenuOpen) {
      setStateMenuOpen(false);
      return;
    }
    const bounds = stateMenuRef.current?.getBoundingClientRect();
    setStateMenuAbove(Boolean(bounds && window.innerHeight - bounds.bottom < 260 && bounds.top > 260));
    setStateMenuOpen(true);
  };

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(selectedVariant(item)?.price ?? item.price ?? 0) *
            (item.quantity || 1),
        0,
      ),
    [items],
  );
  const discount = useMemo(() => {
    if (!coupon) return 0;
    const beforeCap =
      coupon.type === "percentage"
        ? (subtotal * Number(coupon.value || 0)) / 100
        : Number(coupon.value || 0);
    const cappedDiscount = Math.min(
      beforeCap,
      subtotal,
      Number(coupon.maxDiscount) > 0 ? Number(coupon.maxDiscount) : Infinity,
    );
    return subtotal >= Number(coupon.minOrder || 0) ? cappedDiscount : 0;
  }, [coupon, subtotal]);
  const shipping = subtotal - discount >= Number(import.meta.env.VITE_MINIMUM_CART_AMOUNT) ? 0 : Number(import.meta.env.VITE_DELIVERY_CHARGE || 0);
  const total = subtotal - discount + shipping;

  useEffect(() => {
    if (!isLoggedIn) dispatch(openAuthDialog());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setAddressesLoading(false);
      return;
    }
    let mounted = true;
    getAddresses()
      .then((result) => {
        if (!mounted) return;
        if (!result?.success) {
          setError(result?.message || "We couldn't load your saved addresses.");
          return;
        }
        const list = responseData(result);
        const rows = Array.isArray(list) ? list : [];
        setAddresses(rows);
        const preferred = rows.find((address) => address.isDefault) || rows[0];
        if (preferred) setSelectedAddressId(preferred.id);
        else setShowAddressForm(true);
      })
      .catch(
        (requestError) =>
          mounted &&
          setError(
            requestError.message || "We couldn't load your saved addresses.",
          ),
      )
      .finally(() => mounted && setAddressesLoading(false));
    return () => {
      mounted = false;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (!user?.name && !user?.phone) return undefined;
    const timer = window.setTimeout(() => {
      addressFormik.setValues((values) => ({
        ...values,
        recipient: values.recipient || user.name || "",
        phone: values.phone || user.phone || "",
      }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [user, addressFormik.setValues]);

  const beginAddressEdit = (address) => {
    setEditingAddressId(address.id);
    addressFormik.resetForm({ values: { ...emptyAddress, ...address } });
    setShowAddressForm(true);
    setError("");
  };

  const applyCoupon = async (event) => {
    event.preventDefault();
    if (!couponInput.trim()) return;
    setBusy(true);
    setError("");
    setNotice("");
    setCouponError("");
    try {
      const cartResult = await syncCart(
        items.map((item) => ({
          variantId: selectedVariant(item)?.id,
          quantity: Number(item.quantity || 1),
        })),
      );
      if (!cartResult?.success)
        throw new Error(cartResult?.message || "We couldn't check this coupon against your cart.");
      const result = await validateCoupon(couponInput.trim().toUpperCase());
      const validCoupon = responseData(result);
      const eligibility = validCoupon?.eligible ?? validCoupon?.isEligible ?? validCoupon?.valid;
      const alreadyUsed = validCoupon?.alreadyUsed || validCoupon?.isAlreadyUsed || validCoupon?.usedByUser;
      if (!result?.success || !validCoupon?.code || eligibility === false || alreadyUsed)
        throw new Error(result?.message || validCoupon?.message || (alreadyUsed ? "This coupon has already been used on your account." : "That coupon couldn't be applied."));
      setCoupon(validCoupon);
      setCouponInput(validCoupon.code);
      setNotice(`Coupon ${validCoupon.code} applied.`);
    } catch (requestError) {
      setCoupon(null);
      setCouponError(requestError.message || "That coupon couldn't be applied.");
    } finally {
      setBusy(false);
    }
  };

  const pay = async () => {
    if (!isLoggedIn) {
      dispatch(openAuthDialog());
      return;
    }
    if (!selectedAddress) {
      setError("Add or select a delivery address to continue.");
      return;
    }
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    setBusy(true);
    setError("");
    setCouponError("");
    setNotice("");
    try {
      const cartResult = await syncCart(
        items.map((item) => ({
          variantId: selectedVariant(item)?.id,
          quantity: Number(item.quantity || 1),
        })),
      );
      if (!cartResult?.success)
        throw new Error(
          cartResult?.message || "We couldn't prepare your cart.",
        );
      const orderResult = await createOrder({
        address: selectedAddress,
        paymentMode: "UPI",
        couponCode: coupon?.code,
      });
      const orderData = responseData(orderResult);
      if (!orderResult?.success || !orderData)
        throw new Error(
          orderResult?.message || "We couldn't create your order.",
        );
      const { order, payment } = orderData;
      if (order) setConfirmedTotals(order);
      if (!payment) {
        dispatch(clearCart());
        setOrderConfirmation(order);
        return;
      }
      const ready = await loadRazorpay();
      if (!ready)
        throw new Error(
          "Payment window couldn't load. Please check your connection and try again.",
        );
      const checkout = new window.Razorpay({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency || "INR",
        name: "ELSE Fragrances",
        description: `Order ${order.orderNumber}`,
        order_id: payment.orderId,
        prefill: {
          name: user?.name || selectedAddress.recipient,
          email: user?.email || "",
          contact: selectedAddress.phone,
        },
        theme: { color: "#171717" },
        handler: async (paymentResponse) => {
          setPaymentStatusLoading(true);
          setError("");
          try {
            const verified = await verifyPayment(order.id, paymentResponse);
            if (!verified?.success)
              throw new Error(
                verified?.message || "Payment verification failed.",
              );
            setOrderConfirmation(responseData(verified) || order);
            dispatch(clearCart());
          } catch (requestError) {
            setPaymentStatusLoading(false);
            setError(
              requestError.message || "We couldn't verify this payment.",
            );
          }
        },
        modal: {
          ondismiss: () =>
            setNotice(
              "Payment was not completed. Your order is still pending.",
            ),
        },
      });
      checkout.open();
    } catch (requestError) {
      const message = requestError.message || "Checkout couldn't be completed.";
      if (coupon && /coupon|promo|redeemed|already used/i.test(message)) {
        setCouponError(message);
      } else {
        setError(message);
      }
    } finally {
      setBusy(false);
    }
  };

  if (!isLoggedIn)
    return (
      <main className="mx-auto min-h-[55vh] max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-medium">Sign in to continue</h1>
        <p className="mt-3 text-neutral-600">
          Your bag will be here when you finish signing in.
        </p>
        <button
          onClick={() => dispatch(openAuthDialog())}
          className="mt-6 rounded-full bg-[#171717] px-7 py-3 text-sm text-white"
        >
          Sign in or create account
        </button>
      </main>
    );

  if (orderConfirmation) {
    const confirmationItems = Array.isArray(orderConfirmation.items)
      ? orderConfirmation.items
      : [];
    const address = orderConfirmation.shippingAddress || selectedAddress || {};
    const addressLine = [
      address.line1,
      address.line2,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter(Boolean).join(", ");
    const confirmationImage = (item) => {
      const path = item.productSnapshot?.image || item.product?.images?.[0]?.path;
      if (!path || /^(https?:)?\/\//i.test(path)) return path || "";
      const base = import.meta.env.VITE_IMAGE_BASE_URL || "";
      return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
    };
    return (
      <main className="mx-auto max-w-6xl px-4 py-5 text-[#171717] sm:px-7 sm:py-7">
        <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 bg-[#f5f4ef] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-green-700"><Check size={24} /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Order placed</p>
                <h1 className="mt-1 text-2xl font-medium sm:text-3xl">Thank you for your order</h1>
                <p className="mt-1 text-sm text-neutral-600">We’ve received your order and will keep you updated.</p>
              </div>
            </div>
            <p className="inline-flex w-fit rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold">Order {orderConfirmation.orderNumber || "confirmed"}</p>
          </div>
          <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] sm:gap-8 sm:p-7">
            <div>
              <h2 className="text-base font-semibold">Items in your order</h2>
              <div className="mt-4 divide-y divide-neutral-200">
                {confirmationItems.map((item) => {
                  const options = item.variantOptions || item.variantSnapshot?.options || {};
                  const variantLabel = options.volumeMl ? `${options.volumeMl} ml` : options.pack || options.comboName || item.sku || "";
                  return <div key={item.id || `${item.productId}-${item.variantId}`} className="flex items-center gap-3 py-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f7f6f3]">
                      {confirmationImage(item) && <img src={confirmationImage(item)} alt="" className="h-full w-full object-contain p-1" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name || item.product?.name || "Fragrance"}</p>
                      <p className="mt-1 text-xs text-neutral-500">{variantLabel}{variantLabel ? " · " : ""}Qty {item.quantity || 1}</p>
                    </div>
                    <strong className="text-sm">{money(Number(item.unitPrice || 0) * Number(item.quantity || 1))}</strong>
                  </div>;
                })}
              </div>
              <div className="mt-3 border-t border-neutral-200 pt-4">
                <h2 className="text-base font-semibold">Delivery address</h2>
                <p className="mt-2 text-sm font-medium">{address.recipient || user?.name}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">{addressLine || "Address details unavailable"}</p>
                {address.phone && <p className="mt-1 text-sm text-neutral-600">{address.phone}</p>}
              </div>
            </div>
            <aside className="h-fit rounded-2xl bg-[#faf9f6] p-5">
              <h2 className="text-base font-semibold">Order details</h2>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-neutral-600">Status</dt><dd className="font-medium">{orderConfirmation.status || "Processing"}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-neutral-600">Payment</dt><dd className="font-medium">{orderConfirmation.paymentStatus || "Received"}</dd></div>
                {orderConfirmation.createdAt && <div className="flex justify-between gap-3"><dt className="text-neutral-600">Placed</dt><dd className="text-right font-medium">{new Date(orderConfirmation.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</dd></div>}
              </dl>
              <div className="mt-4 space-y-2.5 border-t border-neutral-200 pt-4 text-sm">
                <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{money(orderConfirmation.subtotal)}</span></div>
                {Number(orderConfirmation.discount) > 0 && <div className="flex justify-between"><span className="text-neutral-600">Discount</span><span>−{money(orderConfirmation.discount)}</span></div>}
                <div className="flex justify-between"><span className="text-neutral-600">Delivery</span><span>{Number(orderConfirmation.shipping) ? money(orderConfirmation.shipping) : "Free"}</span></div>
                <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold"><span>Total paid</span><span>{money(orderConfirmation.total)}</span></div>
              </div>
            </aside>
          </div>
        </section>
        <div className="flex flex-col gap-3 border-t border-neutral-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <Link to="/account/orders" className="rounded-full bg-[#171717] px-6 py-2.5 text-center text-sm font-medium text-white">View my orders</Link>
          <Link to="/perfumes" className="rounded-full border border-neutral-300 px-6 py-2.5 text-center text-sm font-medium">Continue shopping</Link>
        </div>
      </main>
    );
  }

  if (paymentStatusLoading)
    return (
      <main
        className="grid min-h-[55vh] place-items-center px-5 py-16 text-center text-[#171717]"
        role="status"
        aria-live="polite"
      >
        <div className="max-w-md">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-[#171717]" />
          <h1 className="mt-6 text-2xl font-medium">Updating your order status</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Your payment response was received. Please wait while we confirm
            your order. This may take a few moments.
          </p>
        </div>
      </main>
    );

  if (!items.length && !notice)
    return (
      <main className="mx-auto min-h-[55vh] max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-medium">Your bag is empty</h1>
        <Link
          to="/perfumes"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3 text-sm text-white"
        >
          Explore fragrances
        </Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-6xl px-4 py-4 text-[#171717] sm:px-7 sm:py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
      >
        <ArrowLeft size={16} /> Continue shopping
      </Link>
      <h1 className="mt-3 text-2xl font-medium sm:text-3xl">Checkout</h1>
      {notice && (
        <p
          role="status"
          className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-800"
        >
          {notice}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs leading-4 text-red-700"
        >
          {error}
        </p>
      )}

      {addressesLoading ? (
        <CheckoutSkeleton />
      ) : items.length > 0 && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
              <h2 className="flex items-center gap-2 text-lg font-medium">
                <MapPin size={17} /> Delivery address
              </h2>
              {!showAddressForm && addresses.length > 0 && (
                <div className="mt-3 space-y-2">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-start gap-3 rounded-xl border p-3 ${selectedAddressId === address.id ? "border-[#171717] bg-[#faf9f6]" : "border-neutral-200"}`}
                    >
                      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-sm leading-6">
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          className="mt-1 accent-[#171717]"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="font-medium">
                            {address.recipient}
                            {address.isDefault && (
                              <span className="ml-2 rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                                Default
                              </span>
                            )}
                          </span>
                          <span className="block text-neutral-600">
                            {[
                              address.line1,
                              address.line2,
                              address.city,
                              address.state,
                              address.postalCode,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                          <span className="block text-neutral-600">{address.phone}</span>
                        </span>
                      </label>
                      <button
                        onClick={() => beginAddressEdit(address)}
                        className="text-sm underline underline-offset-4"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      addressFormik.resetForm({
                        values: {
                          ...emptyAddress,
                          recipient: user?.name || "",
                          phone: user?.phone || "",
                        },
                      });
                      setEditingAddressId(null);
                      setStateMenuOpen(false);
                      setShowAddressForm(true);
                    }}
                    className="mt-2 text-sm font-medium underline underline-offset-4"
                  >
                    + Add a new address
                  </button>
                </div>
              )}
              {showAddressForm && (
                <form
                  onSubmit={addressFormik.handleSubmit}
                  noValidate
                  className="mt-3 grid gap-3 sm:grid-cols-2"
                >
                  {[
                    ["recipient", "Full name"],
                    ["phone", "Phone number"],
                    ["line1", "Address line 1"],
                    ["line2", "Address line 2 (optional)"],
                    ["city", "City"],
                    ["state", "State"],
                    ["postalCode", "PIN code"],
                  ].map(([name, label]) => (
                    <label
                      key={name}
                      className={`text-sm font-medium ${["line1", "line2"].includes(name) ? "sm:col-span-2" : ""}`}
                    >
                      {label}
                      {name === "state" ? (
                        <div ref={stateMenuRef} className="relative mt-1">
                          <button
                            type="button"
                            aria-label="State or union territory"
                            aria-haspopup="listbox"
                            aria-expanded={stateMenuOpen}
                            aria-required="true"
                            aria-invalid={Boolean(addressFormik.touched.state && addressFormik.errors.state)}
                            aria-describedby={addressFormik.touched.state && addressFormik.errors.state ? "state-error" : undefined}
                            aria-controls="checkout-state-options"
                            onClick={toggleStateMenu}
                            className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-left font-normal outline-none focus:ring-2 focus:ring-neutral-200 ${addressFormik.touched.state && addressFormik.errors.state ? "border-red-600" : "border-neutral-300 focus:border-neutral-800"}`}
                          >
                            <span className={addressFormik.values.state ? "text-neutral-900" : "text-neutral-500"}>
                              {addressFormik.values.state || "Select a state or union territory"}
                            </span>
                            <ChevronDown size={16} className={`shrink-0 text-neutral-500 transition-transform ${stateMenuOpen ? "rotate-180" : ""}`} />
                          </button>
                          {stateMenuOpen && (
                            <div
                              id="checkout-state-options"
                              role="listbox"
                              aria-label="Indian states and union territories"
                              className={`absolute z-50 max-h-60 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-xl ${stateMenuAbove ? "bottom-full mb-1" : "top-full mt-1"}`}
                            >
                              {addressFormik.values.state && !indianStates.some((state) => state.name === addressFormik.values.state) && (
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected="true"
                                  onClick={() => {
                                    addressFormik.setFieldValue("state", addressFormik.values.state);
                                    addressFormik.setFieldTouched("state", true, false);
                                    setStateMenuOpen(false);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
                                >{addressFormik.values.state}</button>
                              )}
                              {indianStates.map((state) => (
                                <button
                                  key={state.id}
                                  type="button"
                                  role="option"
                                  aria-selected={addressFormik.values.state === state.name}
                                  onClick={() => {
                                    addressFormik.setFieldValue("state", state.name);
                                    addressFormik.setFieldTouched("state", true, false);
                                    setStateMenuOpen(false);
                                  }}
                                  className={`w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none ${addressFormik.values.state === state.name ? "bg-neutral-100 font-medium" : ""}`}
                                >{state.name}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name={name}
                          id={name}
                          value={addressFormik.values[name] || ""}
                          onChange={(event) => {
                            addressFormik.handleChange(event);
                            addressFormik.setFieldTouched(name, true, false);
                          }}
                          onBlur={addressFormik.handleBlur}
                          aria-invalid={Boolean(addressFormik.touched[name] && addressFormik.errors[name])}
                          aria-describedby={addressFormik.touched[name] && addressFormik.errors[name] ? `${name}-error` : undefined}
                          autoComplete={
                            name === "postalCode"
                              ? "postal-code"
                              : "shipping " + name
                          }
                          className={`mt-1 w-full rounded-lg border px-3 py-2.5 font-normal outline-none focus:border-neutral-800 ${addressFormik.touched[name] && addressFormik.errors[name] ? "border-red-600" : "border-neutral-300"}`}
                        />
                      )}
                      {(addressFormik.touched[name] || (name === "state" && addressFormik.submitCount > 0)) && addressFormik.errors[name] && (
                        <span id={`${name}-error`} role="alert" className="mt-1 block text-xs font-normal text-red-700">
                          {addressFormik.errors[name]}
                        </span>
                      )}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(addressFormik.values.isDefault)}
                      onChange={(event) => addressFormik.setFieldValue("isDefault", event.target.checked)}
                      className="accent-[#171717]"
                    />{" "}
                    Set as default address
                  </label>
                  <div className="flex gap-3 sm:col-span-2">
                    <button
                      disabled={busy || addressFormik.isSubmitting}
                      className="rounded-full bg-[#171717] px-5 py-2.5 text-sm text-white disabled:opacity-50"
                    >
                      {busy || addressFormik.isSubmitting ? "Saving…" : "Save address"}
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                        }}
                        className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </section>

          </div>

          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-xl font-medium">Order summary</h2>
            <form onSubmit={applyCoupon} className="mt-4 rounded-xl border border-neutral-200 bg-[#faf9f6] p-3">
              <label htmlFor="checkout-coupon" className="flex items-center gap-2 text-xs font-semibold text-neutral-700"><Tag size={14} /> Coupon code</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="checkout-coupon"
                  value={couponInput}
                  onChange={(event) => {
                    setCouponInput(event.target.value);
                    setCouponError("");
                    setNotice("");
                  }}
                  placeholder="Enter code"
                  disabled={Boolean(coupon)}
                  className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs uppercase outline-none focus:border-neutral-800 disabled:bg-neutral-100"
                />
                {coupon ? (
                  <button type="button" onClick={() => {
                    setCoupon(null);
                    setCouponInput("");
                    setCouponError("");
                    setNotice("");
                    setError((current) => /coupon|promo|redeemed|already used/i.test(current) ? "" : current);
                  }} className="rounded-lg border border-neutral-300 px-3 text-xs font-medium">Remove</button>
                ) : (
                  <button disabled={busy || !couponInput.trim()} className="rounded-lg bg-[#171717] px-4 text-xs font-medium text-white disabled:opacity-50">Apply</button>
                )}
              </div>
              {coupon && <p className="mt-2 text-[11px] text-green-800">{coupon.code} applied</p>}
              {coupon && subtotal < Number(coupon.minOrder || 0) && <p className="mt-1 text-[11px] text-amber-700">Minimum order: {money(coupon.minOrder)}</p>}
              {couponError && <p role="alert" className="mt-2 rounded-md bg-red-50 px-2.5 py-2 text-[11px] leading-4 text-red-700">{couponError}</p>}
            </form>
            <div className="mt-4 max-h-72 space-y-4 overflow-y-auto">
              {items.map((item) => {
                const variant = selectedVariant(item);
                const volume = variant?.options?.volumeMl;
                return (
                  <div key={`${item.id}-${variant?.id}`} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f7f6f3]">
                      {imageUrl(item) && (
                        <img
                          src={imageUrl(item)}
                          alt=""
                          className="h-full w-full object-contain p-1"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name || "Fragrance"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {volume ? `${volume} ml` : variant?.options?.pack || ""}{" "}
                        · Qty {item.quantity || 1}
                      </p>
                    </div>
                    <strong className="text-sm">
                      {money(
                        Number(variant?.price ?? item.price ?? 0) *
                          (item.quantity || 1),
                      )}
                    </strong>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 space-y-3 border-t border-neutral-200 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>{money(confirmedTotals?.subtotal ?? subtotal)}</span>
              </div>
              {coupon && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    Discount ({coupon.code})
                  </span>
                  <span>−{money(confirmedTotals?.discount ?? discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-neutral-600">
                  <Truck size={15} /> Delivery
                </span>
                <span>
                  {(confirmedTotals?.shipping ?? shipping)
                    ? money(confirmedTotals?.shipping ?? shipping)
                    : "Free"}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>{money(confirmedTotals?.total ?? total)}</span>
              </div>
            </div>
            <button
              disabled={busy || !selectedAddress}
              onClick={pay}
              className="mt-5 w-full rounded-full bg-[#171717] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#38302c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? "Preparing checkout…" : "Proceed to pay"}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-neutral-500">
              <ShieldCheck size={14} /> Secure payment powered by Razorpay
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
