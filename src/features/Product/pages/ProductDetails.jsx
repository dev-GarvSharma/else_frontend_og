import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import {
  BriefcaseBusiness,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gift,
  Heart,
  Leaf,
  Moon,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  TrendingUp,
  Truck,
} from "lucide-react";

const defaultProduct = {
  brand: "ELSE",
  name: "Fragrance",
};

const campaignImage =
  "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/268ec5e7-a4e2-43ea-0693-0d1aec196f00/campaign";
const bottleImage =
  "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/2baeb436-d003-4cdf-5717-3e34c3515000/public";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

function Accord({ title, children, open = false, id, qa = false }) {
  const [expanded, setExpanded] = useState(open);
  return (
    <section
      className={`pd-accord ${qa ? "border-t !border-b-0 !m-0 !p-0 last:!border-b-0" : ""}`}
      id={id}
    >
      <button
        className={`pd-accord-title ${qa ? "!py-[13px] !text-[14px]" : ""}`}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        <ChevronDown
          className={`transition-[transform,color] duration-300 ease-[cubic-bezier(.2,.75,.25,1)] motion-reduce:transition-none ${expanded ? "rotate-180 text-[#222]" : "text-[#777]"}`}
          size={16}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity,transform] duration-[360ms] ease-[cubic-bezier(.2,.75,.25,1)] motion-reduce:transition-none ${expanded ? "[grid-template-rows:1fr] translate-y-0 opacity-100" : "[grid-template-rows:0fr] -translate-y-[5px] opacity-0"}`}
      >
        <div
          className={`min-h-0 overflow-hidden pd-accord-body ${qa ? "!text-[13px] !leading-[1.6] !text-[#666] [&>p]:!mb-[13px] [&>p]:!mt-0 [&>p]:!max-w-[760px]" : ""}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function Stars({ small = false, rating = 0 }) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(rating))));
  return (
    <span
      className={`pd-stars ${small ? "small" : ""}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </span>
  );
}

function ProductDetailsSkeleton() {
  const block = (className = "") => (
    <span className={`block animate-pulse rounded bg-[#e9e9e9] ${className}`} />
  );
  return (
    <main
      className="product-page pd-skeleton"
      aria-label="Loading product details"
      aria-busy="true"
    >
      <div className="pd-top-grid !items-stretch">
        <section
          className="pd-gallery !sticky !top-[60px] !h-max max-[800px]:!relative max-[800px]:!top-auto max-[800px]:!h-auto"
          aria-hidden="true"
        >
          <div className="pd-photo">{block("h-full w-full rounded-none")}</div>
          <div className="pd-note-strip gap-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="gap-2">
                {block("h-7 w-7 rounded-full")} {block("h-3 w-14")}
              </div>
            ))}
          </div>
          <div className="pd-metrics gap-3">
            {block("h-4 w-24")} {block("h-4 w-24")}
          </div>
        </section>
        <div className="pd-content-column min-w-0">
          <section className="pd-buy">
            {block("mb-3 h-4 w-32")}
            {block("mb-2 h-10 w-3/4")}
            {block("mb-6 h-4 w-40")}
            <div className="mb-4 flex items-center gap-3">
              {block("h-6 w-24")} {block("h-4 w-20")} {block("h-6 w-16")}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  className="flex min-h-[118px] flex-col items-center justify-center gap-2 rounded-lg border border-[#e9e9e9]"
                  key={item}
                >
                  {block("h-10 w-7")} {block("h-4 w-12")} {block("h-3 w-16")}
                </div>
              ))}
            </div>
            {block("mt-3 h-12 w-full")}
            {block("mt-3 h-12 w-full rounded-lg bg-[#171717]")}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div className="rounded-lg bg-[#f7f7f7] p-3" key={item}>
                  {block("mb-2 h-4 w-2/3")}
                  {block("h-3 w-full")}
                </div>
              ))}
            </div>
          </section>
          <div className="pd-right-lower mt-8 space-y-5">
            {[
              "Reviews",
              "See What People Think",
              "About This Scent",
              "Featured Notes",
              "Fragrance Profile",
            ].map((item) => (
              <section className="border-b border-[#e6e6e6] pb-4" key={item}>
                {block("mb-4 h-5 w-2/5")}
                {block("h-16 w-full")}
              </section>
            ))}
          </div>
        </div>
      </div>
      <section className="pd-qa" aria-hidden="true">
        {block("mb-5 h-6 w-3/4")}
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="border-t border-[#e5e5e5] py-4" key={item}>
            {block("h-4 w-full")}
          </div>
        ))}
      </section>
    </main>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [size, setSize] = useState("2ml");
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [cart, setCart] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const imageBase =
    import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:4000";
  const resolveImage = (path, fallback = bottleImage) => {
    if (!path) return fallback;
    if (/^(https?:)?\/\//i.test(path)) return path;
    return `${imageBase}${path.startsWith("/") ? "" : "/"}${path}`;
  };
  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);
    getProductById(id)
      .then((response) => {
        if (active) setProduct(response?.data?.data || null);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const productGallery = product?.images?.length
    ? product.images.map((image) => resolveImage(image.path))
    : [campaignImage, bottleImage, campaignImage];
  const notes = (product?.featureNotes || []).map((note) => ({
    name: note.text,
    image: resolveImage(note.image, ""),
  }));
  const activeVariants = (
    product?.variants?.filter((variant) => variant.active !== false) || []
  )
    .slice()
    .sort(
      (a, b) =>
        Number(a.options?.volumeMl || 0) - Number(b.options?.volumeMl || 0),
    );
  const toSize = (variant) => {
    const volume = variant.options?.volumeMl;
    const price = Number(variant.price) || 0;
    return {
      ml: `${volume || variant.sku || "Size"}ml`,
      sprays: variant.sprays ? `${variant.sprays} SPRAYS` : "",
      price: price && volume ? `${formatPrice(price / volume)}/ml` : "",
      amount: variant.price != null ? formatPrice(price) : "",
      originalAmount: variant.compareAtPrice
        ? formatPrice(variant.compareAtPrice)
        : "",
      image: resolveImage(variant.images?.[0] || product.images?.[0]?.path),
    };
  };
  const sizes = activeVariants.map(toSize);
  const selectedSize = sizes.find((item) => item.ml === size) || sizes[0];
  const selectedVariant = activeVariants.find(
    (variant) => toSize(variant).ml === selectedSize?.ml,
  );
  const gallery = selectedVariant?.images?.length
    ? selectedVariant.images.map((image) => resolveImage(image))
    : productGallery;
  const productName = product?.name || defaultProduct.name;
  const productBrand = product?.brand || defaultProduct.brand;
  const reviewCount = product?.reviewCount ?? 0;
  const productImage = gallery[slide % gallery.length] || selectedSize?.image || bottleImage;
  const productReviews = Array.isArray(product?.reviews) ? product.reviews : [];
  const reviewRatings = productReviews
    .map((review) => Number(review.rating))
    .filter((value) => Number.isFinite(value) && value >= 1 && value <= 5);
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) =>
    reviewRatings.length
      ? `${(reviewRatings.filter((value) => Math.round(value) === star).length / reviewRatings.length) * 100}%`
      : "0%",
  );
  const averageReviewRating = reviewRatings.length
    ? reviewRatings.reduce((sum, value) => sum + value, 0) /
      reviewRatings.length
    : null;
  const ratingValue = product?.ratingAverage ?? averageReviewRating;
  const hasRating = ratingValue != null && Number(ratingValue) > 0;
  const rating = hasRating ? Number(ratingValue).toFixed(1) : "New";
  const attributes = product?.attributes || {};
  const profileFacts = [
    [Moon, "Mood", attributes.mood],
    [BriefcaseBusiness, "Gender", attributes.gender],
    [Sparkles, "Intensity", attributes.intensity],
    [
      Leaf,
      "Season",
      Array.isArray(attributes.season)
        ? attributes.season.join(", ")
        : attributes.season,
    ],
    [
      Sun,
      "Occasion",
      Array.isArray(attributes.occasion)
        ? attributes.occasion.join(", ")
        : attributes.occasion,
    ],
    [Heart, "Personality", attributes.personality],
  ].filter(([, , value]) => value);
  const reels = (product?.reelsLinks || [])
    .filter(
      (reel) => typeof reel.url === "string" && /^https?:\/\//i.test(reel.url),
    )
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const faqs = product?.faqs?.length
    ? product.faqs.map(({ question, answer }) => [question, answer])
    : [
        [
          "Are these perfumes authentic?",
          "Every ELSE fragrance is sourced and quality checked before shipping.",
        ],
        [
          `What does ${productName} smell like?`,
          product?.description ||
            "Explore the fragrance notes above to discover this scent.",
        ],
        [
          "How long does this fragrance last?",
          "Wear time varies based on skin and conditions.",
        ],
      ];

  useEffect(() => {
    if (sizes.length && !sizes.some((item) => item.ml === size))
      setSize(sizes[0].ml);
  }, [product]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <ProductDetailsSkeleton />;
  if (loadError || !product)
    return (
      <main className="product-page" role="alert">
        Unable to load this product.
      </main>
    );
  return (
    <main className="product-page">
      <div className="pd-top-grid pd-page-enter !items-stretch">
        <section
          className="pd-gallery !sticky !top-[60px] !h-max max-[800px]:!relative max-[800px]:!top-auto max-[800px]:!h-auto"
          aria-label="Product images"
        >
          <div className="pd-photo">
            <img
              src={gallery[slide % gallery.length]}
              alt={`${productBrand} ${productName}`}
            />
            {product?.labelText && (
              <span className="pd-bestseller !inline-flex !items-center !gap-[5px]">
                <TrendingUp size={12} /> {product.labelText}
              </span>
            )}
            <button
              className="pd-arrow left"
              aria-label="Previous image"
              onClick={() =>
                setSlide((slide + gallery.length - 1) % gallery.length)
              }
            >
              <ChevronLeft />
            </button>
            <button
              className="pd-arrow right"
              aria-label="Next image"
              onClick={() => setSlide((slide + 1) % gallery.length)}
            >
              <ChevronRight />
            </button>
            <div className="pd-dots">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show image ${i + 1}`}
                  className={slide === i ? "active" : ""}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
          <div className="pd-note-strip">
            {notes.map((note) => (
              <div key={note.name}>
                <img
                  className="!h-[25px] !w-[25px] !object-contain"
                  src={note.image}
                  alt=""
                />
                <span className="!text-[12px]">{note.name}</span>
              </div>
            ))}
          </div>
          {!!profileFacts.length && (
            <div className="pd-metrics">
              {profileFacts.slice(0, 2).map(([Icon, label, value]) => (
                <span
                  className="!inline-flex !items-center !gap-[5px]"
                  key={label}
                >
                  <Icon size={13} /> {label} <b>{value}</b>
                </span>
              ))}
            </div>
          )}
        </section>
        <div className="pd-content-column min-w-0">
          <section className="pd-buy">
            <div className="pd-crumb">
              {product?.category?.name || "Perfumes"} / <b>{productBrand}</b>
            </div>
            <div className="pd-name-row">
              <div>
                <h1>{productName}</h1>
                <div className="pd-rating">
                  {hasRating && <Stars rating={rating} />} <b>{rating}</b>{" "}
                  <a href="#reviews">({reviewCount} reviews)</a>
                </div>
              </div>
              <button
                className="pd-heart"
                aria-label="Add to wishlist"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  fill={liked ? "#c44526" : "none"}
                  color={liked ? "#c44526" : "currentColor"}
                />
              </button>
            </div>
            <div className="pd-price">
              <strong>{selectedSize?.amount || "—"}</strong>
              {selectedSize?.originalAmount && (
                <del>{selectedSize.originalAmount}</del>
              )}
              {selectedSize?.originalAmount && (
                <span>
                  Save{" "}
                  {Math.round(
                    (1 -
                      Number(selectedSize.amount.replace(/[^\d.]/g, "")) /
                        Number(
                          selectedSize.originalAmount.replace(/[^\d.]/g, ""),
                        )) *
                      100,
                  )}
                  %
                </span>
              )}
            </div>
            <div className="pd-size-grid">
              {sizes.map((s) => (
                <button
                  key={s.ml}
                  onClick={() => {
                    setSize(s.ml);
                    setSlide(0);
                  }}
                  className={`pd-size ${size === s.ml ? "selected" : ""}`}
                >
                  <img src={s.image || productImage} alt="" />
                  <b>{s.ml}</b>
                  <small>{s.sprays}</small>
                  <small>{s.price}</small>
                </button>
              ))}
            </div>
            {product.deliveryMessage && (
              <p className="pd-delivery !inline-flex !items-center !gap-[5px]">
                <PackageCheck size={14} /> {product.deliveryMessage}
              </p>
            )}
            <button className="pd-add mt-5" onClick={() => setCart(true)}>
              <ShoppingBag size={15} />
              {cart ? "Added to Cart" : "Add to Cart"}
            </button>
            {product.bundleOffer && (
              <div className="pd-bundle">
                <span className="pd-new">NEW</span>
                <span>
                  <b>{product.bundleOffer.title || `Bundle ${productName}`}</b>
                  {product.bundleOffer.description && (
                    <small>{product.bundleOffer.description}</small>
                  )}
                </span>
                <ChevronRight size={15} />
                <div className="bundle-vials">▏▏▏▏▏</div>
              </div>
            )}
            {Number.isFinite(Number(product.weeklyPurchaseCount)) &&
              product.weeklyPurchaseCount != null && (
                <p className="pd-popular !inline-flex !items-center !gap-[5px]">
                  <Flame size={14} /> This product was bought{" "}
                  <b>
                    {Number(product.weeklyPurchaseCount).toLocaleString(
                      "en-IN",
                    )}{" "}
                    times
                  </b>{" "}
                  this week
                </p>
              )}
            <h3 className="pd-promise-title">The ELSE® Promise</h3>
            <div className="pd-promises">
              {[
                [
                  ShieldCheck,
                  "Authenticity guarantee",
                  "Authentic fragrances from original full-sized bottles sourced through authorised European retailers.",
                ],
                [
                  Heart,
                  "Customer satisfaction guarantee",
                  "Not what you expected? We'll make it right, no questions.",
                ],
                [
                  Truck,
                  "Tracked shipping",
                  "Shipping options and timing are shown at checkout.",
                ],
                [
                  Gift,
                  "Free mystery gift",
                  "Every order includes a complimentary fragrance sample, hand-picked for you.",
                ],
              ].map(([Icon, title, body]) => (
                <div key={title}>
                  <Icon className="!shrink-0 !text-[#e97b44]" size={17} />
                  <p>
                    <b>{title}</b>
                    <small>{body}</small>
                  </p>
                </div>
              ))}
            </div>
          </section>
          <div className="pd-right-lower">
            <Accord title={`Reviews (${reviewCount})`} open id="reviews">
              <div className="pd-review-content">
                <div className="pd-score">
                  <strong className={!hasRating ? "pd-score-new" : ""}>
                    {rating}
                  </strong>
                  {hasRating && <Stars rating={rating} />}
                  <small>{reviewCount} reviews</small>
                </div>
                <div className="pd-bars">
                  {["5", "4", "3", "2", "1"].map((n, i) => (
                    <div key={n}>
                      <span>{n}</span>
                      <i>
                        <b style={{ width: ratingDistribution[i] }} />
                      </i>
                    </div>
                  ))}
                </div>
                {productReviews.map((r) => (
                  <article className="pd-review" key={r.id}>
                    <div className="pd-avatar">
                      {(r.customerName || "")
                        .split(/\s+/)
                        .filter(Boolean)
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="pd-review-main">
                      <div className="pd-review-meta">
                        <b>{r.customerName}</b>
                        {r.createdAt && (
                          <small>
                            {new Date(r.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </small>
                        )}
                      </div>
                      <h4>{r.title}</h4>
                      <p>{r.body}</p>
                      <div className="pd-review-bottom">
                        {Number(r.rating) > 0 && (
                          <Stars small rating={r.rating} />
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Accord>
            {reels.length > 0 && (
              <Accord title="See What People Think">
                <div className="pd-social-row !items-start">
                  {reels.map((reel, i) => (
                    <a
                      className={`pd-social-card tone-${i % 5} !h-auto !w-[92px] !min-w-0 !flex-none !aspect-[9/16] !overflow-hidden !px-[7px] !py-[9px]`}
                      key={reel.id || reel.url}
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${productName} Instagram reel ${i + 1}`}
                    >
                      <b>ELSE</b>
                      <span>Watch this reel</span>
                    </a>
                  ))}
                </div>
              </Accord>
            )}
            <Accord title="About This Scent">
              <p>
                {product.description || `${productName} by ${productBrand}.`}
              </p>
            </Accord>
            <Accord title="Featured Notes">
              <div className="pd-note-cards">
                {notes.map((n) => (
                  <span
                    className="!inline-flex !items-center !gap-2"
                    key={n.name}
                  >
                    <img
                      className="!h-[27px] !w-[27px] !object-contain"
                      src={n.image}
                      alt=""
                    />
                    {n.name}
                  </span>
                ))}
              </div>
            </Accord>
            {profileFacts.length > 0 && (
              <Accord title="Fragrance Profile">
                <div className="pd-profile-grid">
                  {profileFacts.map(([Icon, label, value]) => (
                    <div key={label}>
                      <Icon size={16} aria-hidden="true" />
                      <span>{label}</span>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>
              </Accord>
            )}
            {Array.isArray(product.similarScents) &&
              product.similarScents.length > 0 && (
                <Accord title="Similar Scents">
                  <div className="pd-similar">
                    {product.similarScents.map((scent, i) => (
                      <div key={scent.id || scent.name}>
                        <div className={`pd-scent-image shade-${i % 4}`}>
                          <img src={resolveImage(scent.image)} alt="" />
                        </div>
                        {scent.brand && <small>{scent.brand}</small>}
                        <b>{scent.name}</b>
                      </div>
                    ))}
                  </div>
                </Accord>
              )}
          </div>
        </div>
      </div>
      <section className="pd-qa">
        <h2>
          Questions &amp; Answers{" "}
          <span>
            {productBrand} {productName}
          </span>
        </h2>
        {faqs.map(([q, a], i) => (
          <Accord key={q} title={q} qa>
            <p>{a}</p>
          </Accord>
        ))}
      </section>
      <button
        type="button"
        className={`pd-scroll-top ${showScrollTop ? "is-visible" : ""}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} />
      </button>
    </main>
  );
}
