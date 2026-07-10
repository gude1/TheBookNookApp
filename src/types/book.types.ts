export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverUrl: string;
  rating: number;
  reviewCount: number;
};

export type PaginatedBooksResponse = {
  books: Book[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

export type FetchBooksParams = {
  page?: number;
  limit?: number;
  query?: string;
};
