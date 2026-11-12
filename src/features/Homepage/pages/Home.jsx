import ProductCard from "../../../component/ProductCard";
import BlogCard from "../../../component/BlogCard";
import bannerImage from "../../../assets/A Statement in Burgundy.png";
import { useEffect, useState } from "react";
import { getAllBlogArticles, getAllCategories, getAllProducts } from "../api";
import { Link } from "react-router-dom";
import {
  BlogCardSkeleton,
  CategorySkeleton,
  ProductCardSkeleton,
  SkeletonGroup,
} from "../../../component/CardSkeletons";

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

const faqs = [
  {
    question: "How do I choose a fragrance that suits me?",
    answer:
      "Start with the notes you already enjoy. Fresh citrus and airy florals feel bright, while woods, amber and musk create a warmer, deeper scent. Explore a family and wear it on your skin before deciding.",
  },
  {
    question: "How long does perfume usually last?",
    answer:
      "Wear time depends on the fragrance concentration, your skin and the weather. Applying to moisturised pulse points and storing your bottle away from heat and direct sunlight can help it last longer.",
  },
  {
    question: "Are your perfumes authentic?",
    answer:
      "Every fragrance in our collection is sourced with authenticity in mind and goes through a quality check before it reaches you.",
  },
  {
    question: "Where should I apply perfume?",
    answer:
      "Spray from a short distance onto pulse points such as your wrists and neck. Let the fragrance settle naturally, and avoid rubbing your skin after application.",
  },
];

function Home() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(-1);
  const [blogArticles, setBlogArticles] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchBlogArticles = async () => {
    try {
      const response = await getAllBlogArticles(1, 3);
      setBlogArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching blog articles:", error);
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBlogArticles();
  }, []);

  return (
    <div>
      <nav
        aria-label="Shop by category"
        className="flex w-full items-start justify-between gap-3 overflow-x-auto bg-white px-5 py-3 sm:justify-center sm:gap-7 sm:px-8"
      >
        {categoryLoading ? (
          <SkeletonGroup count={4} className="flex w-full items-start justify-between gap-3 sm:justify-center sm:gap-7">
            <CategorySkeleton />
          </SkeletonGroup>
        ) : category.map((category, index) => (
          <a
            href="perfumes"
            key={category.id}
            className="group flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 text-center text-[11px] font-semibold text-[#171717]"
          >
            <span
              className={`relative grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-[0_5px_16px_rgba(69,42,25,0.12)] transition-shadow duration-300 group-hover:shadow-[0_9px_22px_rgba(69,42,25,0.2)] ${index % 2 === 0 ? "ring-2 ring-[#b32136] ring-offset-2 ring-offset-[#fffaf4]" : "ring-2 ring-[#a58b54] ring-offset-2 ring-offset-[#fffaf4]"}`}
            >
              <span className="grid h-[64px] w-[64px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,#fffefb_0%,#f8ead4_100%)]">
                <img
                  src={`${imageBaseUrl}${category.image}` || categoryImage}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#a9182d] px-2 py-0.5 text-[8px] font-bold leading-none tracking-[0.08em] text-white shadow-sm">
                {category?.name}
              </span>
            </span>
            <span className="whitespace-nowrap transition-colors group-hover:text-[#a9182d]">
              {category?.name || "Category"}
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
        <div
          className="grid grid-cols-2 gap-1 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-[1016px]"
          role={productsLoading ? "status" : undefined}
          aria-label={productsLoading ? "Loading products" : undefined}
          aria-busy={productsLoading || undefined}
        >
          {productsLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          {productsLoading && <span className="sr-only">Loading products…</span>}
        </div>
      </div>

      <section
        id="journal"
        aria-labelledby="journal-title"
        className="bg-white px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mx-auto max-w-[1016px]">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
            <h2
              id="journal-title"
              className="text-[24px] leading-tight tracking-[-0.055em] text-[#201e1c] sm:text-[27px]"
            >
              Our Articles
            </h2>
            <Link
              to={"/blogs"}
              className="shrink-0 text-[11px] font-medium text-[#383430] transition-colors hover:text-[#9d2532] sm:text-xs"
            >
              Read all articles{" "}
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogsLoading ? (
              <SkeletonGroup count={3} className="col-span-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                <BlogCardSkeleton />
              </SkeletonGroup>
            ) : blogArticles.map((article) => (
              <BlogCard key={article.slug} article={article} url="/blogs" />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-title"
        className="bg-[#fbfaf8] px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
          <div className="md:pt-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8b7966]">
              A few helpful answers
            </p>
            <h2
              id="faq-title"
              className="mt-4 max-w-sm font-serif text-[34px] font-normal leading-[1.08] tracking-[-0.035em] text-[#28231f] sm:text-[42px]"
            >
              Before you find your new favourite.
            </h2>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#746d65]">
              New to fragrance, or choosing a gift? Here are a few things people
              often ask us.
            </p>
          </div>

          <div className="border-t border-[#ded9d2]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article
                  key={faq.question}
                  className="border-b border-[#ded9d2]"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 py-[18px] text-left sm:py-5"
                    >
                      <span className="text-[13px] font-medium leading-5 text-[#292520] sm:text-[14px]">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative grid h-7 w-7 shrink-0 place-items-center text-[#766b60]"
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span
                          className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-xl pb-5 pr-8 text-[12px] leading-[1.8] text-[#746d65] sm:pb-6 sm:text-[13px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section aria-labelledby="how-to-use-title" className="mt-14">
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
      </section> */}
    </div>
  );
}

export default Home;
