import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { fetchBooks } from '@/api';
import type { PaginatedBooksResponse } from '@/types/book.types';

import { useBooks } from './index';

jest.mock('@/api', () => ({
  fetchBooks: jest.fn(),
}));

const mockResponse: PaginatedBooksResponse = {
  books: [
    {
      id: 'book-1',
      title: 'The Silent Garden',
      author: 'Jane Austen',
      description: 'A captivating story.',
      price: 12.99,
      coverUrl: 'https://example.com/book-1.jpg',
      rating: 4.5,
      reviewCount: 120,
    },
  ],
  page: 1,
  limit: 20,
  total: 1,
  totalPages: 1,
  hasMore: false,
};

function ResultDisplay(props: ReturnType<typeof useBooks>) {
  return <>{JSON.stringify(props)}</>;
}

function TestBooks() {
  const result = useBooks({ page: 1 });
  return <ResultDisplay {...result} />;
}

describe('useBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts in a loading state', () => {
    jest.mocked(fetchBooks).mockReturnValue(new Promise(() => {}));

    let tree: ReactTestRenderer.ReactTestRenderer;

    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<TestBooks />);
    });

    const output = tree!.root.findByType(ResultDisplay).props;
    expect(output.loading).toBe(true);
    expect(output.data).toBeNull();
  });

  it('returns paginated books on success', async () => {
    jest.mocked(fetchBooks).mockResolvedValue(mockResponse);

    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(<TestBooks />);
      await Promise.resolve();
    });

    const output = tree!.root.findByType(ResultDisplay).props;
    expect(output.loading).toBe(false);
    expect(output.data).toEqual(mockResponse);
    expect(output.error).toBeNull();
  });
});
