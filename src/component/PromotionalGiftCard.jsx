
import { Gift, Sparkles } from "lucide-react";

const PromotionalGiftCard = ({
  cartSubtotal = 399,
  minimumSubtotal = 599,
  promotionName = "Buy 2 Get 1 Free",
  product = {
    name: "Affection",
    size: "100 ml",
    price: 899,
    image:
      "/uploads/f5a972d8-db73-49d0-84a9-a694d0182c5d.png",
  },
}) => {
  const progress = Math.min(
    (cartSubtotal / minimumSubtotal) * 100,
    100
  );

  const remaining = Math.max(minimumSubtotal - cartSubtotal, 0);
  const isUnlocked = cartSubtotal >= minimumSubtotal;

  return (
    <div className="w-full rounded-xl border border-[#E8D8C8] bg-[#FBF8F4] p-2">
      {/* Gift Product */}
      <div className="flex items-center gap-2">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F1E9E0]">
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

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0E2D3]">
          <Gift size={17} className="text-[#A66A3F]" />
        </div>
      </div>

      {/* Offer Progress */}
      <div className="mt-2 border-t border-[#E9DED3] pt-2">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Sparkles size={13} className="text-[#B77945]" />
            <span className="text-[11px] font-semibold text-[#3B2F2F]">
              {promotionName}
            </span>
          </div>

          <span className="text-[10px] font-semibold text-[#A66A3F]">
            {isUnlocked ? "Unlocked!" : "Gift unlocked at ₹599"}
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
            ₹{cartSubtotal} / ₹{minimumSubtotal}
          </span>

          <span className="font-semibold text-[#A66A3F]">
            {isUnlocked
              ? "Your free gift is unlocked 🎉"
              : `Add ₹${remaining} more`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromotionalGiftCard;
