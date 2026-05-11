"use client";

import { useEngineStore } from "@/store/engineStore";
import { Product } from "@/lib/mockData";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, updateCartItem, stockMap } = useEngineStore();
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const remaining = stockMap[product.id];

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all flex flex-col h-full ${remaining === 0 ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-md'}`}>
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
        
        <div className="flex items-center gap-2 mb-4">
          <p className="text-gray-500 text-sm">{product.weight}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
            remaining >= 10 ? 'bg-green-100 text-green-700' :
            remaining > 2 ? 'bg-amber-100 text-amber-700' :
            remaining > 0 ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-500'
          }`}>
            {remaining === 0 ? "Out of stock" : 
             remaining <= 2 ? `Only ${remaining} left` : 
             `${remaining} in stock`}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">₹{product.price.toFixed(2)}</span>
          
          {quantity === 0 ? (
            <button 
              onClick={() => updateCartItem(product, 1)}
              disabled={remaining <= 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                remaining <= 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#f0f9f0] hover:bg-[#e8f5e9] text-[#1b5e20] cursor-pointer'
              }`}
            >
              <Plus size={20} />
            </button>
          ) : (
            <div className="bg-[#1b5e20] text-white rounded-full flex items-center p-1 px-3 gap-3 h-10 shadow-sm">
              <button onClick={() => updateCartItem(product, -1)} className="hover:opacity-80 flex items-center justify-center h-full">
                <Minus size={16} />
              </button>
              <span className="font-bold text-sm min-w-[12px] text-center">{quantity}</span>
              <button 
                onClick={() => updateCartItem(product, 1)} 
                disabled={remaining <= 0}
                className={`flex items-center justify-center h-full ${remaining <= 0 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'}`}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
