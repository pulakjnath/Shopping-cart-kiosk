"use client";

import { useEngineStore } from "@/store/engineStore";
import { Product } from "@/lib/mockData";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, updateCartItem } = useEngineStore();
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Product Image */}
      <div className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center relative overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-[#1b5e20] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {quantity}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{product.weight}</p>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">₹{product.price.toFixed(2)}</span>
          
          {quantity === 0 ? (
            <button 
              onClick={() => updateCartItem(product, 1)}
              className="bg-[#f0f9f0] hover:bg-[#e8f5e9] text-[#1b5e20] w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus size={20} />
            </button>
          ) : (
            <div className="bg-[#1b5e20] text-white rounded-full flex items-center p-1 px-3 gap-3 h-10 shadow-sm">
              <button onClick={() => updateCartItem(product, -1)} className="hover:opacity-80 flex items-center justify-center h-full">
                <Minus size={16} />
              </button>
              <span className="font-bold text-sm min-w-[12px] text-center">{quantity}</span>
              <button onClick={() => updateCartItem(product, 1)} className="hover:opacity-80 flex items-center justify-center h-full">
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
