"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  X,
  CheckCircle2,
  ShoppingBasket,
  Lightbulb,
} from "lucide-react";
import { useEngineStore } from "@/store/engineStore";
import { mockProducts, Product } from "@/lib/mockData";
import { getRecommendations } from "@/lib/recommendations";

// ─── Mini product card used inside panel ────────────────────────────────────

function MiniCard({ product }: { product: Product }) {
  const { cart, updateCartItem } = useEngineStore();
  const qty = cart.find((i) => i.id === product.id)?.quantity ?? 0;

  return (
    <div className="flex-shrink-0 w-40 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">
          ₹{product.price.toFixed(2)}
        </span>
        {qty === 0 ? (
          <button
            onClick={() => updateCartItem(product, 1)}
            className="text-xs bg-[#f0f9f0] hover:bg-[#e8f5e9] text-[#1b5e20] font-semibold px-2 py-1 rounded-full transition-colors"
          >
            Add
          </button>
        ) : (
          <span className="text-xs bg-[#1b5e20] text-white font-bold px-2 py-1 rounded-full">
            ×{qty}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Alternative item row (with price-diff badge + icon) ────────────────────

function AltRow({
  product,
  source,
  type,
}: {
  product: Product;
  source: Product;
  type: "cheaper" | "pricier";
}) {
  const { cart, updateCartItem } = useEngineStore();
  const qty = cart.find((i) => i.id === product.id)?.quantity ?? 0;
  const diff = Math.abs(product.price - source.price).toFixed(2);
  const isCheaper = type === "cheaper";

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Thumb */}
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {product.name}
        </p>
        <p className="text-xs text-gray-400">{product.weight}</p>
        <div className="flex items-center gap-1.5 mt-1">
          {/* Price diff badge */}
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              isCheaper
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {isCheaper ? (
              <>
                <TrendingDown size={11} />
                Save ₹{diff}
              </>
            ) : (
              <>
                <TrendingUp size={11} />
                +₹{diff} premium
              </>
            )}
          </span>
        </div>
      </div>

      {/* Price + add */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className="text-sm font-bold text-gray-900">
          ₹{product.price.toFixed(2)}
        </span>
        {qty === 0 ? (
          <button
            onClick={() => updateCartItem(product, 1)}
            className="text-xs bg-[#f0f9f0] hover:bg-[#e8f5e9] text-[#1b5e20] font-semibold px-3 py-1 rounded-full transition-colors"
          >
            Add
          </button>
        ) : (
          <span className="text-xs bg-[#1b5e20] text-white font-bold px-2 py-1 rounded-full">
            ×{qty}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main panel ──────────────────────────────────────────────────────────────

const AUTO_DISMISS_MS = 8000;

export default function RecommendationPanel() {
  const lastAdded = useEngineStore((s) => s.lastAddedProduct);
  const dismissed = useEngineStore((s) => s.recommendationsDismissed);
  const dismiss = useEngineStore((s) => s.dismissRecommendations);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = !!lastAdded && !dismissed;

  // Auto-dismiss timer — reset whenever lastAdded changes
  useEffect(() => {
    if (!visible) return;
    timerRef.current = setTimeout(() => dismiss(), AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lastAdded, visible, dismiss]);

  const recs = lastAdded
    ? getRecommendations(lastAdded, mockProducts)
    : { similar: [], cheaper: [], pricier: [] };

  const hasAlts = recs.cheaper.length > 0 || recs.pricier.length > 0;
  const hasSimilar = recs.similar.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={lastAdded?.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="rounded-3xl border border-gray-100 bg-[#f8fbf8] shadow-sm overflow-hidden"
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-[#1b5e20]" />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  "{lastAdded?.name}" added to cart
                </p>
                <p className="text-xs text-gray-400">
                  You might also like these picks
                </p>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Dismiss recommendations"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 py-4 space-y-5">
            {/* ── Similar products ── */}
            {hasSimilar && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBasket size={15} className="text-[#1b5e20]" />
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    You may also like
                  </h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {recs.similar.map((p) => (
                    <MiniCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Alternatives ── */}
            {hasAlts && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={15} className="text-amber-500" />
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Alternatives
                  </h3>
                </div>
                <div className="space-y-2">
                  {recs.cheaper.map((p) => (
                    <AltRow
                      key={p.id}
                      product={p}
                      source={lastAdded!}
                      type="cheaper"
                    />
                  ))}
                  {recs.pricier.map((p) => (
                    <AltRow
                      key={p.id}
                      product={p}
                      source={lastAdded!}
                      type="pricier"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Auto-dismiss progress bar ── */}
          <div className="h-0.5 bg-gray-100 overflow-hidden">
            <motion.div
              key={lastAdded?.id + "-bar"}
              className="h-full bg-[#1b5e20]/40"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
