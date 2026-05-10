"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Globe, X, Check, Loader2, Banknote } from "lucide-react";
import { useEngineStore } from "@/store/engineStore";

type PaymentMethod = "card" | "apple" | "google" | "cash" | null;
type Step = "select" | "processing" | "success";

const paymentOptions = [
  {
    id: "card" as PaymentMethod,
    label: "Credit / Debit Card",
    sub: "Visa, Mastercard, Amex",
    icon: CreditCard,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "apple" as PaymentMethod,
    label: "Apple Pay",
    sub: "Touch ID or Face ID",
    icon: Smartphone,
    color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    iconColor: "text-gray-800",
  },
  {
    id: "google" as PaymentMethod,
    label: "Google Pay",
    sub: "Pay with Google Wallet",
    icon: Globe,
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "cash" as PaymentMethod,
    label: "Cash at Counter",
    sub: "Pay at checkout booth",
    icon: Banknote,
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
];

export default function PaymentTerminal() {
  const kioskState = useEngineStore((s) => s.kioskState);
  const cartTotal = useEngineStore((s) => s.cartTotal);
  const setKioskState = useEngineStore((s) => s.setKioskState);
  const navigateTo = useEngineStore((s) => s.navigateTo);
  const resetEngine = useEngineStore((s) => s.resetEngine);

  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<PaymentMethod>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 'select') handleCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [step]);

  if (kioskState !== "VERIFICATION") return null;

  const handleSelect = (method: PaymentMethod) => {
    if (method === "cash") {
      navigateTo("checkout");
      setKioskState("CASH_CHECKOUT");
      return;
    }

    setSelected(method);
    setStep("processing");

    // Mock processing delay
    setTimeout(() => {
      setStep("success");
      // After success, go to receipt screen
      setTimeout(() => {
        setStep("select");
        setSelected(null);
        setKioskState("GUARD_PASS");
      }, 1800);
    }, 2200);
  };

  const handleCancel = () => {
    setStep("select");
    setSelected(null);
    setKioskState("IDLE");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#1b5e20] px-8 pt-8 pb-10 relative">
          <button
            onClick={handleCancel}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
          <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-wider">Gromuse Checkout</p>
          <p className="text-white text-5xl font-black">₹{cartTotal.toFixed(2)}</p>
          <p className="text-white/60 text-sm mt-2">Select your payment method</p>
        </div>

        {/* Body */}
        <div className="px-8 py-8 min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full space-y-3"
              >
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all text-left ${opt.color}`}
                  >
                    <div className={`p-2 rounded-xl bg-white shadow-sm ${opt.iconColor}`}>
                      <opt.icon size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
                      <p className="text-gray-500 text-xs">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                {/* Animated rings */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#1b5e20]/20"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border-4 border-[#1b5e20]/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
                  />
                  <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                    <Loader2 size={28} className="text-[#1b5e20] animate-spin" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Processing Payment…</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {selected === "card" ? "Contacting your bank" : selected === "apple" ? "Authenticating via Face ID" : "Connecting to Google Wallet"}
                  </p>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-24 h-24 bg-[#1b5e20] rounded-full flex items-center justify-center shadow-lg shadow-green-900/30"
                >
                  <Check size={44} className="text-white" strokeWidth={3} />
                </motion.div>
                <div>
                  <p className="font-black text-gray-900 text-2xl">Payment Approved!</p>
                  <p className="text-gray-500 text-sm mt-1">Generating your receipt…</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
