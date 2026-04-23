"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useEngineStore } from "@/store/engineStore";

export default function BiometricPulse() {
  const kioskState = useEngineStore((state) => state.kioskState);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (kioskState === "VERIFICATION" && pulseRef.current) {
      // GSAP Pulse Animation
      const tl = gsap.timeline();
      tl.to(pulseRef.current, { scale: 1.5, opacity: 0.8, duration: 0.5, ease: "power2.out" })
        .to(pulseRef.current, { scale: 1, opacity: 0.2, duration: 0.5, ease: "power2.in" })
        .repeat(-1);
        
      return () => { tl.kill(); };
    }
  }, [kioskState]);

  if (kioskState !== "VERIFICATION") return null;

  return (
    <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div ref={pulseRef} className="absolute w-48 h-48 rounded-full border-2 border-[#00e5ff] opacity-20" />
        <div className="absolute w-32 h-32 rounded-full border-2 border-[#00e5ff] animate-ping" />
        <div className="w-24 h-24 bg-[#00e5ff]/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-[#00e5ff]/50">
          <span className="text-[#00e5ff] font-mono text-sm tracking-widest">SCANNING</span>
        </div>
      </div>
    </div>
  );
}
