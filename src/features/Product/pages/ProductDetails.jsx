import React, { useState } from "react";
import {
  BadgeCheck,
  BatteryFull,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Flower2,
  Gift,
  Heart,
  Leaf,
  Moon,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Sun,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Truck,
} from "lucide-react";
import { defaultProduct } from "../../../component/ProductCard";

const campaignImage =
  "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/268ec5e7-a4e2-43ea-0693-0d1aec196f00/campaign";
const bottleImage =
  "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g/2baeb436-d003-4cdf-5717-3e34c3515000/public";

const reviews = [
  {
    initials: "AH",
    name: "Avery H.",
    title: "A Classic for a Reason",
    body: "Honestly, Aventus is a classic for a reason. The combo of apple and pink pepper adds this nice fruity spice that's just so appealing. I get why people rave about it; it's rich but still approachable. Performance is strong too — it sticks around and projects well. Just feels luxurious every time I spray it. No regrets here!",
    tags: ["Strong Projection", "Warm", "Compliment Getter"],
  },
  {
    initials: "DT",
    name: "Daniel T.",
    title: "Kinda Overhyped, but Still Great",
    body: "Okay, don't get me wrong, Aventus smells amazing with that mix of black currant and birch. The projection is solid, but I feel like it's a bit too much at times. I mean, it's classy, but sometimes the type makes it feel less special. Still, I get the appeal and wear it for special occasions. Just not my daily jam.",
    tags: ["Elegant", "Unique", "Special Occasions"],
  },
  {
    initials: "CS",
    name: "Christopher S.",
    title: "Obsessed with This Scent",
    body: "Aventus is just wow! The fresh burst of bergamot and that hint of apple really grab you. It's like the perfect balance of fruity and smoky. I wear this to everything — work, dates, you name it. Seriously, compliments every time. Lasts ages too, like 8hrs with a decent projection. This is definitely a staple in my collection!",
    tags: ["Long Lasting", "Versatile", "Compliment Getter"],
  },
  {
    initials: "ED",
    name: "Emily D.",
    title: "Fresh & Versatile!",
    body: "I really love how fresh Aventus is! It starts off super bright with that lemon and bergamot, and then you get this cozy vibe from the cedarwood. It's perfect for daytime but totally works for nights too. It's like a chameleon fragrance. Lasts around 6 hours on me, which is decent. Would definitely recommend.",
    tags: ["Fresh", "Everyday Wear", "Versatile"],
  },
];

function Accord({ title, children, open = false, id, qa = false }) {
  const [expanded, setExpanded] = useState(open);
  return (
    <section
      className={`pd-accord ${qa ? "border-t !border-b-0 !m-0 !p-0 last:!border-b-0" : ""}`}
      id={id}
    >
      <button
        className={`pd-accord-title ${qa ? "!py-[13px] !text-[11px]" : ""}`}
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
          className={`min-h-0 overflow-hidden pd-accord-body ${qa ? "!text-[10px] !leading-[1.5] !text-[#666] [&>p]:!mb-[13px] [&>p]:!mt-0 [&>p]:!max-w-[760px]" : ""}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function Stars({ small = false }) {
  return <span className={`pd-stars ${small ? "small" : ""}`}>★★★★★</span>;
}

export default function ProductDetails() {
  const [size, setSize] = useState("2ml");
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [cart, setCart] = useState(false);
  const gallery = [campaignImage, bottleImage, campaignImage];
  const notes = defaultProduct.notes;
  const sizes = [
    { ml: "2ml", sprays: "30 SPRAYS", price: "€4.97/ml", amount: "€9.95" },
    { ml: "5ml", sprays: "75 SPRAYS", price: "€4.78/ml", amount: "€23.90" },
    { ml: "8ml", sprays: "120 SPRAYS", price: "€4.36/ml", amount: "€34.90" },
  ];
  return (
    <main className="product-page">
      <div className="pd-top-grid !items-stretch">
        <section
          className="pd-gallery !sticky !top-[82px] !h-max max-[800px]:!relative max-[800px]:!top-auto max-[800px]:!h-auto"
          aria-label="Product images"
        >
          <div className="pd-photo">
            <img
              src={gallery[slide]}
              alt="Creed Aventus perfume on a marble pedestal"
            />
            <span className="pd-bestseller !inline-flex !items-center !gap-[5px]">
              <TrendingUp size={12} /> Bestseller
            </span>
            <button
              className="pd-arrow left"
              aria-label="Previous image"
              onClick={() => setSlide((slide + 2) % 3)}
            >
              <ChevronLeft />
            </button>
            <button
              className="pd-arrow right"
              aria-label="Next image"
              onClick={() => setSlide((slide + 1) % 3)}
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
                <span className="!text-[10px]">{note.name}</span>
              </div>
            ))}
          </div>
          <div className="pd-metrics">
            <span className="!inline-flex !items-center !gap-[5px]">
              <Sparkles size={13} /> Projection <b>4.6</b>
            </span>
            <span className="!inline-flex !items-center !gap-[5px]">
              <BatteryFull size={13} /> Longevity <b>4.9</b>
            </span>
          </div>
        </section>
        <div className="pd-content-column min-w-0">
          <section className="pd-buy">
            <div className="pd-crumb">
              Perfumes / <b>Creed</b>
            </div>
            <div className="pd-name-row">
              <div>
                <h1>Aventus</h1>
                <div className="pd-rating">
                  <Stars /> <b>4.8</b> <a href="#reviews">(22,639 reviews)</a>
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
              <strong>
                {sizes.find((s) => s.ml === size)?.amount ?? "€129.00"}
              </strong>
              <del>
                {size === "2ml"
                  ? "€13.90"
                  : size === "5ml"
                    ? "€32.90"
                    : size === "8ml"
                      ? "€47.90"
                      : "€159.00"}
              </del>
              <span>Black Friday -28%</span>
            </div>
            <div className="pd-size-grid">
              {sizes.map((s) => (
                <button
                  key={s.ml}
                  onClick={() => setSize(s.ml)}
                  className={`pd-size ${size === s.ml ? "selected" : ""}`}
                >
                  <img src={bottleImage} alt="" />
                  <b>{s.ml}</b>
                  <small>{s.sprays}</small>
                  <small>{s.price}</small>
                  {s.ml === "8ml" && <em>MOST POPULAR</em>}
                </button>
              ))}
            </div>
            <button
              className={`pd-large-size ${size === "30ml" ? "selected" : ""}`}
              onClick={() => setSize("30ml")}
            >
              <img src={bottleImage} alt="" />
              <span>
                <b>30ml</b>
                <small>450 sprays</small>
              </span>
              <strong>€129.00</strong>
            </button>
            <p className="pd-delivery !inline-flex !items-center !gap-[5px]">
              <PackageCheck size={14} /> Ships tomorrow, 5 November
            </p>
            <button className="pd-add" onClick={() => setCart(true)}>
              <ShoppingBag size={15} />
              {cart ? "Added to Cart" : "Add to Cart"}
            </button>
            <div className="pd-bundle">
              <span className="pd-new">NEW</span>
              <span>
                <b>Bundle Aventus with 4 more</b>
                <small>Build a set of 5, save 10% + FREE travel case</small>
              </span>
              <ChevronRight size={15} />
              <div className="bundle-vials">▏▏▏▏▏</div>
            </div>
            <p className="pd-popular !inline-flex !items-center !gap-[5px]">
              <Flame size={14} /> This product was bought <b>1,125 times</b>{" "}
              this week
            </p>
            <h3 className="pd-promise-title">The Scento® Promise</h3>
            <div className="pd-promises">
              {[
                [
                  ShieldCheck,
                  "100% authenticity guarantee",
                  "Authentic fragrances from original full-sized bottles sourced through authorised European retailers.",
                ],
                [
                  Heart,
                  "30-day satisfaction guarantee",
                  "Not what you expected? We'll make it right, no questions.",
                ],
                [
                  Truck,
                  "Fast 1-day shipping",
                  "Tracked delivery to 26 supported European countries; rates vary by destination.",
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
            <Accord title="Reviews (22,639)" open id="reviews">
              <div className="pd-review-content">
                <div className="pd-score">
                  <strong>4.8</strong>
                  <Stars />
                  <small>22,639 reviews</small>
                </div>
                <div className="pd-bars">
                  {["5", "4", "3", "2", "1"].map((n, i) => (
                    <div key={n}>
                      <span>{n}</span>
                      <i>
                        <b
                          style={{ width: ["69%", "21%", "5%", "3%", "2%"][i] }}
                        />
                      </i>
                    </div>
                  ))}
                </div>
                {reviews.map((r) => (
                  <article className="pd-review" key={r.name}>
                    <div className="pd-avatar">{r.initials}</div>
                    <div className="pd-review-main">
                      <div className="pd-review-meta">
                        <b>{r.name}</b>
                        <span className="!inline-flex !items-center !gap-[3px]">
                          <BadgeCheck size={11} /> Verified Purchase
                        </span>
                        <small>
                          Gender: Other　|　Age: 18-24　|　October 30, 2025
                        </small>
                      </div>
                      <h4>{r.title}</h4>
                      <p>{r.body}</p>
                      <div className="pd-review-bottom">
                        <Stars small />
                        {r.tags.map((t) => (
                          <span className="pd-tag" key={t}>
                            {t}
                          </span>
                        ))}
                        <small>Was this review helpful?</small>
                        <button aria-label="Helpful">
                          <ThumbsUp size={12} />
                        </button>
                        <button aria-label="Not helpful">
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Accord>
            <section className="pd-accord pd-social">
              <h2>See What People Think</h2>
              <div className="pd-social-row !items-start">
                {[
                  "No more blind buys",
                  "Fits in my pocket",
                  "Packed for every trip",
                  "Always in my bag",
                  "My collection keeps growing",
                ].map((text, i) => (
                  <div
                    className={`pd-social-card tone-${i} !h-auto !w-[92px] !min-w-0 !flex-none !aspect-[9/16] !overflow-hidden !px-[7px] !py-[9px]`}
                    key={text}
                  >
                    <b>SCENTO</b>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </section>
            <Accord title="About This Scent" open>
              <p>
                Aventus by Creed is a fruity chypre fragrance for men from 2010,
                created by perfumers Jean-Christophe Hérault and Erwin Creed and
                built on a fruity, sweet and woody accord. Its top notes are
                bergamot, black currant, apple, pineapple and pink pepper; a
                bright, juicy opening. The heart notes bring together pineapple,
                patchouli and Moroccan jasmine.
              </p>
              <button className="pd-readmore">Read more⌄</button>
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
            <Accord title="How Users Experience" open>
              <p className="pd-label">Best time of day</p>
              <div className="pd-experience">
                {[
                  [Moon, "Evening", "1678 votes"],
                  [Sun, "Daytime", "5230 votes"],
                  [Clock3, "Night out", "1055 votes"],
                  [BriefcaseBusiness, "Office", "2512 votes"],
                ].map(([Icon, label, vote]) => (
                  <div key={label}>
                    <span className="!flex !h-[17px] !items-center !text-[#d9a733]">
                      <Icon className="!h-[14px] !w-[14px] !stroke-[1.65]" />
                    </span>
                    <b>{label}</b>
                    <small>{vote}</small>
                  </div>
                ))}
              </div>
              <p className="pd-label">Best season to wear</p>
              <div className="pd-experience">
                {[
                  [Leaf, "Fall", "2340 votes"],
                  [Snowflake, "Winter", "585 votes"],
                  [Flower2, "Spring", "4102 votes"],
                  [Sun, "Summer", "3611 votes"],
                ].map(([Icon, label, vote]) => (
                  <div key={label}>
                    <span className="!flex !h-[17px] !items-center !text-[#d9a733]">
                      <Icon className="!h-[14px] !w-[14px] !stroke-[1.65]" />
                    </span>
                    <b>{label}</b>
                    <small>{vote}</small>
                  </div>
                ))}
              </div>
              <p className="pd-label">Longevity</p>
              <div className="pd-experience wide">
                {[
                  "Very weak",
                  "Weak",
                  "Moderate",
                  "Long lasting",
                  "Eternal",
                ].map((x, i) => (
                  <div key={x}>
                    <span className="!flex !h-[17px] !items-center !text-[#d9a733]">
                      <BatteryFull className="!h-[14px] !w-[14px] !stroke-[1.65]" />
                    </span>
                    <b>{x}</b>
                    <small>{[51, 153, 1825, 5089, 3105][i]} votes</small>
                  </div>
                ))}
              </div>
              <p className="pd-label">Projection</p>
              <div className="pd-experience">
                {["Soft", "Moderate", "Strong", "Enormous"].map((x, i) => (
                  <div key={x}>
                    <span className="!flex !h-[17px] !items-center !text-[#d9a733]">
                      <Sparkles className="!h-[14px] !w-[14px] !stroke-[1.65]" />
                    </span>
                    <b>{x}</b>
                    <small>{[900, 4200, 5800, 2100][i]} votes</small>
                  </div>
                ))}
              </div>
            </Accord>
            <Accord title="Similar Scents">
              <div className="pd-similar">
                {[
                  ["Nishane", "Hacivat"],
                  ["Creed", "Aventus Cologne"],
                  ["Mancera", "Cedrat Boise"],
                  ["Afnan", "Supremacy Collector's Edition"],
                ].map(([brand, name], i) => (
                  <div key={name}>
                    <div className={`pd-scent-image shade-${i}`}>
                      <img src={bottleImage} alt="" />
                    </div>
                    <small>{brand}</small>
                    <b>{name}</b>
                  </div>
                ))}
              </div>
            </Accord>
          </div>
        </div>
      </div>
      <section className="pd-qa">
        <h2>
          Questions &amp; Answers <span>Creed Aventus</span>
        </h2>
        {[
          [
            "Are these perfumes authentic?",
            "Yes. Each Scento decant is hand-poured from an original full-sized bottle sourced through authorised European retailers — never a clone, dupe or inspired-by version. Manufacturer batch codes belong to those original bottles and are not printed on Scento decant vials.",
          ],
          [
            "What does Aventus smell like?",
            "Aventus opens with bright bergamot, black currant and pineapple, before settling into a smoky, woody base.",
          ],
          [
            "How long does Aventus last?",
            "Most users experience 7–9 hours of wear, depending on skin and conditions.",
          ],
          [
            "What's similar to Aventus?",
            "Try Aventus Cologne, Nishane Hacivat or Mancera Cedrat Boise.",
          ],
          [
            "Where can I buy Aventus samples?",
            "Choose your preferred size above and add it to your cart.",
          ],
        ].map(([q, a], i) => (
          <Accord key={q} title={q} open={i === 0} qa>
            <p>{a}</p>
          </Accord>
        ))}
      </section>
    </main>
  );
}
