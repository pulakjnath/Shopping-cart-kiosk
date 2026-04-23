"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Popular Groceries</h2>
        <a href="#" className="text-[#1b5e20] font-medium hover:underline text-sm">See all</a>
      </div>

      <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
