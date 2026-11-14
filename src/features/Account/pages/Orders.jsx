import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { getMyOrders } from "../api";
import AccountGate from "../AccountGate";

const responseData = (result) => result?.data?.data;
const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
const imageUrl = (path) => {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path)) return path;
  const base = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:4000";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};

function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getMyOrders()
      .then((result) => {
        if (!active) return;
        const data = responseData(result);
        if (!result?.success)
          setError(result?.message || "We couldn't load your orders.");
        else setOrders(Array.isArray(data) ? data : []);
      })
      .catch(
        (requestError) =>
          active &&
          setError(requestError.message || "We couldn't load your orders."),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-9 text-[#171717] sm:px-7 sm:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
      >
        <ArrowLeft size={16} /> Back to shopping
      </Link>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#957b60]">
            Your account
          </p>
          <h1 className="mt-2 text-3xl font-medium sm:text-4xl">Your orders</h1>
        </div>
        <Link
          to="/account/addresses"
          className="text-sm underline underline-offset-4"
        >
          Saved addresses
        </Link>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {loading ? (
        <div
          className="mt-8 animate-pulse space-y-4"
          aria-label="Loading orders"
        >
          {[1, 2].map((item) => (
            <div key={item} className="h-40 rounded-2xl bg-neutral-200" />
          ))}
        </div>
      ) : !orders.length ? (
        <section className="mt-8 rounded-2xl border border-black/10 bg-white px-6 py-14 text-center">
          <PackageCheck className="mx-auto text-neutral-400" size={32} />
          <h2 className="mt-4 text-xl font-medium">No orders yet</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Your placed orders will appear here.
          </p>
          <Link
            to="/perfumes"
            className="mt-6 inline-block rounded-full bg-[#171717] px-6 py-3 text-sm text-white"
          >
            Explore fragrances
          </Link>
        </section>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-[#faf9f6] px-5 py-4 sm:px-6">
                <div>
                  <p className="font-medium">
                    Order {order.orderNumber || order.id}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Placed {date(order.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium">
                    {order.status || "Pending"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-neutral-600">
                    Payment: {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-neutral-100 px-5 sm:px-6">
                {(order.items || []).map((item) => {
                  const option = item.variantOptions || {};
                  const size = option.volumeMl
                    ? `${option.volumeMl} ml`
                    : option.pack || option.comboName || "";
                  const image =
                    item.productSnapshot?.image ||
                    item.product?.images?.[0]?.path ||
                    item.variant?.images?.[0];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {image ? (
                          <img
                            className="h-14 w-14 shrink-0 rounded-lg border border-black/10 bg-white object-cover"
                            src={imageUrl(image)}
                            alt={item.name || ""}
                          />
                        ) : (
                          <div
                            className="h-14 w-14 shrink-0 rounded-lg bg-neutral-100"
                            aria-hidden="true"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {item.name || "Fragrance"}
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {size && `${size} · `}Qty {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        {money(
                          Number(item.unitPrice || 0) *
                            Number(item.quantity || 1),
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-between gap-3 border-t border-neutral-200 px-5 py-4 text-sm sm:px-6">
                <p className="text-neutral-600">
                  {order.paymentMethod || "Online payment"}
                  {order.couponCode ? ` · Coupon ${order.couponCode}` : ""}
                </p>
                <p className="font-semibold">Total: {money(order.total)}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default function Orders() {
  return (
    <AccountGate>
      <OrdersContent />
    </AccountGate>
  );
}
