import React from "react";
import { Star } from "lucide-react";

function SkeletonBar({ className = "" }) {
  return <span className={`block animate-pulse rounded bg-neutral-200/80 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="group relative isolate flex min-h-[326px] w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white p-2 text-neutral-900 shadow-sm transition-[box-shadow,transform] duration-200 ease-out before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_#d9d9d9,inset_0_0_0_4px_#fff] sm:min-h-[498px] sm:rounded-xl sm:p-3 md:min-h-[651px] md:rounded-2xl md:p-4 lg:min-h-[601px]"
    >
      <SkeletonBar className="pointer-events-none absolute bottom-[70%] left-0 -z-10 h-[404px] w-full scale-x-[2] rounded-none bg-neutral-200/50 blur-xl" />
      <div className="relative flex w-full flex-1 flex-col rounded-lg focus:outline-none sm:rounded-none">
        <div className="absolute left-0 top-1 z-10 flex flex-col items-start gap-1 sm:top-0 sm:gap-2">
          <SkeletonBar className="h-[22px] w-28 rounded-br-lg rounded-tl-md sm:h-[27px] sm:w-36" />
          <SkeletonBar className="h-6 w-20 rounded-full" />
        </div>
        <SkeletonBar className="absolute right-1 top-1 z-20 h-8 w-8 rounded-full" />

        <div className="relative mx-auto mb-3 mt-12 flex h-32 w-full items-center justify-center sm:mb-4 sm:mt-12 sm:h-40 md:mb-6 md:mt-14 md:h-56">
          <div className="flex h-full w-full items-center justify-center bg-white [mix-blend-mode:multiply]">
            <span className="relative flex h-[82%] w-[38%] max-w-[112px] flex-col items-center justify-start">
              <SkeletonBar className="h-[13%] w-[38%] rounded-t-sm rounded-b-[2px]" />
              <SkeletonBar className="h-[78%] w-full rounded-[18%_18%_22%_22%] border border-neutral-300/70" />
              <SkeletonBar className="h-[7%] w-[72%] rounded-b-md" />
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <SkeletonBar className="h-3 w-16" />
          <SkeletonBar className="mt-2 h-5 w-3/4" />
        </div>

        <div className="flex justify-center py-2 sm:py-3 md:pb-4 md:pt-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={14} className="animate-pulse fill-neutral-200 text-neutral-200" aria-hidden="true" />
              ))}
            </span>
            <SkeletonBar className="h-3 w-5" />
          </div>
        </div>

        <div className="hidden flex-wrap justify-center gap-2 sm:flex sm:gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-1 flex h-8 items-end justify-center md:h-10">
                <SkeletonBar className="h-7 w-7 md:h-9 md:w-9" />
              </div>
              <SkeletonBar className="h-8 w-12" />
            </div>
          ))}
        </div>

        <div className="hidden w-full grid-cols-2 gap-2 py-2 sm:grid sm:gap-3 sm:py-3 md:py-5">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="flex items-center justify-center gap-1.5">
              <SkeletonBar className="h-5 w-5 rounded-full" />
              <SkeletonBar className="h-3 w-14" />
              <SkeletonBar className="h-5 w-7 rounded-full" />
            </div>
          ))}
        </div>

        <div className="mt-auto flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-2 sm:min-h-12">
          <SkeletonBar className="h-3 w-7 rounded-sm bg-white/25" />
          <SkeletonBar className="h-3 w-10 rounded-sm bg-white/35" />
          <SkeletonBar className="h-3 w-12 rounded-sm bg-white/65" />
        </div>
      </div>
    </article>
  );
}

export function BlogCardSkeleton() {
  return (
    <article aria-hidden="true" className="group min-w-0">
      <div className="relative aspect-[1.4/1] overflow-hidden rounded-[14px] bg-[#eee8df] shadow-[0_3px_10px_rgba(31,24,18,0.08)]">
        <SkeletonBar className="h-full w-full rounded-none" />
      </div>
      <SkeletonBar className="mt-3.5 h-5 w-[92%]" />
      <SkeletonBar className="mt-2 h-5 w-[68%]" />
      <SkeletonBar className="mt-2.5 h-3 w-28" />
    </article>
  );
}

export function CategorySkeleton() {
  return (
    <div aria-hidden="true" className="flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 px-1 text-center">
      <span className="relative grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-[0_5px_16px_rgba(69,42,25,0.12)] ring-2 ring-[#e7dfd5] ring-offset-2 ring-offset-[#fffaf4]">
        <span className="grid h-[64px] w-[64px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,#fffefb_0%,#f8ead4_100%)]">
          <SkeletonBar className="h-7 w-7 rounded-full" />
        </span>
        <SkeletonBar className="absolute -bottom-1 h-4 w-16 rounded-full" />
      </span>
      <SkeletonBar className="mt-1 h-3 w-14" />
    </div>
  );
}

export function SkeletonGroup({ count, children, className = "" }) {
  return (
    <div className={className} aria-label="Loading content" aria-busy="true" role="status">
      {Array.from({ length: count }, (_, index) => React.cloneElement(children, { key: index }))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
