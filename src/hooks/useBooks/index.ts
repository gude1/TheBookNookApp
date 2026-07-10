import { useCallback, useEffect, useState } from 'react';

import { fetchBooks } from '@/api';
import type { AsyncState } from '@/types/async.types';
import type { PaginatedBooksResponse } from '@/types/book.types';

type UseBooksParams = {
  page: number;
  limit?: number;
  query?: string;
};

const initialState: AsyncState<PaginatedBooksResponse> = {
  data: null,
  loading: true,
  error: null,
};

export function useBooks({ page, limit = 20, query }: UseBooksParams) {
  const [state, setState] = useState<AsyncState<PaginatedBooksResponse>>(
    initialState,
  );
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setState(initialState);

    fetchBooks({ page, limit, query })
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
  }, [page, limit, query, reloadKey]);

  return {
    ...state,
    refetch,
  };
}
