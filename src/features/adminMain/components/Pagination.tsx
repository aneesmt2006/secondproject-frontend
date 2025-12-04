interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPrevious: () => void;
  goToNext: () => void;
  goToPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevious,
  goToNext,
  goToPage,
}: PaginationProps) => (
  <div className="px-6 py-4 border-t border-rose/20 flex items-center justify-center gap-2">
    <button
      onClick={goToPrevious}
      disabled={currentPage === 1}
      className="px-4 py-2 text-cocoa hover:bg-rose/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      Previous
    </button>
    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentPage === page
            ? 'bg-gradient-to-r bg-rose text-white'
            : 'text-cocoa hover:bg-rose/5'
        }`}
      >
        {page}
      </button>
    ))}
    {totalPages > 3 && <span className="px-2 text-cocoa">...</span>}
    <button
      onClick={goToNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 text-cocoa hover:bg-rose/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      Next
    </button>
  </div>
);

export default Pagination;