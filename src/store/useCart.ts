import { create } from 'zustand';

// This defines what an item in our list looks like
export interface CartItem {
  id: string;
  name: string;
  quantity: string; 
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (newItem) => set((state) => ({ 
    // This adds the it  or updates item if it already exists
    items: [...state.items.filter(i => i.id !== newItem.id), newItem] 
  })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter((i) => i.id !== id) 
  })),
  clearCart: () => set({ items: [] }),
}));