interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="flex gap-3 w-full md:w-1/2 justify-start md:justify-end items-center mt-3 md:mt-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
    {categories.map(cat => {
      const active = selectedCategory === cat;
      return (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-[13px] font-semibold whitespace-nowrap
            backdrop-blur-xl border transition-all flex-shrink-0
            ${active
              ? "bg-[#5A3A2E] text-white shadow-[0_10px_22px_rgba(90,58,46,0.45)]"
              : "bg-white/60 text-[#5A3A2E] border-white/40 hover:bg-white"
            }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
  );
};
