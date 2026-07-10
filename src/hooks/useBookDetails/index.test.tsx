import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { fetchBookById } from '@/api';
import type { Book } from '@/types/book.types';

import { useBookDetails } from './index';

jest.mock('@/api', () => ({
  fetchBookById: jest.fn(),
}));

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

function ResultDisplay(props: ReturnType<typeof useBookDetails>) {
  return <>{JSON.stringify(props)}</>;
}

function TestBookDetails({ bookId }: { bookId: string }) {
  const result = useBookDetails(bookId);
  return <ResultDisplay {...result} />;
}

describe('useBookDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts in a loading state', () => {
    jest.mocked(fetchBookById).mockReturnValue(new Promise(() => {}));

    let tree: ReactTestRenderer.ReactTestRenderer;

    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<TestBookDetails bookId="book-1" />);
    });

    const output = tree!.root.findByType(ResultDisplay).props;
    expect(output.loading).toBe(true);
    expect(output.data).toBeNull();
    expect(output.error).toBeNull();
  });

  it('returns book data on success', async () => {
    jest.mocked(fetchBookById).mockResolvedValue(mockBook);

    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(<TestBookDetails bookId="book-1" />);
      await Promise.resolve();
    });

    const output = tree!.root.findByType(ResultDisplay).props;
    expect(output.loading).toBe(false);
    expect(output.data).toEqual(mockBook);
    expect(output.error).toBeNull();
  });

  it('returns an error when the request fails', async () => {
    jest
      .mocked(fetchBookById)
      .mockRejectedValue(new Error('Book with id "book-1" not found'));

    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(<TestBookDetails bookId="book-1" />);
      await Promise.resolve();
    });

    const output = tree!.root.findByType(ResultDisplay).props;
    expect(output.loading).toBe(false);
    expect(output.data).toBeNull();
    expect(output.error).toBe('Book with id "book-1" not found');
  });
});
