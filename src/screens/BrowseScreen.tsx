import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { TFunction } from 'i18next';

import { useBooks, useScreenTitle } from '@/hooks';
import type { Book } from '@/types';

type BrowseBookListItemProps = {
  book: Book;
  onPress: (bookId: string) => void;
  t: TFunction;
};

type BrowseListFooterProps = {
  isLoading: boolean;
  t: TFunction;
};

type BrowseListEmptyProps = {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  t: TFunction;
};

function BrowseListEmpty({
  isLoading,
  error,
  onRetry,
  t,
}: BrowseListEmptyProps) {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  return <Text style={styles.emptyText}>{t('browse.empty')}</Text>;
}

function BrowseListFooter({ isLoading, t }: BrowseListFooterProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <ActivityIndicator />
      <Text style={styles.footerText}>{t('browse.loadMore')}</Text>
    </View>
  );
}

function BrowseBookListItem({ book, onPress, t }: BrowseBookListItemProps) {
  return (
    <Pressable onPress={() => onPress(book.id)} style={styles.card}>
      <Image
        resizeMode="cover"
        source={{ uri: book.coverUrl }}
        style={styles.cover}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{book.title}</Text>
        <Text style={styles.cardAuthor}>
          {t('bookDetails.byAuthor', { author: book.author })}
        </Text>
        <Text style={styles.cardPrice}>${book.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export function BrowseScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const { data, loading, error, refetch } = useBooks({ page });

  useScreenTitle('navigation.browse');

  useEffect(() => {
    if (!data?.books) {
      return;
    }

    setBooks(current =>
      data.page === 1 ? data.books : [...current, ...data.books],
    );
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (loading || !data?.hasMore) {
      return;
    }

    setPage(current => current + 1);
  }, [data?.hasMore, loading]);

  const handlePressBook = useCallback(
    (bookId: string) => {
      navigation.navigate('BookDetails', { bookId });
    },
    [navigation],
  );

  const handleRetry = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  const renderBookItem = useCallback<ListRenderItem<Book>>(
    ({ item }) => (
      <BrowseBookListItem book={item} onPress={handlePressBook} t={t} />
    ),
    [handlePressBook, t],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <BrowseListEmpty
        error={error}
        isLoading={loading}
        onRetry={handleRetry}
        t={t}
      />
    ),
    [error, handleRetry, loading, t],
  );

  return (
    <FlatList
      contentContainerStyle={[
        styles.list,
        books.length === 0 && styles.emptyContainer,
      ]}
      data={books}
      keyExtractor={item => item.id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={renderListEmptyComponent}
      ListFooterComponent={
        <BrowseListFooter isLoading={loading && books.length > 0} t={t} />
      }
      renderItem={renderBookItem}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
  },
  cover: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#ececec',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    marginTop: 24,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
