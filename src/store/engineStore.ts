import { create } from 'zustand';
import { aisles, mockProducts } from '@/lib/mockData';
import { Product } from '@/lib/mockData';

const initialStockMap = mockProducts.reduce((acc, p) => {
  acc[p.id] = p.stock;
  return acc;
}, {} as Record<string, number>);

export type KioskState = 'LANDING' | 'IDLE' | 'NAVIGATING' | 'VERIFICATION' | 'GUARD_PASS' | 'CASH_CHECKOUT';

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
  activeCategory: string;
  stockMap: Record<string, number>;

  // Navigation direction state
  navigatingTo: string | null;
  navigationOrigin: { x: number; y: number } | null;
  isPathVisible: boolean;

  // Actions
  startShopping: () => void;
  setKioskState: (state: KioskState) => void;
  setActiveCategory: (category: string) => void;
  moveToAisle: (aisleId: string) => void;
  navigateTo: (aisleId: string) => void;
  clearNavigation: () => void;
  updateCartItem: (product: Product, quantityDelta: number) => void;
  triggerAlert: (message: string) => void;
  clearAlerts: () => void;
  resetEngine: () => void;
  dismissRecommendations: () => void;
}

export const useEngineStore = create<EngineState>((set, get) => ({
  kioskState: 'LANDING',
  currentAisle: 'entrance',
  cart: [],
  cartTotal: 0,
  alerts: [],
  lastAddedProduct: null,
  recommendationsDismissed: false,
  activeCategory: 'All',
  stockMap: { ...initialStockMap },

  // Navigation direction state
  navigatingTo: null,
  navigationOrigin: null,
  isPathVisible: false,

  startShopping: () => set({ kioskState: 'IDLE' }),
  setKioskState: (state) => set({ kioskState: state }),
  setActiveCategory: (category) => set({ activeCategory: category }),

  moveToAisle: (aisleId) => set({ currentAisle: aisleId, kioskState: 'NAVIGATING' }),

  navigateTo: (aisleId) => {
    const { currentAisle, navigatingTo } = get();
    // No-op if already navigating to same aisle
    if (navigatingTo === aisleId) return;
    const target = aisles.find(a => a.id === aisleId);
    // Snapshot current cart position as origin
    const originAisle = aisles.find(a => a.id === currentAisle);
    const origin = originAisle?.svgCoordinates ?? null;
    set({
      navigatingTo: aisleId,
      navigationOrigin: origin,
      isPathVisible: true,
      currentAisle: aisleId,
      kioskState: 'NAVIGATING',
    });
  },

  clearNavigation: () => set({
    navigatingTo: null,
    navigationOrigin: null,
    isPathVisible: false,
  }),

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
      kioskState: get().kioskState === 'CASH_CHECKOUT' ? 'CASH_CHECKOUT' : 'NAVIGATING',
      // Only update recs when genuinely new product added
      ...(isNewItem && { lastAddedProduct: product, recommendationsDismissed: false }),
      stockMap: {
        ...get().stockMap,
        [product.id]: get().stockMap[product.id] - quantityDelta
      }
    });
  },

  dismissRecommendations: () => set({ recommendationsDismissed: true }),

  triggerAlert: (message) => set((state) => ({ alerts: [...state.alerts, message] })),

  clearAlerts: () => set({ alerts: [] }),

  resetEngine: () => set({
    kioskState: 'LANDING',
    currentAisle: 'entrance',
    cart: [],
    cartTotal: 0,
    alerts: [],
    lastAddedProduct: null,
    recommendationsDismissed: false,
    activeCategory: 'All',
    navigatingTo: null,
    navigationOrigin: null,
    isPathVisible: false,
    stockMap: { ...initialStockMap },
  })
}));
