"use client";

const categories = ["All", "Produce", "Dairy", "Bakery", "Meat"];

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mb-6">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
              isActive 
                ? "bg-[#1b5e20] text-white shadow-md" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
