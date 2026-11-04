import React from "react";

function Spark({ className, style }) {
  return <i aria-hidden="true" className={`fest-spark ${className}`} style={style} />;
}

function OfferMessage() {
  return (
    <span className="flex shrink-0 items-center justify-center gap-2 px-6 whitespace-nowrap text-[10px] sm:gap-4 sm:px-10 sm:text-[13px]">
      <span className="hidden font-semibold tracking-wide text-[#e7c9a4] sm:inline">Early Black Friday</span>
      <span className="font-medium">Up to 34% off</span>
      <span className="hidden h-4 w-px bg-white/20 sm:block" />
      <span className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[9px] sm:text-[10px]">Ends tonight <b className="ml-1 tabular-nums">05:56:34</b></span>
      <span className="flex items-center gap-1 underline decoration-white/40 underline-offset-4">Shop early <svg className="h-3 w-3" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 5h7.2M5.6 2.2 8.4 5 5.6 7.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </span>
  );
}

export default function FestiveBanner() {
  return (
    <a
      className="fest-slot relative flex min-h-[44px] w-full items-center overflow-hidden bg-transparent text-[#f9eee1]"
      data-fest-slot="black-november"
      href="/perfumes"
    >
      <span className="sr-only">Black Friday, a little early: up to 34% off</span>
      <span className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="fest-lacquer fest-light-a"><Spark className="fest-glint" style={{ "--delay": "-1s" }} /></span>
      </span>
      <span className="fest-marquee-window relative z-[1] flex min-w-0 flex-1 items-center overflow-hidden" aria-hidden="true">
        <span className="fest-marquee-track flex w-max items-center">
          <OfferMessage />
          <OfferMessage />
        </span>
      </span>
    </a>
  );
}
