import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const baseBtnClasses =
    "inline-flex items-center justify-center h-9 w-9 text-sm font-medium border rounded-xl transition-all duration-150 select-none";
  const navBtnClasses =
    "inline-flex items-center justify-center gap-1.5 px-3 h-9 text-sm font-medium bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm transition-all";

  return (
    <div className="flex items-center justify-between w-full bg-white px-4 py-3 sm:px-6 rounded-xl border border-gray-100 shadow-sm select-none">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={navBtnClasses}
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={navBtnClasses}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Showing Page <span className="font-bold text-gray-700">{page}</span>{" "}
            of <span className="font-bold text-gray-700">{totalPages}</span>{" "}
            index pages
          </p>
        </div>

        <div>
          <nav
            className="inline-flex items-center gap-1.5"
            aria-label="Pagination"
          >
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="inline-flex items-center justify-center h-9 w-9 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm transition-all"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="inline-flex items-center justify-center h-9 w-9 text-xs font-bold text-gray-300"
                  >
                    •••
                  </span>
                );
              }

              const isCurrent = pageNum === page;
              return (
                <button
                  key={`page-btn-${pageNum}`}
                  onClick={() => onPageChange(pageNum as number)}
                  className={`${baseBtnClasses} ${
                    isCurrent
                      ? "bg-blue-600 border-blue-600 text-white font-bold shadow-sm shadow-blue-600/10"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50/80 hover:text-gray-900 shadow-sm"
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="inline-flex items-center justify-center h-9 w-9 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm transition-all"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
