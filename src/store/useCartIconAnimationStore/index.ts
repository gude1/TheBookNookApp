import { create } from 'zustand';

type CartIconAnimationState = {
  bumpCount: number;
  resetBump: () => void;
  triggerBump: () => void;
};

export const useCartIconAnimationStore = create<CartIconAnimationState>(
  set => ({
    bumpCount: 0,
    resetBump: () => set({ bumpCount: 0 }),
    triggerBump: () => set(state => ({ bumpCount: state.bumpCount + 1 })),
  }),
);
