import React from "react";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import ProductCard from "../component/ProductCard";
import ProductFilter from "../component/ProductFilter";
import productsBanner from "../assets/Else_ More Than a Fragrance.png";

const imageBase = "https://imagedelivery.net/dTnWiVKich4PS2lEWud18g";

function note(name, image) {
  return { name, image: `${imageBase}/${image}/public` };
}

export const products = [
  {
    brand: "Creed",
    name: "Aventus",
    image: `${imageBase}/2baeb436-d003-4cdf-5717-3e34c3515000/public`,
    price: 999,
    originalPrice: 1390,
    discount: 28,
    rating: "4.8",
    projection: "4.6",
    longevity: "4.9",
    tags: ["Bestseller"],
    notes: [
      note("Bergamot", "bergamot"),
      note("Black Currant", "black_currant"),
      note("Pineapple", "pineapple"),
    ],
  },
  {
    brand: "Amouage",
    name: "Guidance",
    image: `${imageBase}/9d90f14b-034c-4240-f3fc-f58de3d25000/public`,
    price: 1290,
    originalPrice: 1890,
    discount: 32,
    rating: "4.8",
    projection: "4.8",
    longevity: "5.0",
    tags: ["Bestseller"],
    notes: [
      note("Pear", "pear"),
      note("Hazelnut", "hazelnut"),
      note("Osmanthus", "osmanthus"),
    ],
  },
  {
    brand: "Parfums de Marly",
    name: "Althaïr Exclusif",
    image: `${imageBase}/376238dd-d56b-4a8b-8b60-daa23d8adc00/public`,
    price: 1190,
    originalPrice: 1690,
    discount: 30,
    rating: "4.4",
    projection: "4.7",
    longevity: "4.9",
    tags: ["Bestseller", "Bold"],
    notes: [
      note("Saffron", "saffron"),
      note("Bergamot", "bergamot"),
      note("Amaretto", "amaretto"),
    ],
  },
  {
    brand: "Parfums de Marly",
    name: "Valaya",
    image: `${imageBase}/77cb905b-f24c-42fa-4d24-1edea5eb4700/public`,
    price: 1340,
    originalPrice: 1890,
    discount: 29,
    rating: "4.8",
    projection: "4.5",
    longevity: "4.8",
    tags: ["Bestseller"],
    notes: [
      note("Aldehydes", "aldehydes"),
      note("White Peach", "white_peach"),
      note("Orange Blossom", "orange_blossom"),
    ],
  },
  {
    brand: "Louis Vuitton",
    name: "Imagination",
    image: `${imageBase}/52121121-f082-4bb0-f198-87bdf3e78f00/public`,
    price: 1390,
    originalPrice: 1990,
    discount: 29,
    rating: "4.8",
    projection: "4.4",
    longevity: "4.7",
    tags: ["Bestseller"],
    notes: [
      note("Citron", "citron"),
      note("Bergamot", "calabrian_bergamot"),
      note("Neroli", "tunisian_neroli"),
    ],
  },
  {
    brand: "Scento",
    name: "Serica",
    image: `${imageBase}/serica-scento-bottle-1788950368/public`,
    price: 690,
    originalPrice: 990,
    discount: 30,
    rating: "4.6",
    projection: "4.8",
    longevity: "4.9",
    tags: ["Bestseller"],
    notes: [
      note("Coconut Milk", "coconut_milk"),
      note("Orange Blossom", "orange_blossom"),
      note("Jasmine", "jasmine"),
    ],
  },
  {
    brand: "Amouage",
    name: "Guidance 46",
    image: `${imageBase}/e8a4a478-0ee7-4e41-30fb-75a44f952400/public`,
    price: 1890,
    originalPrice: 2740,
    discount: 31,
    rating: "4.7",
    projection: "4.8",
    longevity: "5.0",
    tags: ["Bestseller"],
    notes: [
      note("Rose Water", "rose_water"),
      note("Pear", "pear"),
      note("Osmanthus", "osmanthus"),
    ],
  },
  {
    brand: "Maison Francis Kurkdjian",
    name: "Baccarat Rouge 540 Extrait",
    image: `${imageBase}/6efbb1d7-da54-4b3c-7758-806315718000/public`,
    price: 1790,
    originalPrice: 2590,
    discount: 31,
    rating: "4.7",
    projection: "4.7",
    longevity: "4.9",
    tags: ["Bestseller"],
    notes: [
      note("Bitter Almond", "bitter_almond"),
      note("Saffron", "saffron"),
      note("Jasmine", "egyptian_jasmine"),
    ],
  },
  {
    brand: "Essential Parfums",
    name: "Bois Impérial",
    image: `${imageBase}/aaf5498e-3629-4dfa-42d5-e3ec178b8c00/public`,
    price: 495,
    originalPrice: 690,
    discount: 30,
    rating: "4.2",
    projection: "4.8",
    longevity: "4.9",
    tags: ["Bestseller", "Bold"],
    notes: [
      note("Basil", "basil"),
      note("Sichuan Pepper", "sichuan_pepper"),
      note("Vetiver", "vetiver"),
    ],
  },
  {
    brand: "Louis Vuitton",
    name: "Ombre Nomade",
    image: `${imageBase}/6f1960e8-a067-4217-2378-36ae736ea200/public`,
    price: 1590,
    originalPrice: 2290,
    discount: 30,
    rating: "4.9",
    projection: "4.7",
    longevity: "5.0",
    tags: ["Bestseller"],
    notes: [
      note("Oud", "oud"),
      note("Raspberry", "raspberry"),
      note("Rose", "rose"),
    ],
  },
  {
    brand: "Amouage",
    name: "Love Hibiscus",
    image: `${imageBase}/ac0546c2-ed19-44ea-323c-4e6dbdd43000/public`,
    price: 1290,
    originalPrice: 1890,
    discount: 32,
    rating: "4.3",
    projection: "4.7",
    longevity: "4.8",
    tags: [],
    notes: [
      note("Bergamot", "bergamot"),
      note("Caramel", "caramel"),
      note("Frankincense", "frankincense"),
    ],
  },
  {
    brand: "Amouage",
    name: "Elsewhere",
    image: `${imageBase}/fe427461-4b18-41f2-90a4-c2e669e0c400/public`,
    price: 1390,
    originalPrice: 1990,
    discount: 30,
    rating: "4.3",
    projection: "4.8",
    longevity: "4.9",
    tags: [],
    notes: [
      note("Honey", "honey"),
      note("Apricot", "apricot"),
      note("Coffee", "coffee"),
    ],
  },
];

export default function Products() {
  return (
    <main className="bg-[#faf9f6] px-4 pb-20 pt-0 text-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px]">
        <section
          aria-label="Perfume collection banner"
          className="relative -mx-4 h-[440px] w-[calc(100%+2rem)] overflow-hidden bg-neutral-200 sm:-mx-6 sm:h-[400px] sm:w-[calc(100%+3rem)] md:h-[440px] lg:-mx-8 lg:h-[500px] lg:w-[calc(100%+4rem)] xl:h-[540px]"
        >
          <img
            src={productsBanner}
            alt="ELSE — More Than a Fragrance, A Lasting Impression"
            fetchPriority="high"
            className="h-full w-full object-cover object-[76%_center] sm:object-center"
          />
        </section>

        <div className="mt-8 flex items-start gap-6 sm:mt-12 lg:gap-8">
          <ProductFilter />
          <section className="min-w-0 flex-1" aria-label="Perfume products">
            <div className="mb-5 flex flex-col gap-4 border-y border-neutral-200 py-4 sm:sticky sm:top-[68px] sm:z-20 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:bg-[#faf9f6]/95 sm:backdrop-blur-md">
              <p className="text-sm text-neutral-600">
                <span className="sm:hidden">1,492 perfumes</span>
                <span className="hidden sm:inline">
                  Now browsing{" "}
                  <span className="font-medium text-neutral-900">1,492</span>{" "}
                  perfumes
                </span>
              </p>
              <ProductFilter compact />
              <div className="hidden items-center gap-3 lg:flex">
                <button
                  type="button"
                  className="h-10 rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-700 transition hover:border-neutral-500"
                >
                  Find My Scent
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-700 transition hover:border-neutral-500"
                >
                  <span>
                    Sort by:{" "}
                    <b className="font-medium text-neutral-900">Our Picks</b>
                  </span>
                  <ArrowDownUp size={15} />
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <div className="min-w-0 p-1" key={product.name}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-16 max-w-4xl border-t border-neutral-200 pt-8 text-sm leading-7 text-neutral-600 sm:mt-20">
          <h2 className="font-serif text-2xl text-neutral-900">
            Explore designer and niche perfume samples
          </h2>
          <p className="mt-3">
            Discover a curated selection of authentic fragrances from the
            world’s leading designer and niche houses. Every sample is poured
            from an original bottle, so you can try a scent before choosing a
            full-size fragrance.
          </p>
        </section>
      </div>
    </main>
  );
}
