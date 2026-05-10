"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useEngineStore } from "@/store/engineStore";
import { Plus, Minus } from "lucide-react";

export default function KineticLedger({ className = "w-96 flex flex-col" }: { className?: string }) {
  const { cart, cartTotal } = useEngineStore();
  const totalRef = useRef<HTMLDivElement>(null);

  // GSAP Odometer Effect
  useEffect(() => {
    if (totalRef.current) {
      gsap.to(totalRef.current, {
        innerHTML: cartTotal.toFixed(2),
        duration: 0.8,
        ease: "power2.out",
        snap: { innerHTML: 0.01 },
        onUpdate: function () {
          if (totalRef.current) {
            totalRef.current.innerText = `₹${Number(this.targets()[0].innerHTML).toFixed(2)}`;
          }
        }
      });
    }
  }, [cartTotal]);

  return (
    <div className={`bg-white border border-gray-200 rounded-3xl p-6 flex flex-col z-10 shadow-sm ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart</h2>

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative pr-2">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-gray-50 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium leading-tight">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.weight}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[#1b5e20] font-bold text-lg">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200">
                    <button 
                      onClick={() => useEngineStore.getState().updateCartItem(item, -1)}
                      className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-4 text-center text-gray-900 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => useEngineStore.getState().updateCartItem(item, 1)}
                      className="w-7 h-7 rounded-md bg-[#e8f5e9] flex items-center justify-center text-[#1b5e20] hover:bg-[#c8e6c9] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {cart.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Your cart is empty.
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-6 border-t border-gray-100 mt-auto">
        <div className="flex justify-between items-end mb-4">
          <span className="text-gray-500 font-medium">Total</span>
          <div ref={totalRef} className="text-3xl font-bold text-gray-900">₹0.00</div>
        </div>
        <button
          className="w-full bg-[#1b5e20] text-white py-4 rounded-xl font-bold hover:bg-[#124016] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.length === 0}
          onClick={() => { useEngineStore.getState().setKioskState('VERIFICATION'); }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
