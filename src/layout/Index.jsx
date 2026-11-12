import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { House, ShoppingBag, Store, UserRound } from "lucide-react";
import FestiveBanner from "../component/FestiveBanner";
import CartDrawer from "../component/CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from "../features/Cart/cartSlice";
import Cart from "../component/Cart";

function MobileTabBar() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const tabs = [
    { label: "Home", to: "/", icon: House, end: true },
    { label: "Products", to: "/perfumes", icon: Store },
  ];
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-[59] h-8 bg-[#151515] lg:hidden"
      />
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-4 rounded-b-[32px] border-t border-black/[0.06] bg-[#faf9f6] px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] text-[#777] shadow-[0_-5px_18px_rgba(0,0,0,.07)] backdrop-blur-xl lg:hidden"
      >
        {tabs.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] transition-colors ${isActive ? "font-medium text-[#171717]" : "hover:text-[#171717]"}`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${isActive ? "bg-[#171717] text-white" : "text-[#777]"}`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button
          type="button"
          aria-label="Account"
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] hover:text-[#171717]"
        >
          <span className="grid h-8 w-12 place-items-center rounded-full text-[#777]">
            <UserRound size={18} strokeWidth={1.8} />
          </span>
          <span>Account</span>
        </button>
        <button
          type="button"
          aria-label="Shopping bag"
          onClick={() => dispatch(setCartOpen(true))}
          className="relative flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] hover:text-[#171717]"
        >
          <span className="relative grid h-8 w-12 place-items-center rounded-full text-[#777]">
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span className="absolute right-2 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] text-white">
              {cartCount}
            </span>
          </span>
          <span>Cart</span>
        </button>
      </nav>
    </>
  );
}

function Index() {
  const { pathname } = useLocation();
  const isProductPage = pathname.startsWith("/perfume/");
  const isProductsPage = pathname === "/perfumes";
  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <FestiveBanner />
      <Header />
      <div
        className={`relative z-10 -mb-12 rounded-b-[42px] bg-[#faf9f6] pb-20 lg:pb-0 ${isProductPage || isProductsPage ? "overflow-visible" : "overflow-hidden"}`}
      >
        <Outlet />
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
      <MobileTabBar />
      <Cart />
    </div>
  );
}

export default Index;
