import type { Book } from '@/types/book.types';

import {
  getCartItemCount,
  getCartTotalPrice,
  useCartStore,
} from './index';

const mockBook: Book = {
  id: 'book-1',
  title: 'The Silent Garden',
  author: 'Jane Austen',
  description: 'A captivating story.',
  price: 12.99,
  coverUrl: 'https://example.com/book-1.jpg',
  rating: 4.5,
  reviewCount: 120,
};

const mockBookTwo: Book = {
  ...mockBook,
  id: 'book-2',
  title: 'The Hidden Horizon',
  price: 9.99,
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: {} });
  });

  it('adds a new book to the cart', () => {
    useCartStore.getState().addItem(mockBook);

    expect(useCartStore.getState().items['book-1']).toEqual({
      book: mockBook,
      quantity: 1,
    });
  });

  it('increments quantity when adding the same book again', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBook);

    expect(useCartStore.getState().items['book-1'].quantity).toBe(2);
  });

  it('removes an item from the cart', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().removeItem('book-1');

    expect(useCartStore.getState().items).toEqual({});
  });

  it('updates item quantity', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().setQuantity('book-1', 3);

    expect(useCartStore.getState().items['book-1'].quantity).toBe(3);
  });

  it('removes an item when quantity is set to zero', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().setQuantity('book-1', 0);

    expect(useCartStore.getState().items).toEqual({});
  });

  it('calculates total item count and price', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBookTwo);

    const items = useCartStore.getState().items;

    expect(getCartItemCount(items)).toBe(3);
    expect(getCartTotalPrice(items)).toBeCloseTo(35.97);
  });

  it('clears the cart', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toEqual({});
  });
});
