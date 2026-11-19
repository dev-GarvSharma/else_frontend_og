import React from "react";
import { useEffect, useState } from "react";
import SearchOverlay from "../component/SearchOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from "../features/Cart/cartSlice";
import { getCurrentUser, getIsLoggedIn, openAuthDialog } from "../features/Auth/authSlice";
import { Link, useLocation } from "react-router-dom";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.2 4.2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="7.5" r="3.3" />
      <path d="M5.5 20v-1.7a6.5 6.5 0 0 1 13 0V20" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M20.4 8.8c0 4.3-8.4 10-8.4 10s-8.4-5.7-8.4-10a4.2 4.2 0 0 1 8.4-1.1 4.2 4.2 0 0 1 8.4 1.1Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M5.5 8h13l-.8 12h-11L5.5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getCurrentUser);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 44);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`left-0 right-0 z-50 w-full transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          isHomePage
            ? isScrolled
              ? "fixed top-0 bg-[#151515]"
              : "absolute top-[44px] bg-transparent"
            : "sticky top-0 bg-[#151515]"
        }`}
      >
      <header className={`mx-auto flex w-full items-center px-5 transition-[min-height,border-radius,box-shadow,background-color,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:px-8 lg:px-[8.5%] ${isTransparent ? "min-h-[68px] rounded-none bg-transparent text-white shadow-none" : `bg-white text-[#171717] ${isScrolled ? "min-h-[60px] rounded-t-[26px] shadow-[0_8px_24px_rgba(0,0,0,.14)]" : "min-h-[68px] rounded-t-[42px] shadow-[0_4px_18px_rgba(0,0,0,0.04)]"}`}`}>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 whitespace-nowrap text-[12px] lg:flex lg:gap-8"
        >
          <Link
            to="perfumes"
            className={`transition-colors ${isTransparent ? "hover:text-white/75" : "hover:text-[#a64d3e]"}`}
          >
            Perfumes
          </Link>
          <Link to="#women" className={`transition-colors ${isTransparent ? "hover:text-white/75" : "hover:text-[#a64d3e]"}`}>
            Women
          </Link>
          <Link to="#men" className={`transition-colors ${isTransparent ? "hover:text-white/75" : "hover:text-[#a64d3e]"}`}>
            Men
          </Link>
          <Link to="#advent-calendar" className={`transition-colors ${isTransparent ? "hover:text-white/75" : "hover:text-[#a64d3e]"}`}>
            Advent calendar
          </Link>
          <Link to="#sale" className="rounded-full bg-[#d52935] px-3 py-1 font-medium leading-none text-white">

            Sale
          </Link>
        </nav>

        <Link
          to="/"
          aria-label="ELSE home"
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[21px] font-semibold tracking-[0.2em] sm:text-[23px]"
        >
          ELSE
        </Link>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className={`hidden h-[34px] w-[min(25vw,285px)] items-center gap-2 rounded-full px-3 text-left lg:flex ${isTransparent ? "bg-white/15 text-white/80" : "bg-[#f3f3f3] text-[#686868]"}`}
          >
            <SearchIcon />
            <span className="min-w-0 flex-1 truncate text-[11px]">
              Try 'Creed'...
            </span>
          </button>
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={`lg:hidden ${isTransparent ? "text-white" : "text-[#222]"}`}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label={isLoggedIn ? "Open account" : "Sign in"}
            title={isLoggedIn ? user?.name || "Account" : "Sign in"}
            onClick={() => dispatch(openAuthDialog())}
            className={`hidden lg:block ${isTransparent ? "text-white" : "text-[#222]"}`}
          >
            <UserIcon />
          </button>
          <button type="button" aria-label="Wishlist" className={`hidden lg:block ${isTransparent ? "text-white" : "text-[#222]"}`}>
            <HeartIcon />
          </button>
          <button
            type="button"
            aria-label="Shopping bag"
            onClick={() => dispatch(setCartOpen(true))}
            className={`relative hidden lg:block ${isTransparent ? "text-white" : "text-[#222]"}`}
          >
            <BagIcon />
            <span className="absolute -right-[7px] -top-[7px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] font-medium text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
      </div>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}

export default Header;
