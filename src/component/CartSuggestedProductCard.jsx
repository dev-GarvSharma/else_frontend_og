import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function CartSuggestedProductCarousel({ products = [], loading = false, title = "People also bought" }) {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const [dotCount, setDotCount] = useState(1);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const updateDots = () => {
      const clientWidth = carousel.clientWidth;
      const maxScroll = Math.max(carousel.scrollWidth - clientWidth, 0);
      const slideCount = loading ? 6 : products.length;
      const calculatedPages = clientWidth > 0 && maxScroll > 0
        ? Math.ceil((maxScroll / clientWidth) * 1.1) + 1
        : 1;
      const pages = Number.isFinite(calculatedPages)
        ? Math.max(1, Math.min(calculatedPages, Math.max(slideCount, 1)))
        : 1;
      setDotCount(pages);
      setActiveDot(maxScroll === 0 ? 0 : Math.round((carousel.scrollLeft / maxScroll) * (pages - 1)));
    };

    const onScroll = () => {
      const maxScroll = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
      setActiveDot(maxScroll === 0 ? 0 : Math.round((carousel.scrollLeft / maxScroll) * (dotCount - 1)));
    };

    updateDots();
    carousel.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(updateDots);
    observer.observe(carousel);

    return () => {
      carousel.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [products.length, loading, dotCount]);

  useEffect(() => () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current.frame);
      animationRef.current.restore();
    }
  }, []);

  const smoothScrollTo = (target) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current.frame);
      animationRef.current.restore();
    }

    const start = carousel.scrollLeft;
    const end = Math.max(0, Math.min(target, carousel.scrollWidth - carousel.clientWidth));
    const distance = end - start;
    const duration = 1050;
    const startedAt = performance.now();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || Math.abs(distance) < 1) {
      carousel.scrollLeft = end;
      return;
    }

    const previousSnapType = carousel.style.scrollSnapType;
    const previousScrollBehavior = carousel.style.scrollBehavior;
    const restore = () => {
      carousel.style.scrollSnapType = previousSnapType;
      carousel.style.scrollBehavior = previousScrollBehavior;
    };
    carousel.style.scrollSnapType = "none";
    carousel.style.scrollBehavior = "auto";

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      carousel.scrollLeft = start + distance * eased;
      if (progress < 1) {
        animationRef.current.frame = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
        restore();
      }
    };

    animationRef.current = { frame: requestAnimationFrame(step), restore };
  };

  const scrollToDot = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScroll = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
    smoothScrollTo(dotCount <= 1 ? 0 : (maxScroll * index) / (dotCount - 1));
  };

  const scrollByPage = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector(".cart-suggestion-slide");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 8 : carousel.clientWidth / 3;
    smoothScrollTo(carousel.scrollLeft + direction * step);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-medium text-[#657591]">{title}</h2>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={activeDot === 0}
            aria-label="Scroll to previous products"
            className="grid h-7 w-7 place-items-center rounded-full border border-[#d9dfea] bg-white text-[#657591] transition hover:border-[#657591] hover:text-[#273142] disabled:cursor-default disabled:opacity-35"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={activeDot >= dotCount - 1}
            aria-label="Scroll to next products"
            className="grid h-7 w-7 place-items-center rounded-full border border-[#d9dfea] bg-white text-[#657591] transition hover:border-[#657591] hover:text-[#273142] disabled:cursor-default disabled:opacity-35"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="cart-suggested-carousel flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
        aria-label="Suggested products"
      >
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="cart-suggestion-slide snap-start">
                <div aria-hidden="true" className="min-h-[205px] animate-pulse rounded-xl border border-[#d9dfea] bg-white p-2 sm:min-h-[218px]">
                  <div className="h-[76px] rounded-md bg-[#e5eaf1]" />
                  <div className="mx-auto mt-2 h-2 w-1/3 rounded bg-[#dce4ef]" />
                  <div className="mx-auto mt-1 h-3 w-3/4 rounded bg-[#dce4ef]" />
                  <div className="mx-auto mt-1 h-2 w-1/2 rounded bg-[#dce4ef]" />
                  <div className="mt-3 h-7 rounded-md bg-[#e5eaf1]" />
                </div>
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="cart-suggestion-slide snap-start">
                <ProductCard product={product} compact />
              </div>
            ))}
      </div>

      {dotCount > 1 && (
        <div className="mt-1.5 flex justify-center gap-1.5" aria-label="Carousel pages">
          {Array.from({ length: Number.isFinite(dotCount) ? Math.max(1, dotCount) : 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToDot(index)}
              aria-label={`Go to suggested products page ${index + 1}`}
              aria-current={activeDot === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeDot === index ? "w-7 bg-[#171717] shadow-[0_0_0_2px_rgba(2,96,43,0.12)]" : "w-2.5 bg-[#d9d2cc] hover:bg-[#bfb7b0]"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
