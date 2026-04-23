"use client";

import { motion } from "framer-motion";
import { useEngineStore } from "@/store/engineStore";
import { aisles } from "@/lib/mockData";

export default function StoreMap({ className = "w-full h-full" }: { className?: string }) {
  const currentAisleId = useEngineStore((state) => state.currentAisle);
  const targetAisle = aisles.find((a) => a.id === currentAisleId) || aisles[0];

  return (
    <div className={`relative bg-[#f8f9fa] border border-gray-200 rounded-3xl overflow-hidden shadow-inner ${className}`}>
      <svg 
        viewBox="0 0 600 400" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e9ecef" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Store Layout - Aisles */}
        {/* Produce Area */}
        <rect x="100" y="50" width="100" height="150" rx="8" fill="#e8f5e9" stroke="#81c784" strokeWidth="2" />
        <text x="150" y="125" textAnchor="middle" fill="#2e7d32" fontSize="14" fontWeight="bold">Produce</text>

        {/* Dairy Area */}
        <rect x="250" y="50" width="100" height="150" rx="8" fill="#e0f7fa" stroke="#4dd0e1" strokeWidth="2" />
        <text x="300" y="125" textAnchor="middle" fill="#00838f" fontSize="14" fontWeight="bold">Dairy</text>

        {/* Bakery Area */}
        <rect x="400" y="50" width="100" height="150" rx="8" fill="#fff3e0" stroke="#ffb74d" strokeWidth="2" />
        <text x="450" y="125" textAnchor="middle" fill="#e65100" fontSize="14" fontWeight="bold">Bakery</text>

        {/* Meat Area */}
        <rect x="100" y="220" width="100" height="80" rx="8" fill="#fbe9e7" stroke="#ff8a65" strokeWidth="2" />
        <text x="150" y="260" textAnchor="middle" fill="#d84315" fontSize="14" fontWeight="bold">Meat</text>

        {/* Entrance & Checkout */}
        <rect x="20" y="320" width="80" height="60" rx="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2" />
        <text x="60" y="355" textAnchor="middle" fill="#616161" fontSize="12" fontWeight="bold">Entrance</text>

        <rect x="480" y="320" width="100" height="60" rx="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2" />
        <text x="530" y="355" textAnchor="middle" fill="#616161" fontSize="12" fontWeight="bold">Checkout</text>

        {/* The Cart Indicator */}
        <motion.circle
          r="12"
          fill="#1b5e20"
          stroke="#ffffff"
          strokeWidth="3"
          initial={false}
          animate={{
            cx: targetAisle.svgCoordinates.x,
            cy: targetAisle.svgCoordinates.y,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1.2
          }}
        />
        
        {/* Pulsing ring around cart */}
        <motion.circle
          r="20"
          fill="none"
          stroke="#1b5e20"
          strokeWidth="2"
          initial={false}
          animate={{
            cx: targetAisle.svgCoordinates.x,
            cy: targetAisle.svgCoordinates.y,
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}
