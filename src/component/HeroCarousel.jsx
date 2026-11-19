import React, { useCallback, useEffect, useRef, useState } from "react";
import Image1 from "../assets/else-affection-uniform.png";
import Image2 from "../assets/else-after-life-uniform.png";
import Image3 from "../assets/else-obsession-uniform.png";
import Image4 from "../assets/else-still-uniform.png";
import { AreaChart, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    name: "AFFECTION",
    subtitle: "A little nutty. A lot of delicious.",
    color: "#0baca7",
    image: Image1,
    background:
      "radial-gradient(circle at 50% 45%, #36c9bd 0%, #078e89 45%, #005e60 100%)",
    title: "AFFECTION",
    particleImage:
      "https://elsecoffee.com/cdn/shop/files/Hazelnut.png?v=1793015089&width=300",
    url: "/products/irish-hazelnut",
  },
  {
    name: "AFTER LIFE",
    subtitle: "Your everyday coffee upgrade.",
    color: "#79439b",
    image: Image2,
    background:
      "radial-gradient(circle at 50% 45%, #a66ac5 0%, #713c91 48%, #39204f 100%)",
    title: "AFTER LIFE",
    particleImage:
      "https://elsecoffee.com/cdn/shop/files/Bean.png?v=1793015090&width=300",
    url: "/products/original-blend",
  },
  {
    name: "OBSSESSION",
    subtitle: "A burst of bold flavour.",
    color: "#f47224",
    image: Image3,
    background:
      "radial-gradient(circle at 50% 45%, #ff9a43 0%, #ed641b 48%, #9c3210 100%)",
    title: "OBSSESSION",
    particleImage:
      "https://elsecoffee.com/cdn/shop/files/Orange.png?v=1793015089&width=300",
    url: "/products/sparky-orange",
  },
  {
    name: "VANILLA",
    subtitle: "Rich, smooth and irresistible.",
    color: "#8a0b1d",
    image: Image4,
    background:
      "radial-gradient(circle at 50% 45%, #c42a3e 0%, #850b20 48%, #3e0614 100%)",
    title: "VANILLA",
    particleImage:
      "https://elsecoffee.com/cdn/shop/files/Chocolate.png?v=1793015088&width=300",
    url: "/products/vanilla",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const touchStart = useRef(0);

  const current = slides[active];

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const previous = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const goTo = (index) => {
    setDirection(index >= active ? 1 : -1);
    setActive(index);
    setProgressKey((prev) => prev + 1);
  };

  // Match the original hero's scattered ingredient art and depth values.
  const particlePositions = [
    {
      className: "p-fg-left",
      top: "34%",
      left: "4%",
      width: "clamp(65px, 6vw, 120px)",
      rotate: -26,
      x: 32,
      y: 22,
    },
    {
      className: "p-fg-right",
      top: "29%",
      right: "8%",
      width: "clamp(75px, 7.2vw, 140px)",
      rotate: 42,
      blur: 4.5,
      x: 45,
      y: 30,
    },
    {
      className: "p-mid-left",
      top: "67%",
      left: "12%",
      width: "clamp(40px, 3.8vw, 75px)",
      rotate: 18,
      x: 18,
      y: 12,
    },
    {
      className: "p-mid-right",
      top: "69%",
      right: "32%",
      width: "clamp(45px, 4.2vw, 82px)",
      rotate: -15,
      x: 20,
      y: 14,
    },
    {
      className: "p-bg-tl",
      top: "24%",
      left: "2%",
      width: "clamp(35px, 3vw, 60px)",
      rotate: 65,
      blur: 3.5,
      x: 8,
      y: 6,
    },
    {
      className: "p-bg-tr",
      top: "33%",
      right: "3%",
      width: "clamp(35px, 3vw, 60px)",
      rotate: -48,
      blur: 3.5,
      x: 10,
      y: 6,
    },
    {
      className: "p-bg-bl",
      top: "66%",
      left: "2%",
      width: "clamp(28px, 2.5vw, 50px)",
      rotate: 30,
      blur: 2,
      x: 12,
      y: 8,
    },
    {
      className: "p-bg-br",
      top: "77%",
      right: "22%",
      width: "clamp(28px, 2.5vw, 50px)",
      rotate: 75,
      blur: 1.5,
      x: 14,
      y: 9,
    },
  ];

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [paused, next, active]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const difference = touchStart.current - event.changedTouches[0].clientX;

    if (difference > 50) next();
    if (difference < -50) previous();
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#111] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        handleMouseLeave();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes else-enter {
          from {
            opacity: 0;
            transform: translateX(calc(var(--dir) * 34%)) rotate(calc(var(--dir) * 7deg));
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes else-bg-enter {
          from { opacity: 0; transform: scale(1.15); filter: blur(14px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @keyframes else-text {
          from {
            opacity: 0;
            transform: translateY(45px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes else-float {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }

        @keyframes else-progress {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes else-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }

        .else-product {
          animation: else-enter .9s cubic-bezier(.2,.8,.2,1) both;
        }

        .else-text {
          animation: else-text .8s .15s ease both;
        }

        .else-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,.35);
          color: transparent;
        }

        .else-wall-title {
          font-family: 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif;
          font-size: clamp(58px, 7.8vw, 112px);
          font-weight: 600;
          letter-spacing: .05em;
          line-height: 1.05;
        }

        .else-wall-outline-2 {
          -webkit-text-stroke-color: rgba(255,255,255,.28);
          opacity: .4;
        }

        .else-wall-outline-3 {
          -webkit-text-stroke-color: rgba(255,255,255,.2);
          opacity: .18;
        }

        .else-bg { animation: else-bg-enter 1.2s cubic-bezier(.16,.84,.24,1) both; }

        .else-particle {
          animation: else-float 5s ease-in-out infinite;
          transition: transform .4s ease-out;
        }

        .else-progress {
          animation: else-progress 3000ms linear forwards;
        }

        .carousel-arrow-prev { left: calc(50% - min(19.5vw, 215px) - 64px); }
        .carousel-arrow-next { right: calc(50% - min(19.5vw, 215px) - 64px); }

        @media (max-width: 640px) {
          .else-stage {
            min-height: 620px;
            height: 78vh;
            max-height: 760px;
          }
          .else-product-image {
            width: 50vw !important;
            max-height: 390px !important;
          }
          .carousel-arrow-prev { left: calc(50% - 25vw - 64px); }
          .carousel-arrow-next { right: calc(50% - 25vw - 64px); }
          .else-heading {
            font-size: clamp(38px, 12vw, 72px) !important;
          }
          .else-bottom {
            padding-bottom: 25px;
          }
        }

        @media (max-width: 639px) {
          .carousel-arrow-prev { left: calc(50% - 25vw - 52px); }
          .carousel-arrow-next { right: calc(50% - 25vw - 52px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .else-product, .else-text, .else-particle, .else-progress {
            animation: none !important;
          }
        }
      `}</style>

      {/* Carousel stage */}
      <div
        className="else-stage relative flex h-[min(820px,90vh)] min-h-[620px] w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: current.color, "--dir": direction }}
        onMouseMove={handleMouseMove}
      >
        {/* Background moves the least to create the farthest depth plane. */}
        <div
          key={`glow-${active}`}
          className="else-bg pointer-events-none absolute -inset-[3%] z-0"
          style={{
            background: current.background,
            transform: `translate(${-mouse.x * 12}px, ${-mouse.y * 8}px)`,
          }}
        />

        {/* Background decorative typography */}
        <div
          key={`background-${active}`}
          className="pointer-events-none absolute inset-x-0 top-[12%] z-10 flex flex-col items-center overflow-hidden pt-[clamp(32px,4vw,56px)] transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${-mouse.x * 6}px, ${-mouse.y * 4}px)`,
          }}
        >
          <span className="else-wall-title else-text whitespace-nowrap text-white [filter:drop-shadow(0_4px_12px_rgba(0,0,0,.15))]">
            {current.title}
          </span>
          <span className="else-wall-title else-outline else-text whitespace-nowrap">
            {current.title}
          </span>
          <span className="else-wall-title else-outline else-wall-outline-2 else-text whitespace-nowrap">
            {current.title}
          </span>
          <span className="else-wall-title else-outline else-wall-outline-3 else-text whitespace-nowrap">
            {current.title}
          </span>
        </div>

        {/* Decorative particles */}
        {particlePositions.map((particle, index) => (
          <img
            key={`${active}-${particle.className}`}
            src={current.particleImage}
            alt=""
            aria-hidden="true"
            className={`else-particle pointer-events-none absolute z-[25] object-contain ${particle.className}`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
              width: particle.width,
              filter: particle.blur ? `blur(${particle.blur}px)` : undefined,
              animationDelay: `${index * 0.5}s`,
              transform: `translate(${mouse.x * particle.x}px, ${mouse.y * particle.y}px) rotate(${particle.rotate}deg)`,
            }}
          />
        ))}

        {/* Product image */}
        <div
          key={`product-${active}`}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mouse.x * 16}px, ${mouse.y * 10}px)`,
          }}
        >
          <img
            key={`product-image-${active}`}
            src={current.image}
            alt={current.name}
            className="else-product else-product-image h-auto max-h-[560px] w-[min(39vw,430px)] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,.35)]"
            style={{ "--dir": direction }}
          />
        </div>
        {/* Previous button */}
        <button
          onClick={previous}
          aria-label="Previous slide"
          className="carousel-arrow-prev absolute top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/10 text-2xl backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-black md:h-10 md:w-10"
        >
          <ChevronLeft className="h-3 w-3 md:h-8 md:w-8" />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="carousel-arrow-next absolute top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/10 text-2xl backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-black md:h-10 md:w-10"
        >
          <ChevronRight className="h-3 w-3 md:h-8 md:w-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.name}
              onClick={() => goTo(index)}
              aria-label={`Go to ${slide.name}`}
              className={`relative h-[3px] overflow-hidden rounded-full bg-white/40 transition-all duration-300 ${
                active === index ? "w-12" : "w-5"
              }`}
            >
              {active === index && (
                <span
                  key={progressKey}
                  className="else-progress absolute left-0 top-0 h-full bg-white"
                  style={{ animationDuration: "3000ms" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
