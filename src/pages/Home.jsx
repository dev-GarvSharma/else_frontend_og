import React from "react";
import ProductCard from "../component/ProductCard";
import bannerImage from "../assets/Else Perfume Collection in Gold.png";

const categories = [
  "All Sale",
  "Clearance",
  "Under ₹299",
  "Middle Eastern",
  "Designer",
];

const categoryImage =
  "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/2baeb436-d003-4cdf-5717-3e34c3515000/public";

function BenefitIcon({ type }) {
  if (type === "original") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M24 3 29 6l6-1 3 6 6 3-1 7 3 5-4 6v7l-7 1-5 5-6-3-6 3-5-5-7-1v-7l-4-6 3-5-1-7 6-3 3-6 6 1 5-3Z" />
        <circle cx="24" cy="24" r="13" />
        <path d="m24 15 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L24 15Z" />
      </svg>
    );
  }
  if (type === "cod") {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M6 15 13 6h22l7 9H6Z" />
        <path d="M19 6v9h10V6M9 19h12v23H9zM24 31l5-5c2-2 5 1 3 3l-4 5h8c3 0 3 5 0 5H24l-4-3" />
        <path d="M27 24c4 0 6 1 8 3" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <path d="M5 13h36v7H5zM8 20v22h30V20M19 13v7M29 13v7M31 28h8l-3-3M39 28l-3 3M29 36h10l-3-3M39 36l-3 3" />
    </svg>
  );
}

function PerfumeIllustration({ step }) {
  return (
    <svg
      viewBox="0 0 100 110"
      aria-hidden="true"
      className="h-[104px] w-[94px] text-[#171717]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {step === 2 && (
        <>
          <path d="M13 23c7 0 9-5 10-12 1 7 3 12 10 12-7 1-9 5-10 12-1-7-3-11-10-12ZM76 34c4 0 5-3 6-7 1 4 2 7 6 7-4 1-5 3-6 7-1-4-2-6-6-7Z" />
          <path d="m69 17 12-5M72 22h12M68 27l9 4M17 82l-5 4 6 1M80 70l4 3-4 2" />
        </>
      )}
      <path d="M37 9h26l-3 7H40l-3-7ZM41 16h18v12H41zM36 28h28c4 0 7 3 7 7v48c0 5-3 8-8 8H35c-5 0-8-3-8-8V36c0-5 4-8 9-8Z" />
      <path
        d="M33 39h34v34c0 7-3 11-8 11H41c-5 0-8-4-8-11V39Z"
        fill="#eadff0"
        stroke="none"
      />
      <path d="M33 39h34v34c0 7-3 11-8 11H41c-5 0-8-4-8-11V39Z" />
      {step === 3 && (
        <>
          <circle cx="74" cy="83" r="15" fill="white" />
          <path d="m69 78 10 10m0-10L69 88" />
        </>
      )}
    </svg>
  );
}

const benefits = [
  {
    icon: "original",
    title: "100% ORIGINAL",
    description:
      "All products are original and go through strict quality check.",
  },
  {
    icon: "cod",
    title: "COD Available*",
    description: "Cash on delivery available on orders above ₹1,000/-",
  },
  {
    icon: "shipping",
    title: "Free Shipping",
    description: "Free Shipping all across India on all prepaid orders",
  },
];

const usageSteps = [
  {
    title: "01. Get The Fragrance",
    copy: "Hold The Bottle Upright 10-15 Cm",
    detail: "Away From Your Body",
  },
  {
    title: "02. Spray The Fragrance",
    copy: "Gently Spray It On Your Pulse Points",
    detail: "Like Neck & Wrists",
  },
  {
    title: "03. Leave The Fragrance",
    copy: "Do Not Spray It On Your Face Or Eyes",
    detail: "Or Other Sensitive Areas",
  },
];

function Home() {
  return (
    <div>
      <nav
        aria-label="Shop by category"
        className="flex w-full items-start justify-between gap-3 overflow-x-auto bg-white px-5 py-3 sm:justify-center sm:gap-7 sm:px-8"
      >
        {categories.map((category, index) => (
          <a
            href="#perfumes"
            key={category}
            className="group flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 text-center text-[11px] font-semibold text-[#171717]"
          >
            <span
              className={`relative grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-[0_5px_16px_rgba(69,42,25,0.12)] transition-shadow duration-300 group-hover:shadow-[0_9px_22px_rgba(69,42,25,0.2)] ${index % 2 === 0 ? "ring-2 ring-[#b32136] ring-offset-2 ring-offset-[#fffaf4]" : "ring-2 ring-[#a58b54] ring-offset-2 ring-offset-[#fffaf4]"}`}
            >
              <span className="grid h-[64px] w-[64px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,#fffefb_0%,#f8ead4_100%)]">
                <img
                  src={categoryImage}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#a9182d] px-2 py-0.5 text-[8px] font-bold leading-none tracking-[0.08em] text-white shadow-sm">
                {index === 0 ? "SALE" : "SHOP"}
              </span>
            </span>
            <span className="whitespace-nowrap transition-colors group-hover:text-[#a9182d]">
              {category}
            </span>
          </a>
        ))}
      </nav>

      <div>
        <img src={bannerImage} alt="Banner" className="w-full object-cover" />
      </div>

      <div className="my-10 px-6 sm:px-10 lg:px-12">
        <div className="mt-5 text-center">
          <h2 className="text-3xl">Explore Our Fragrances</h2>
          <p className="mb-5 mt-2">Find your perfect scent by preference</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[...Array(9)].map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>

      <section aria-labelledby="how-to-use-title" className="mt-14">
        <div className="grid gap-4 bg-[#faf7f2] px-6 py-5 sm:grid-cols-3 sm:gap-8 sm:px-10 lg:px-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="mx-auto flex w-full max-w-[350px] items-center gap-4 text-[#262321]"
            >
              <span className="h-11 w-11 shrink-0">
                <BenefitIcon type={benefit.icon} />
              </span>
              <p className="text-[12px] leading-[1.55]">
                <strong className="block text-[12px] font-bold uppercase">
                  {benefit.title}
                </strong>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-14 pt-12 text-center sm:px-8 sm:pt-14">
          <h2
            id="how-to-use-title"
            className="text-2xl font-semibold tracking-tight text-[#171717] sm:text-[27px]"
          >
            How To Use
          </h2>
          <div className="mx-auto mt-9 grid max-w-6xl gap-9 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12">
            {usageSteps.map((item, index) => (
              <article
                key={item.title}
                className="flex flex-col items-center text-[#171717]"
              >
                <PerfumeIllustration step={index + 1} />
                <h3 className="mt-2 text-[14px] font-bold">{item.title}</h3>
                <p className="mt-4 text-[12px] leading-5">
                  {item.copy}
                  <span className="block text-[11px]">{item.detail}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
