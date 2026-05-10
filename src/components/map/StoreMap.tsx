"use client";

import { motion } from "framer-motion";
import { useEngineStore } from "@/store/engineStore";
import { aisles, categoryColors } from "@/lib/mockData";
import DirectionPath from "./DirectionPath";
import RouteInfoPanel from "./RouteInfoPanel";
import MapLegend from "./MapLegend";

export default function StoreMap({ className = "w-full h-full" }: { className?: string }) {
  const currentAisleId = useEngineStore((state) => state.currentAisle);
  const navigatingTo = useEngineStore((state) => state.navigatingTo);
  const navigationOrigin = useEngineStore((state) => state.navigationOrigin);
  const isPathVisible = useEngineStore((state) => state.isPathVisible);
  const clearNavigation = useEngineStore((state) => state.clearNavigation);
  const navigateTo = useEngineStore((state) => state.navigateTo);

  const targetAisle = aisles.find((a) => a.id === currentAisleId) || aisles.find(a => a.id === 'entrance')!;
  const destAisle = aisles.find((a) => a.id === navigatingTo);
  const pathColor = destAisle?.color ?? "#1b5e20";

  const showPath =
    isPathVisible &&
    navigationOrigin != null &&
    destAisle != null;

  const handleCartArrival = () => {
    // Keep path visible until manual clear or new selection
  };

  const handleZoneClick = (aisleId: string) => {
    const aisle = aisles.find(a => a.id === aisleId);
    if (aisle?.isNavigable) {
      navigateTo(aisleId);
      setTimeout(() => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 3000);
    }
  };

  return (
    <div className={`relative bg-[#faf5ef] border border-gray-200 rounded-3xl overflow-hidden shadow-inner ${className}`}>
      <RouteInfoPanel />
      <svg
        viewBox="-280 30 1055 530"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Store walls ── */}
        <rect x="45" y="40" width="720" height="510" rx="4" fill="none" stroke="#5d4037" strokeWidth="5" />

        {/* ── Floor ── */}
        <rect x="48" y="43" width="714" height="504" rx="2" fill="#faf5ef" />

        {/* ── Street Labels ── */}
        <text x="400" y="28" textAnchor="middle" fontSize="11" fill="#9e9e9e" fontWeight="600" letterSpacing="3">STORE DRIVE</text>
        <text x="22" y="300" textAnchor="middle" fontSize="10" fill="#9e9e9e" fontWeight="600" letterSpacing="2" transform="rotate(-90, 22, 300)">MARKET STREET</text>

        {/* ── Parking Area ── */}
        <rect x="-260" y="50" width="240" height="250" rx="8" fill="#f1f8f3" stroke="#4caf50" strokeWidth="3" />
        <text x="-140" y="180" textAnchor="middle" fontSize="16" fill="#4caf50" fontWeight="700" letterSpacing="2">PARKING</text>

        {/* ── Entrance gap in wall ── */}
        <rect x="42" y="388" width="8" height="76" fill="#faf5ef" />

        {/* ── Zone Rectangles ── */}
        {aisles.map((aisle) => {
          const { x, y, w, h } = aisle.svgRect;
          const fill = categoryColors[aisle.category];
          const isTarget = currentAisleId === aisle.id || navigatingTo === aisle.id;

          return (
            <g key={aisle.id} onClick={() => handleZoneClick(aisle.id)} style={{ cursor: aisle.isNavigable ? 'pointer' : 'default' }}>
              {/* Zone background */}
              <rect
                x={x} y={y} width={w} height={h} rx={5}
                fill={fill}
                stroke={isTarget ? aisle.color : '#bbb'}
                strokeWidth={isTarget ? 2.5 : 0.8}
                opacity={isTarget ? 1 : 0.85}
              />
              {/* Shelf lines (decorative) */}
              {w > 60 && h > 50 && (
                <>
                  {Array.from({ length: Math.min(Math.floor(h / 22), 4) }).map((_, i) => (
                    <rect
                      key={i}
                      x={x + 8} y={y + 18 + i * 18}
                      width={w - 16} height={3} rx={1}
                      fill={aisle.color} opacity={0.18}
                    />
                  ))}
                </>
              )}
              {/* Zone label */}
              <text
                x={x + w / 2} y={y + (h < 45 ? h / 2 + 4 : 16)}
                textAnchor="middle"
                fontSize={w < 80 ? 8 : h < 60 ? 9 : 11}
                fontWeight="bold"
                fill="#3e2723"
                style={{ pointerEvents: 'none', textTransform: 'uppercase' }}
              >
                {aisle.name}
              </text>
            </g>
          );
        })}



        {/* ── "You Are Here" star at Entrance ── */}
        <polygon
          points="110,410 113,418 122,418 115,423 117,432 110,427 103,432 105,423 98,418 107,418"
          fill="#ffc107" stroke="#ff8f00" strokeWidth="0.8"
        />
        <text x="110" y="445" textAnchor="middle" fontSize="7" fill="#e65100" fontWeight="bold">You Are Here</text>

        {/* ── Outdoor Seating (outside wall) ── */}
        <rect x="5" y="140" width="38" height="70" rx="4" fill="#e8f5e9" stroke="#a5d6a7" strokeWidth="0.5" />
        <text x="24" y="170" textAnchor="middle" fontSize="6" fill="#66bb6a">outdoor</text>
        <text x="24" y="180" textAnchor="middle" fontSize="6" fill="#66bb6a">seating</text>

        {/* ── Cart indicators (carts near entrance) ── */}
        <text x="70" y="365" textAnchor="middle" fontSize="7" fill="#9e9e9e">🛒 carts</text>

        {/* ── Direction Path ── */}
        {showPath && (
          <>
            <DirectionPath
              from={navigationOrigin!}
              to={destAisle!.svgCoordinates}
              color={pathColor}
              visible={isPathVisible}
              pathId="main-dir"
            />
            <circle cx={navigationOrigin!.x} cy={navigationOrigin!.y} r="8" fill="white" stroke={pathColor} strokeWidth="3" />
          </>
        )}

        {/* ── The Cart Indicator ── */}
        <motion.circle
          r="10"
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
            mass: 1.2,
          }}
          onAnimationComplete={handleCartArrival}
        />

        {/* Pulsing ring */}
        <motion.circle
          r="18"
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

        {/* ── Legend ── */}
        <MapLegend />
      </svg>
    </div>
  );
}
