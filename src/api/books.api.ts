import type {
  Book,
  FetchBooksParams,
  PaginatedBooksResponse,
} from '@/types/book.types';

import { MOCK_BOOKS } from './mock/books.data';

export const API_DELAY_MS = 400;

export class BookNotFoundError extends Error {
  constructor(bookId: string) {
    super(`Book with id "${bookId}" not found`);
    this.name = 'BookNotFoundError';
  }
}

function delay(ms = API_DELAY_MS) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function filterBooks(query?: string) {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return MOCK_BOOKS;
  }

  return MOCK_BOOKS.filter((book) => {
    const haystack = `${book.title} ${book.author}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export async function fetchBooks(
  params: FetchBooksParams = {},
): Promise<PaginatedBooksResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const filteredBooks = filterBooks(params.query);
  const total = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const books = filteredBooks.slice(start, start + limit);

  await delay();

  return {
    books,
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
  };
}

export async function fetchBookById(bookId: string): Promise<Book> {
  await delay();

  const book = MOCK_BOOKS.find((item) => item.id === bookId);

  if (!book) {
    throw new BookNotFoundError(bookId);
  }

  return book;
}
