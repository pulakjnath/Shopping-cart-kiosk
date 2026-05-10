"use client";

import React from "react";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";
import RecommendationPanel from "@/components/recommendations/RecommendationPanel";
import { motion, AnimatePresence } from "framer-motion";
import { useEngineStore } from "@/store/engineStore";

export default function ProductGrid() {
  const { activeCategory, setActiveCategory, lastAddedProduct } = useEngineStore();

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredProducts = activeCategory === "All" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div id="products-section" className="w-full scroll-mt-24">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Popular Groceries</h2>
        <a href="#" className="text-[#1b5e20] font-medium hover:underline text-sm">See all</a>
      </div>

      <CategoryTabs activeCategory={activeCategory} onSelect={handleCategorySelect} />

      {/* Recommendation Panel - Moved outside grid to prevent empty spaces in rows */}
      <AnimatePresence mode="wait">
        {lastAddedProduct && (
          <motion.div 
            key={`rec-${lastAddedProduct.id}`}
            layout 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="w-full overflow-hidden mt-6"
          >
            <RecommendationPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <motion.div
              key={`product-${product.id}`}
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
