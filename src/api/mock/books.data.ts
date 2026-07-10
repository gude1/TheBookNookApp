import type { Book } from '@/types/book.types';

const AUTHORS = [
  'Jane Austen',
  'George Orwell',
  'Toni Morrison',
  'Haruki Murakami',
  'Chinua Achebe',
  'Virginia Woolf',
  'Gabriel Garcia Marquez',
  'Isaac Asimov',
];

const TITLE_PREFIXES = [
  'The Silent',
  'Last',
  'Hidden',
  'Broken',
  'Golden',
  'Midnight',
  'Forgotten',
  'Wild',
];

const TITLE_SUFFIXES = [
  'Garden',
  'Horizon',
  'Library',
  'Echo',
  'Compass',
  'Harbor',
  'Letters',
  'Season',
];

function createBook(index: number): Book {
  const id = `book-${index}`;
  const titlePrefix = TITLE_PREFIXES[index % TITLE_PREFIXES.length];
  const titleSuffix = TITLE_SUFFIXES[index % TITLE_SUFFIXES.length];

  return {
    id,
    title: `${titlePrefix} ${titleSuffix}`,
    author: AUTHORS[index % AUTHORS.length],
    description:
      'A captivating story that explores memory, courage, and the quiet moments that change everything.',
    price: Number((9.99 + (index % 20) * 1.5).toFixed(2)),
    coverUrl: `https://picsum.photos/seed/${id}/200/300`,
    rating: Number((3.5 + (index % 15) * 0.1).toFixed(1)),
    reviewCount: 20 + index * 3,
  };
}

export const MOCK_BOOKS: Book[] = Array.from({ length: 60 }, (_, index) =>
  createBook(index + 1),
);
