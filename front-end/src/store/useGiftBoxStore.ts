import { create } from "zustand";

import { Product } from "@/types";

interface GiftBoxState {
  currentStep: number;
  boxItems: Product[];
  totalPrice: number;
  setCurrentStep: (step: number) => void;
  addItemToBox: (product: Product) => void;
  removeItemFromBox: (productId: string) => void;
  resetBox: () => void;
}

export const useGiftBoxStore = create<GiftBoxState>((set) => ({
  currentStep: 1,
  boxItems: [],
  totalPrice: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  addItemToBox: (product: Product) =>
    set((state) => {
      // Prevent adding duplicates
      if (state.boxItems.some((item) => item.id === product.id)) {
        return state;
      }
      return {
        boxItems: [...state.boxItems, product],
        totalPrice: state.totalPrice + product.salePrice,
      };
    }),
  removeItemFromBox: (productId: string) =>
    set((state) => {
      const itemToRemove = state.boxItems.find((item) => item.id === productId);
      return {
        boxItems: state.boxItems.filter((item) => item.id !== productId),
        totalPrice: state.totalPrice - (itemToRemove?.salePrice || 0),
      };
    }),
  resetBox: () => set({ currentStep: 1, boxItems: [], totalPrice: 0 }),
}));
