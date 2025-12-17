
interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export const CategoryFilter = ({ selectedCategory, setSelectedCategory, categories }: CategoryFilterProps) => {

  return (
    <div className="w-full md:w-1/2 flex gap-3 overflow-x-auto pb-2 items-center md:justify-end scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200
            ${
              selectedCategory === category
                ? "bg-[#4B2E05] text-white shadow-lg  backdrop-blur-md border border-[#4B2E05]/10"
                : "bg-white/60 text-[#4B2E05] hover:bg-white/80 backdrop-blur-md shadow-sm border border-white/40"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
