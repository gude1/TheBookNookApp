import type { Book } from './book.types';

export type CartItem = {
  book: Book;
  quantity: number;
};

export type CartItems = Record<string, CartItem>;
