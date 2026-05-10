"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface DirectionPathProps {
  from: Point;
  to: Point;
  color: string;
  visible: boolean;
  pathId?: string;
}

/** Orthogonal path from A to B (L-shaped) */
function buildOrthogonalPath(from: Point, to: Point): string {
  // We'll just route horizontally first, then vertically.
  // In a real app we might check for collision, but this gives the Google Maps indoor feel.
  const midX = to.x;
  const midY = from.y;
  return `M ${from.x} ${from.y} L ${midX} ${midY} L ${to.x} ${to.y}`;
}

/** Convert hex + alpha to rgba */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const CHEVRON_DELAYS = [0, 0.65, 1.3]; // seconds between flowing arrows

export default function DirectionPath({
  from,
  to,
  color,
  visible,
  pathId = "dir-path",
}: DirectionPathProps) {
  const pathData = buildOrthogonalPath(from, to);
  const glowId = `glow-${pathId}`;
  const markerId = `arrow-${pathId}`;
  const gradId = `grad-${pathId}`;

  // Skip rendering if origin == destination (cart already there)
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 20) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          key={pathId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
        >
          {/* ── Defs (filters, markers, gradient) ── */}
          <defs>
            {/* Glow blur filter */}
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrowhead marker */}
            <marker
              id={markerId}
              markerWidth="7"
              markerHeight="7"
              refX="3.5"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0,1 6,3.5 0,6"
                fill={color}
                opacity="0.9"
              />
            </marker>

            {/* Path for SMIL animateMotion reference */}
            <path id={pathId} d={pathData} />

            {/* Gradient stroke */}
            <linearGradient id={gradId} gradientUnits="userSpaceOnUse"
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}>
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* ── Layer 1: Ambient glow trail ── */}
          <motion.path
            d={pathData}
            stroke={hexAlpha(color, 0.18)}
            strokeWidth={12}
            strokeLinejoin="round"
            fill="none"
            filter={`url(#${glowId})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {/* ── Layer 2: Dashed draw line ── */}
          <motion.path
            d={pathData}
            stroke={`url(#${gradId})`}
            strokeWidth={4}
            strokeDasharray="0 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            markerEnd={`url(#${markerId})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* ── Layer 3: Flowing chevrons via SMIL animateMotion ── */}
          {CHEVRON_DELAYS.map((delay, i) => (
            <g key={i}>
              {/* Chevron shape — oriented automatically along curve */}
              <polygon points="0,-4 9,0 0,4" fill={color} opacity="0.85">
                <animateMotion
                  dur="1.8s"
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                  rotate="auto"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </polygon>
              {/* Subtle glow dot behind each chevron */}
              <circle r="5" fill={color} opacity="0.15">
                <animateMotion
                  dur="1.8s"
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                  rotate="auto"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* ── Destination pulse ring ── */}
          <motion.circle
            cx={to.x}
            cy={to.y}
            r={18}
            fill="none"
            stroke={color}
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ transformOrigin: `${to.x}px ${to.y}px` }}
          />

          {/* Destination dot */}
          <motion.circle
            cx={to.x}
            cy={to.y}
            r={5}
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          />
        </motion.g>
      )}
    </AnimatePresence>
  );
}
