
import { useEffect, useState } from "react";

const PromotionalGiftCard = ({
  cartSubtotal = 0,
  minimumSubtotal = 0,
  promotionName = "Buy 2 Get 1 Free",
  product = {
    name: "Affection",
    size: "100 ml",
    price: 899,
    image:
      "/uploads/f5a972d8-db73-49d0-84a9-a694d0182c5d.png",
  },
}) => {
  const [applied, setApplied] = useState(false);
  const threshold = Number(minimumSubtotal) || 0;
  const progress = threshold > 0 ? Math.min((cartSubtotal / threshold) * 100, 100) : 100;
  const remaining = Math.max(minimumSubtotal - cartSubtotal, 0);
  const isUnlocked = cartSubtotal >= threshold;

  useEffect(() => {
    if (!isUnlocked) setApplied(false);
  }, [isUnlocked]);

  return (
    <div className={`w-full rounded-xl border p-2 shadow-[0_2px_8px_rgba(0,0,0,.05)] transition-colors ${applied ? "border-[#78a887] bg-[#f4faf5]" : "border-[#E8D8C8] bg-white"}`}>
      {/* Gift Product */}
      <div className="flex items-center gap-2">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F1E9E0] p-1">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="truncate text-sm font-semibold text-[#3B2F2F]">
              {product.name}
            </p>
            <span className="shrink-0 rounded bg-[#E9F2E8] px-1.5 py-0.5 text-[9px] font-bold text-[#477447]">
              FREE
            </span>
          </div>

          <p className="text-[11px] text-gray-500">
            {product.size} · Eau de Parfum
          </p>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-xs text-gray-400 line-through">
              ₹{product.price}
            </span>
            <span className="text-xs font-bold text-[#477447]">
              ₹0
            </span>
          </div>
        </div>

        {applied ? (
          <button
            type="button"
            onClick={() => setApplied(false)}
            className="shrink-0 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            disabled={!isUnlocked}
            onClick={() => setApplied(true)}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${isUnlocked ? "border-[#24211e] bg-[#24211e] text-white hover:bg-[#403a34]" : "cursor-not-allowed border-[#e8e2da] bg-[#f0ece7] text-[#aaa39a]"}`}
          >
            Apply
          </button>
        )}
      </div>

      {/* Offer Progress */}
      <div className="mt-2 border-t border-[#E9DED3] pt-2">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold text-[#3B2F2F]">
              {promotionName}
            </span>
          </div>

          <span className="text-[10px] font-semibold text-[#A66A3F]">
            {isUnlocked ? "Unlocked!" : `Gift unlocked at ₹${threshold.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#E9DED3]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3B2F2F] via-[#A66A3F] to-[#D6A45F] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px]">
          <span className="text-gray-500">
            ₹{Number(cartSubtotal).toLocaleString("en-IN")} / ₹{threshold.toLocaleString("en-IN")}
          </span>

          <span className="font-semibold text-[#A66A3F]">
            {isUnlocked
              ? "Your free gift is unlocked"
              : `Add ₹${remaining} more`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromotionalGiftCard;
