"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEngineStore } from "@/store/engineStore";
import StoreMap from "@/components/map/StoreMap";
import { Plus, Minus, MapPin } from "lucide-react";

export default function CashCheckout() {
  const { kioskState, cart, cartTotal, updateCartItem, resetEngine, navigateTo, clearNavigation } = useEngineStore();

  useEffect(() => {
    if (kioskState === "CASH_CHECKOUT") {
      navigateTo("checkout");
    }
  }, [kioskState, navigateTo]);

  if (kioskState !== "CASH_CHECKOUT") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#f0f2f5] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#1b5e20]">
            <MapPin size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Head to Checkout</h1>
            <p className="text-sm text-gray-500">Follow the path on the map</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total to Pay</p>
          <p className="text-2xl font-black text-[#1b5e20]">₹{cartTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        <StoreMap className="w-full h-full rounded-none border-none" />
      </div>

      {/* Cart Strip Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col max-h-[35vh]"
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 shrink-0" />
        
        <div className="px-6 pb-2 shrink-0">
          <h2 className="font-bold text-gray-900">Your Cart</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl"
              >
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover mix-blend-multiply bg-white" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="font-bold text-[#1b5e20]">₹{item.price.toFixed(2)}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl shadow-sm border border-gray-100">
                  <button 
                    onClick={() => updateCartItem(item, -1)}
                    className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold w-4 text-center text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartItem(item, 1)}
                    className="w-7 h-7 rounded-lg bg-[#e8f5e9] flex items-center justify-center text-[#1b5e20] hover:bg-[#c8e6c9] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 pt-2 bg-white shrink-0 rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <button
            onClick={resetEngine}
            disabled={cartTotal === 0}
            className="w-full bg-[#1b5e20] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#124016] transition-colors disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
