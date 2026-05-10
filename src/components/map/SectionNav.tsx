"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEngineStore } from "@/store/engineStore";
import { aisles, Aisle } from "@/lib/mockData";
import {
  Apple, Milk, Croissant, Beef, CreditCard, Fish, Wine, Beer,
  Coffee, Flower2, Sparkles, ShoppingCart, Snowflake, Package,
  Leaf, UtensilsCrossed, ChevronDown, LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Apple, Milk, Croissant, Beef, CreditCard, Fish, Wine, Beer,
  Coffee, Flower2, Sparkles, ShoppingCart, Snowflake, Package,
  Leaf, UtensilsCrossed,
};

// Fallback for icons not in map
const FallbackIcon = ({ size, style, className }: LucideProps) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: '#ddd', ...style }} className={className} />
);

type Category = 'fresh' | 'prepared' | 'dry' | 'general';
const categoryLabels: Record<Category, string> = {
  fresh: '🟢 Fresh',
  prepared: '🟠 Prepared',
  dry: '🟤 Dry',
  general: '⚪ General',
};

const categoryOrder: Category[] = ['fresh', 'prepared', 'dry', 'general'];

// Only show aisles with isNavigable=true, grouped by category
function getGroupedAisles(): Record<Category, Aisle[]> {
  const navAisles = aisles.filter(a => a.isNavigable);
  const groups: Record<Category, Aisle[]> = { fresh: [], prepared: [], dry: [], general: [] };
  navAisles.forEach(a => groups[a.category].push(a));
  return groups;
}

export default function SectionNav() {
  const navigatingTo = useEngineStore((s) => s.navigatingTo);
  const currentAisle = useEngineStore((s) => s.currentAisle);
  const navigateTo = useEngineStore((s) => s.navigateTo);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const groups = getGroupedAisles();

  const toggleGroup = (cat: string) => {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="relative flex flex-col w-28 lg:w-32 shrink-0 border-l border-gray-100 bg-white/70 backdrop-blur-md rounded-r-3xl overflow-hidden">
      <div className="px-2 pt-3 pb-1 text-center">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">
          Sections
        </span>
      </div>

      <div className="flex flex-col flex-1 gap-0 px-1.5 pb-2 overflow-y-auto">
        {categoryOrder.map((cat) => {
          const items = groups[cat];
          if (items.length === 0) return null;
          const isCollapsed = collapsed[cat];

          return (
            <div key={cat}>
              {/* Category header */}
              <button
                onClick={() => toggleGroup(cat)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>{categoryLabels[cat]}</span>
                <motion.div animate={{ rotate: isCollapsed ? -90 : 0 }} transition={{ duration: 0.15 }}>
                  <ChevronDown size={10} />
                </motion.div>
              </button>

              {/* Items */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {items.map((aisle) => {
                      const Icon = iconMap[aisle.icon] || FallbackIcon;
                      const isActive = navigatingTo === aisle.id;
                      const isCurrent = currentAisle === aisle.id && !navigatingTo;
                      const isTarget = isActive || isCurrent;

                      return (
                        <button
                          key={aisle.id}
                          onClick={() => navigateTo(aisle.id)}
                          className="relative w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-all duration-200 group"
                          style={{
                            background: isActive ? `${aisle.color}18` : isCurrent ? `${aisle.color}10` : 'transparent',
                          }}
                        >
                          {/* Active pill */}
                          {(isActive || isCurrent) && (
                            <motion.div
                              layoutId="nav-active-pill"
                              className="absolute inset-0 rounded-xl"
                              style={{ background: `${aisle.color}14` }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}

                          {/* Left accent */}
                          <motion.div
                            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                            animate={{
                              opacity: isActive ? 1 : 0,
                              scaleY: isActive ? 1 : 0.5,
                              backgroundColor: aisle.color,
                            }}
                            transition={{ duration: 0.2 }}
                          />

                          <Icon
                            size={16}
                            style={{ color: isTarget ? aisle.color : '#9ca3af' }}
                            className="transition-colors duration-200 group-hover:scale-110 transform"
                          />

                          <span
                            className="text-[8px] font-semibold text-center leading-tight transition-colors duration-200"
                            style={{ color: isTarget ? aisle.color : '#9ca3af' }}
                          >
                            {aisle.name.split(' ').slice(0, 2).join(' ')}
                          </span>

                          {/* Hover ring */}
                          <motion.div
                            className="absolute inset-0 rounded-xl border"
                            animate={{ opacity: 0, borderColor: aisle.color }}
                            whileHover={{ opacity: 0.4 }}
                            transition={{ duration: 0.15 }}
                          />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Checkout separator */}
        <div className="h-px bg-gray-100 my-1 mx-1" />
        {(() => {
          const checkout = aisles.find(a => a.id === 'checkout')!;
          const Icon = iconMap[checkout.icon] || FallbackIcon;
          const isActive = navigatingTo === checkout.id;
          const isCurrent = currentAisle === checkout.id && !navigatingTo;
          const isTarget = isActive || isCurrent;
          return (
            <button
              onClick={() => navigateTo(checkout.id)}
              className="relative w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-all duration-200 group"
              style={{ background: isActive ? `${checkout.color}18` : 'transparent' }}
            >
              <Icon size={16} style={{ color: isTarget ? checkout.color : '#9ca3af' }} />
              <span className="text-[8px] font-semibold" style={{ color: isTarget ? checkout.color : '#9ca3af' }}>
                Check-out
              </span>
            </button>
          );
        })()}
      </div>
    </div>
  );
}
