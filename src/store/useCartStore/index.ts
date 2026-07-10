import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Book } from '@/types/book.types';
import type { CartItem, CartItems } from '@/types/cart.types';

type CartState = {
  items: CartItems;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
};

export function getCartItemCount(items: CartItems): number {
  return Object.values(items).reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalPrice(items: CartItems): number {
  return Object.values(items).reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: book => {
        const currentItem = get().items[book.id];

        set({
          items: {
            ...get().items,
            [book.id]: {
              book,
              quantity: currentItem ? currentItem.quantity + 1 : 1,
            },
          },
        });
      },
      removeItem: bookId => {
        const nextItems = { ...get().items };
        delete nextItems[bookId];
        set({ items: nextItems });
      },
      setQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }

        const currentItem = get().items[bookId];

        if (!currentItem) {
          return;
        }

        set({
          items: {
            ...get().items,
            [bookId]: {
              ...currentItem,
              quantity,
            },
          },
        });
      },
      clearCart: () => set({ items: {} }),
    }),
    {
      name: 'book-nook-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ items: state.items }),
    },
  ),
);

export type { CartItem };
