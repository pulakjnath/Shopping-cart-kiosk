"use client";

import { useEngineStore } from "@/store/engineStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GuardPass() {
  const kioskState = useEngineStore((state) => state.kioskState);
  const cartTotal = useEngineStore((state) => state.cartTotal);
  const cart = useEngineStore((state) => state.cart);
  const resetEngine = useEngineStore((state) => state.resetEngine);
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
      className="fixed inset-0 z-50 bg-[#00ff41] flex flex-col items-center justify-center text-black overflow-hidden"
    >
      {/* Holographic Shimmer Overlay */}
      <div className="absolute inset-0 shimmer-hologram pointer-events-none mix-blend-overlay opacity-50" />
      
      <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-6 p-8 md:p-12 bg-black/5 backdrop-blur-md rounded-3xl border border-black/20 shadow-2xl max-h-[90vh] overflow-hidden w-11/12 max-w-lg">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Verified</h1>
        
        <div className="w-40 h-40 md:w-56 md:h-56 bg-white mx-auto rounded-2xl flex items-center justify-center p-4">
          {/* Simulated QR Token */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GROMUSE-RECEIPT" alt="QR Code" className="w-full h-full object-contain" />
        </div>
        
        <div className="w-full text-left bg-white text-[#0F172A] p-5 rounded-xl shadow-inner font-mono text-sm mt-4">
          <div className="border-b border-dashed border-gray-300 pb-2 mb-2 text-center">
            <p className="font-bold">GROMUSE RECEIPT</p>
            <p className="text-xs text-[#475569]">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1 pr-2 scrollbar-thin">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="truncate pr-2 text-[#475569]">
                  {item.quantity}x {item.name}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-300 mt-2 pt-2 flex justify-between font-bold">
            <span>TOTAL CLEARED</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="text-center mt-3 pt-2 border-t border-gray-100 text-xs text-[#475569] opacity-80">
            TOKEN: {hash}-{Date.now().toString().slice(-6)}
          </div>
        </div>
        
        <p className="text-lg md:text-xl font-medium pt-2">Present this screen to the exit guard.</p>
        
        <button
          onClick={resetEngine}
          className="mt-4 px-8 py-3 bg-black text-[#00ff41] font-bold rounded-full uppercase tracking-wider hover:bg-gray-900 transition-colors shadow-lg"
        >
          Done
        </button>
      </div>
    </motion.div>
  );
}
