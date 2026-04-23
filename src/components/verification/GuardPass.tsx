"use client";

import { useEngineStore } from "@/store/engineStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GuardPass() {
  const kioskState = useEngineStore((state) => state.kioskState);
  const cartTotal = useEngineStore((state) => state.cartTotal);
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (kioskState === "GUARD_PASS") {
      setHash(Math.random().toString(36).substring(2, 15).toUpperCase());
    }
  }, [kioskState]);

  if (kioskState !== "GUARD_PASS") return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-[#00ff41] flex flex-col items-center justify-center text-black overflow-hidden"
    >
      {/* Holographic Shimmer Overlay */}
      <div className="absolute inset-0 shimmer-hologram pointer-events-none mix-blend-overlay opacity-50" />
      
      <div className="relative z-10 text-center space-y-8 p-12 bg-black/5 backdrop-blur-md rounded-3xl border border-black/20 shadow-2xl">
        <h1 className="text-6xl font-black uppercase tracking-tighter">Verified</h1>
        
        <div className="w-64 h-64 bg-black mx-auto rounded-2xl flex items-center justify-center p-4">
          {/* Simulated QR Token */}
          <div className="w-full h-full border-4 border-[#00ff41] border-dashed animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold">Total Cleared: ${cartTotal.toFixed(2)}</p>
          <p className="font-mono text-sm opacity-80">TOKEN: {hash}-{Date.now().toString().slice(-6)}</p>
        </div>
        
        <p className="text-xl font-medium pt-8">Present this screen to the exit guard.</p>
      </div>
    </motion.div>
  );
}
