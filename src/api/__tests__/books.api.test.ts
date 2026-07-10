import {
  BookNotFoundError,
  fetchBookById,
  fetchBooks,
} from '../books.api';
import { MOCK_BOOKS } from '../mock/books.data';

describe('books.api', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a paginated list of books', async () => {
    const request = fetchBooks({ page: 1, limit: 20 });

    await jest.runAllTimersAsync();
    const result = await request;

    expect(result.books).toHaveLength(20);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.total).toBe(MOCK_BOOKS.length);
    expect(result.hasMore).toBe(true);
  });

  it('returns the next page of books', async () => {
    const request = fetchBooks({ page: 2, limit: 20 });

    await jest.runAllTimersAsync();
    const result = await request;

    expect(result.books[0]?.id).toBe('book-21');
    expect(result.hasMore).toBe(true);
  });

  it('filters books by query', async () => {
    const request = fetchBooks({ query: 'jane austen' });

    await jest.runAllTimersAsync();
    const result = await request;

    expect(result.total).toBeGreaterThan(0);
    expect(
      result.books.every((book) =>
        `${book.title} ${book.author}`.toLowerCase().includes('jane austen'),
      ),
    ).toBe(true);
  });

  it('fetches a book by id', async () => {
    const request = fetchBookById('book-1');

    await jest.runAllTimersAsync();
    const book = await request;

    expect(book.id).toBe('book-1');
    expect(book.title).toBeTruthy();
  });

  it('throws when a book is not found', async () => {
    const request = fetchBookById('missing-book');
    const assertion = expect(request).rejects.toBeInstanceOf(BookNotFoundError);

    await jest.runAllTimersAsync();
    await assertion;
  });
});
