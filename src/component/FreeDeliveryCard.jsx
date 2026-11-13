import { Truck, CheckCircle2 } from "lucide-react";

const FreeDeliveryCard = ({
  cartSubtotal = 399,
  minimumOrder = Number(import.meta.env.VITE_MINIMUM_CART_AMOUNT) || 1499,
  deliveryCharge = Number(import.meta.env.VITE_DELIVERY_CHARGE) || 0,
}) => {
  const progress = Math.min((cartSubtotal / minimumOrder) * 100, 100);

  const remaining = Math.max(minimumOrder - cartSubtotal, 0);
  const isUnlocked = remaining === 0;

  return (
    <div className="w-full border-b border-black/[.08] bg-[#FCFAF7] px-2.5 py-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF1E9]">
          <Truck size={17} className="text-[#71866A]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="text-xs font-semibold text-[#3B2F2F]">
              {isUnlocked ? "Free delivery unlocked" : "Delivery charge applies"}
            </p>

            {isUnlocked && (
              <CheckCircle2 size={12} className="text-[#71866A]" />
            )}
          </div>

          <p className="text-[10px] text-gray-500">
            {isUnlocked
              ? "Your order qualifies for free shipping"
              : `Add ₹${remaining.toLocaleString("en-IN")} more to unlock free delivery`}
          </p>
        </div>

        <span className={`text-[10px] font-semibold ${isUnlocked ? "text-[#71866A]" : "text-[#3B2F2F]"}`}>
          {isUnlocked ? "FREE" : `₹${deliveryCharge.toLocaleString("en-IN")}`}
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#EAE5DE]">
        <div
          className="h-full rounded-full bg-[#829778] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default FreeDeliveryCard;
