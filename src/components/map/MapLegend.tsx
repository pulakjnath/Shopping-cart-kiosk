"use client";

import { categoryColors } from "@/lib/mockData";

const legendItems = [
  { label: "Fresh", color: categoryColors.fresh },
  { label: "Prepared", color: categoryColors.prepared },
  { label: "Dry", color: categoryColors.dry },
  { label: "General", color: categoryColors.general },
];

export default function MapLegend() {
  return (
    <g transform="translate(60, 470)">
      <rect x="0" y="0" width="105" height="68" rx="6" fill="white" fillOpacity="0.92" stroke="#bbb" strokeWidth="0.5" />
      {legendItems.map((item, i) => (
        <g key={item.label} transform={`translate(8, ${8 + i * 15})`}>
          <rect width="12" height="10" rx="2" fill={item.color} stroke="#999" strokeWidth="0.3" />
          <text x="16" y="9" fontSize="8" fill="#5d4037" fontWeight="600">{item.label}</text>
        </g>
      ))}
    </g>
  );
}
