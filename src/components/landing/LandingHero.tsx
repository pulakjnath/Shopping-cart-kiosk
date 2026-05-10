"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEngineStore } from "@/store/engineStore";

export default function LandingHero() {
  const startShopping = useEngineStore((s) => s.startShopping);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1b5e20]"
    >
      {/* Background Doodle Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/grocery_doodle.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      />

      <div className="relative z-10 text-center space-y-12">
        {/* Logo and Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
            <ShoppingCart size={48} className="text-white" />
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter">
            GROMUSE
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <p className="text-2xl text-white/90 font-light">
            Your smart grocery shopping starts here.
          </p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          <button
            onClick={startShopping}
            className="group relative inline-flex items-center gap-4 bg-white text-[#1b5e20] px-10 py-5 rounded-full font-bold text-2xl shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 cursor-pointer"
          >
            <div className="w-4 h-4 bg-[#1b5e20] rounded-full animate-pulse" />
            Begin Buying
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-50 scale-110 group-hover:scale-105 transition-all duration-300" />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
