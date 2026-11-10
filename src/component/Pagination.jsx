import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages]);
  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page);
  }

  const sortedPages = [...pages].sort((a, b) => a - b);
  return sortedPages.flatMap((page, index) => {
    if (index === 0) return [page];
    const previousPage = sortedPages[index - 1];
    return [...(page - previousPage > 1 ? ["ellipsis-" + page] : []), page];
  });
}

function Pagination({ currentPage, totalPages, onPageChange, className = "" }) {
  if (totalPages <= 1) return null;

  const pageItems = getPageItems(currentPage, totalPages);
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e8e4df] px-4 text-sm text-[#5c554e] transition hover:border-[#b59a7a] hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1.5" role="list" aria-label="Pages">
        {pageItems.map((page) =>
          typeof page === "string" ? (
            <span key={page} className="px-1 text-sm text-[#9a9188]" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => changePage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Go to page ${page}`}
              className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm transition ${
                page === currentPage
                  ? "bg-[#292521] font-medium text-white shadow-sm"
                  : "text-[#5c554e] hover:bg-[#f3f0ec]"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e8e4df] px-4 text-sm text-[#5c554e] transition hover:border-[#b59a7a] hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}

export default Pagination;
