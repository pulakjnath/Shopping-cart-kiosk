"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation } from "lucide-react";
import { useEngineStore } from "@/store/engineStore";
import { aisles } from "@/lib/mockData";

export default function RouteInfoPanel() {
  const navigatingTo = useEngineStore((s) => s.navigatingTo);
  const currentAisle = useEngineStore((s) => s.currentAisle);
  const clearNavigation = useEngineStore((s) => s.clearNavigation);

  const destAisle = aisles.find((a) => a.id === navigatingTo);
  const currentA = aisles.find((a) => a.id === currentAisle);

  // Estimate distance from coordinates
  const dx = (destAisle?.svgCoordinates.x ?? 0) - (currentA?.svgCoordinates.x ?? 0);
  const dy = (destAisle?.svgCoordinates.y ?? 0) - (currentA?.svgCoordinates.y ?? 0);
  const dist = Math.sqrt(dx * dx + dy * dy);
  const aisleDistance = Math.max(1, Math.round(dist / 120));

  return (
    <AnimatePresence>
      {navigatingTo && destAisle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 z-20 bg-white shadow-xl border border-gray-100 rounded-2xl p-4 w-64 overflow-hidden"
        >
          {/* Subtle colored accent edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: destAisle.color }}
          />

          <div className="pl-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <Navigation size={16} style={{ fill: destAisle.color, color: destAisle.color }} />
                <h3>{destAisle.name}</h3>
              </div>
              <button
                onClick={clearNavigation}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1 mb-3">
              ~{aisleDistance * 15} sec &middot; {aisleDistance} aisle{aisleDistance !== 1 ? 's' : ''} away
            </p>

            <button
              onClick={clearNavigation}
              className="w-full py-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors text-sm"
            >
              End Navigation
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
