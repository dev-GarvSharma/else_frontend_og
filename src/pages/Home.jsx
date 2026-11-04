import React from "react";
import ProductCard from "../component/ProductCard";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center bg-[#faf9f6] px-5 py-14 sm:py-20">
      <div className="mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[.22em] text-[#93684e]">
          The ELSE edit
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[#24211e] sm:text-4xl">
          Find your signature scent
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
}
