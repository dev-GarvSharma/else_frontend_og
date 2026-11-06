import React from "react";
import ProductCard from "../component/ProductCard";
import bannerImage from "../assets/Else Perfume Collection in Gold.png";

function Home() {
  return (
    <div>
      <div>
        <img src={bannerImage} alt="Banner" className="w-full object-cover" />
      </div>

      <div className="my-10 px-6 sm:px-10 lg:px-12">
        <div className="text-center mt-5">
          <h2 className="text-3xl">
            Explore Our Fragrances
          </h2>
          <p className="mt-2 mb-5">
            Find your perfect scent by preference
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          {[...Array(9)].map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
