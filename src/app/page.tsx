"use client";

import dynamic from "next/dynamic";
const StoreMap = dynamic(() => import("@/components/map/StoreMap"), { ssr: false });
import SectionNav from "@/components/map/SectionNav";
import KineticLedger from "@/components/ledger/KineticLedger";
import ProductGrid from "@/components/catalog/ProductGrid";
import GuardPass from "@/components/verification/GuardPass";
import PaymentTerminal from "@/components/verification/PaymentTerminal";
import CashCheckout from "@/components/verification/CashCheckout";
import LandingHero from "@/components/landing/LandingHero";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { useEngineStore } from "@/store/engineStore";
import { AnimatePresence } from "framer-motion";

export default function NebulaKiosk() {
  const [mounted, setMounted] = useState(false);
  const kioskState = useEngineStore(state => state.kioskState);
  const showNav = kioskState === 'IDLE' || kioskState === 'NAVIGATING';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f0f2f5]" />;
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans selection:bg-[#1b5e20]/20 relative pb-48">
      {/* Light Background Doodle */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/grocery_doodle_light.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      <AnimatePresence mode="wait">
        {kioskState === 'LANDING' ? (
          <LandingHero key="landing" />
        ) : (
          <main key="main" className="w-full px-2 lg:px-4 pt-4">
            
            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start relative">
              
              <div className="flex-1 space-y-8 min-w-0">
                {/* Top Map Card (Hero) */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Live Store Tracker</h2>
                    <span className="text-[#1b5e20] font-medium text-sm px-3 py-1 bg-[#e8f5e9] rounded-full">Gromuse Supermarket</span>
                  </div>
                  {/* Map + Section Nav side-by-side */}
                  <div className="h-[400px] w-full relative flex overflow-hidden rounded-2xl">
                    <div className="flex-1 relative min-w-0">
                      <StoreMap className="w-full h-full" />
                    </div>
                    <SectionNav />
                  </div>
                </section>

                {/* Catalog (Product Grid + Category Tabs) */}
                <section>
                  <ProductGrid />
                </section>
              </div>

              {/* Ledger */}
              <div className="w-full lg:w-96 sticky top-8 shrink-0">
                <KineticLedger className="w-full h-[calc(100vh-200px)]" />
              </div>
              
            </div>
            
            {/* Overlays */}
            <PaymentTerminal />
            <GuardPass />
            <CashCheckout />
          </main>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Pill */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1b5e20] text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-6 border border-white/10 transition-all duration-500 ease-in-out ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <span className="font-bold tracking-tight text-lg ml-2">Gromuse</span>
        
        {/* Search Pill */}
        <div className="flex items-center bg-white/10 rounded-full px-4 py-2 w-48 lg:w-64 transition-all focus-within:w-72 lg:focus-within:w-96 focus-within:bg-white/20">
          <Search size={18} className="text-white/60 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search groceries..." 
            /* TODO: Wire search state to engineStore */
            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-white/60" 
          />
        </div>

        <div className="flex items-center gap-4 border-l border-white/20 pl-4">
          <button className="hover:text-[#81c784] transition-colors">
            <User size={22} />
          </button>
        </div>
      </nav>

    </div>
  );
}
