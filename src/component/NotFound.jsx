
import React from "react";
import { Link } from "react-router-dom";

const Perfume404 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent px-5 py-16">

      <div className="w-full max-w-lg text-center">
        {/* Perfume Bottle SVG */}
        <div className="mx-auto mb-9 w-32 h-40">
          <svg
            viewBox="0 0 120 160"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bottleGold404" x1="20" y1="0" x2="100" y2="150">
                <stop stopColor="#F2D7A8" />
                <stop offset=".5" stopColor="#A77A42" />
                <stop offset="1" stopColor="#E4C18C" />
              </linearGradient>
            </defs>

            {/* Cap */}
            <rect x="43" y="8" width="34" height="25" rx="3"
              fill="url(#bottleGold404)" />
            <path d="M48 14H72M48 20H72M48 26H72"
              stroke="#76512C" strokeWidth="1" />

            <rect x="38" y="33" width="44" height="13" rx="2"
              fill="#B58A53" />

            {/* Glass bottle */}
            <path
              d="M32 46H88L99 61V132C99 141 92 148 83 148H37C28 148 21 141 21 132V61L32 46Z"
              fill="#C6A16D" fillOpacity=".10"
              stroke="url(#bottleGold404)" strokeWidth="1.6"
            />

            {/* Glass reflections */}
            <path d="M27 67V125"
              stroke="#C49B66" strokeOpacity=".6"
              strokeWidth="2" strokeLinecap="round" />

            <path d="M93 67V125"
              stroke="#D5B47F" strokeOpacity=".5"
              strokeWidth="2" strokeLinecap="round" />

            {/* Label */}
            <rect x="32" y="78" width="56" height="43" rx="2"
              fill="#493629" stroke="#C6A16D" />

            <text x="60" y="99" textAnchor="middle"
              fill="#E9C995" fontFamily="Georgia"
              fontSize="17" letterSpacing="-1">
              ELSE
            </text>

            <path d="M48 105H72" stroke="#C6A16D" />

            <text x="60" y="113" textAnchor="middle"
              fill="#E9C995" fontSize="5"
              letterSpacing="1.5">
              PERFUME
            </text>
          </svg>
        </div>

        {/* Error Text */}
        <p className="text-[10px] font-medium tracking-[0.35em] text-[#A77A42] uppercase">
          404 — PAGE NOT FOUND
        </p>
        <p className="mt-5 text-sm text-[#8C8177]">
          This page doesn't exist, but beautiful things do.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-9 px-8 py-3.5 bg-[#493629] text-white text-[10px] tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#A77A42]"
        >
          <span>←</span>
          Back to Home
        </Link>

      </div>
    </main>
  );
};

export default Perfume404;
