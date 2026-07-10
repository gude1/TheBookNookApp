import { useCallback, useEffect, useState } from 'react';

import { fetchBookById } from '@/api';
import type { AsyncState } from '@/types/async.types';
import type { Book } from '@/types/book.types';

const initialState: AsyncState<Book> = {
  data: null,
  loading: true,
  error: null,
};

export function useBookDetails(bookId: string) {
  const [state, setState] = useState<AsyncState<Book>>(initialState);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setState(initialState);

    fetchBookById(bookId)
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error.message,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [bookId, reloadKey]);

  return {
    ...state,
    refetch,
  };
}
