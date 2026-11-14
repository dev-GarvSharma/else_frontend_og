import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
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

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getCurrentUser);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [confirmedTotals, setConfirmedTotals] = useState(null);

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
    return subtotal >= Number(coupon.minOrder || 0)
      ? Math.min(beforeCap, subtotal)
      : 0;
  }, [coupon, subtotal]);
  const shipping = subtotal - discount >= 2999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    if (!isLoggedIn) dispatch(openAuthDialog());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    let mounted = true;
    getAddresses()
      .then((result) => {
        const list = responseData(result);
        if (!mounted) return;
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
      );
    return () => {
      mounted = false;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (user?.name || user?.phone)
      setAddressForm((form) => ({
        ...form,
        recipient: form.recipient || user.name || "",
        phone: form.phone || user.phone || "",
      }));
  }, [user]);

  const beginAddressEdit = (address) => {
    setEditingAddressId(address.id);
    setAddressForm({ ...emptyAddress, ...address });
    setShowAddressForm(true);
    setError("");
  };

  const saveAddress = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = editingAddressId
        ? await updateAddress(editingAddressId, addressForm)
        : await addAddress({
            ...addressForm,
            isDefault: addresses.length === 0 || addressForm.isDefault,
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
      setNotice("Address saved.");
    } catch (requestError) {
      setError(requestError.message || "We couldn't save this address.");
    } finally {
      setBusy(false);
    }
  };

  const applyCoupon = async (event) => {
    event.preventDefault();
    if (!couponInput.trim()) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await validateCoupon(couponInput.trim().toUpperCase());
      const validCoupon = responseData(result);
      if (!result?.success || !validCoupon?.code)
        throw new Error(result?.message || "That coupon couldn't be applied.");
      setCoupon(validCoupon);
      setCouponInput(validCoupon.code);
      setNotice(`Coupon ${validCoupon.code} applied.`);
    } catch (requestError) {
      setCoupon(null);
      setError(requestError.message || "That coupon couldn't be applied.");
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
        paymentMode: paymentMethod,
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
        setNotice(
          `Order ${order?.orderNumber || "placed"} received successfully.`,
        );
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
          try {
            const verified = await verifyPayment(order.id, paymentResponse);
            if (!verified?.success)
              throw new Error(
                verified?.message || "Payment verification failed.",
              );
            dispatch(clearCart());
            setNotice(
              `Payment successful. Order ${order.orderNumber} is confirmed.`,
            );
          } catch (requestError) {
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
      setError(requestError.message || "Checkout couldn't be completed.");
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
    <main className="mx-auto max-w-6xl px-4 py-9 text-[#171717] sm:px-7 sm:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
      >
        <ArrowLeft size={16} /> Continue shopping
      </Link>
      <h1 className="mt-5 text-3xl font-medium sm:text-4xl">Checkout</h1>
      {notice && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {notice}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
              <h2 className="flex items-center gap-2 text-xl font-medium">
                <MapPin size={19} /> Delivery address
              </h2>
              {!showAddressForm && addresses.length > 0 && (
                <div className="mt-5 space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-start gap-3 rounded-xl border p-4 ${selectedAddressId === address.id ? "border-[#171717] bg-[#faf9f6]" : "border-neutral-200"}`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 accent-[#171717]"
                      />
                      <div className="min-w-0 flex-1 text-sm leading-6">
                        <div className="font-medium">
                          {address.recipient}
                          {address.isDefault && (
                            <span className="ml-2 rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600">
                          {[
                            address.line1,
                            address.line2,
                            address.city,
                            address.state,
                            address.postalCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <p className="text-neutral-600">{address.phone}</p>
                      </div>
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
                      setAddressForm({
                        ...emptyAddress,
                        recipient: user?.name || "",
                        phone: user?.phone || "",
                      });
                      setEditingAddressId(null);
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
                  onSubmit={saveAddress}
                  className="mt-5 grid gap-4 sm:grid-cols-2"
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
                      <input
                        required={!["line2"].includes(name)}
                        name={name}
                        value={addressForm[name] || ""}
                        onChange={(event) =>
                          setAddressForm((form) => ({
                            ...form,
                            [name]: event.target.value,
                          }))
                        }
                        autoComplete={
                          name === "postalCode"
                            ? "postal-code"
                            : "shipping " + name
                        }
                        className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-3 font-normal outline-none focus:border-neutral-800"
                      />
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(addressForm.isDefault)}
                      onChange={(event) =>
                        setAddressForm((form) => ({
                          ...form,
                          isDefault: event.target.checked,
                        }))
                      }
                      className="accent-[#171717]"
                    />{" "}
                    Set as default address
                  </label>
                  <div className="flex gap-3 sm:col-span-2">
                    <button
                      disabled={busy}
                      className="rounded-full bg-[#171717] px-6 py-3 text-sm text-white disabled:opacity-50"
                    >
                      {busy ? "Saving…" : "Save address"}
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                        }}
                        className="rounded-full border border-neutral-300 px-6 py-3 text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
              <h2 className="flex items-center gap-2 text-xl font-medium">
                <Tag size={19} /> Coupon code
              </h2>
              <form onSubmit={applyCoupon} className="mt-4 flex gap-2">
                <input
                  value={couponInput}
                  onChange={(event) => setCouponInput(event.target.value)}
                  placeholder="Enter coupon code"
                  className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-3 uppercase outline-none focus:border-neutral-800"
                />
                <button
                  disabled={busy || !couponInput.trim()}
                  className="rounded-xl bg-[#171717] px-5 text-sm text-white disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
              {coupon && (
                <div className="mt-3 flex items-center justify-between text-sm text-green-800">
                  <span className="flex items-center gap-2">
                    <Check size={16} /> {coupon.code} applied
                  </span>
                  <button
                    onClick={() => {
                      setCoupon(null);
                      setCouponInput("");
                    }}
                    className="underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {coupon && subtotal < Number(coupon.minOrder || 0) && (
                <p className="mt-2 text-xs text-amber-700">
                  This coupon needs an order subtotal of{" "}
                  {money(coupon.minOrder)}. It will be checked again at payment.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
              <h2 className="text-xl font-medium">Payment method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["UPI", "UPI"],
                  ["CARD", "Credit or debit card"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${paymentMethod === value ? "border-[#171717] bg-[#faf9f6]" : "border-neutral-200"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                      className="accent-[#171717]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-xl font-medium">Order summary</h2>
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto">
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
