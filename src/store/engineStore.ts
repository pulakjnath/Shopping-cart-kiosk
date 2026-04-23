import { create } from 'zustand';
import { Product } from '@/lib/mockData';

export type KioskState = 'IDLE' | 'NAVIGATING' | 'VERIFICATION' | 'GUARD_PASS';

export interface CartItem extends Product {
  quantity: number;
}

interface EngineState {
  kioskState: KioskState;
  currentAisle: string | null;
  cart: CartItem[];
  cartTotal: number;
  alerts: string[];
  lastAddedProduct: Product | null;
  recommendationsDismissed: boolean;

  // Actions
  setKioskState: (state: KioskState) => void;
  moveToAisle: (aisleId: string) => void;
  updateCartItem: (product: Product, quantityDelta: number) => void;
  triggerAlert: (message: string) => void;
  clearAlerts: () => void;
  resetEngine: () => void;
  dismissRecommendations: () => void;
}

export const useEngineStore = create<EngineState>((set, get) => ({
  kioskState: 'IDLE',
  currentAisle: 'entrance',
  cart: [],
  cartTotal: 0,
  alerts: [],
  lastAddedProduct: null,
  recommendationsDismissed: false,
  
  setKioskState: (state) => set({ kioskState: state }),
  
  moveToAisle: (aisleId) => set({ currentAisle: aisleId, kioskState: 'NAVIGATING' }),
  
  updateCartItem: (product, quantityDelta) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.id === product.id);
    const isNewItem = !existingItem && quantityDelta > 0;
    let newCart = [...cart];

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityDelta;
      if (newQuantity <= 0) {
        newCart = newCart.filter(item => item.id !== product.id);
      } else {
        newCart = newCart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item);
      }
    } else if (quantityDelta > 0) {
      newCart.push({ ...product, quantity: quantityDelta });
    }

    const newTotal = newCart.reduce((total, item) => total + (item.price * item.quantity), 0);

    set({
      cart: newCart,
      cartTotal: newTotal,
      currentAisle: product.aisleId,
      kioskState: 'NAVIGATING',
      // Only update recs when genuinely new product added
      ...(isNewItem && { lastAddedProduct: product, recommendationsDismissed: false }),
    });
  },

  dismissRecommendations: () => set({ recommendationsDismissed: true }),
  
  triggerAlert: (message) => set((state) => ({ alerts: [...state.alerts, message] })),
  
  clearAlerts: () => set({ alerts: [] }),
  
  resetEngine: () => set({
    kioskState: 'IDLE',
    currentAisle: 'entrance',
    cart: [],
    cartTotal: 0,
    alerts: [],
    lastAddedProduct: null,
    recommendationsDismissed: false,
  })
}));
