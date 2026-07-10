import { useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { useTranslation } from 'react-i18next';

import { BookPrice } from '@/components/BookPrice';
import { useBookDetails, useScreenTitle } from '@/hooks';
import { useCartStore } from '@/store';
import type { BookDetailsRouteProp } from '@/types';

export function BookDetailsScreen() {
  const { t } = useTranslation();
  const route = useRoute<BookDetailsRouteProp>();
  const { bookId } = route.params;
  const { data, loading, error, refetch } = useBookDetails(bookId);
  const addItem = useCartStore(state => state.addItem);

  useScreenTitle('navigation.bookDetails');

  const handleAddToCart = useCallback(() => {
    if (data) {
      addItem(data);
    }
  }, [addItem, data]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error ?? t('bookDetails.notFound')}
        </Text>
        <Pressable onPress={refetch} style={styles.retryButton}>
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image
        resizeMode="cover"
        source={{ uri: data.coverUrl }}
        style={styles.cover}
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.author}>
        {t('bookDetails.byAuthor', { author: data.author })}
      </Text>
      <Text style={styles.meta}>
        {t('bookDetails.reviews', { count: data.reviewCount })} · {data.rating}
      </Text>
      <BookPrice price={data.price} style={styles.price} />
      <Text style={styles.description}>{data.description}</Text>
      <Pressable onPress={handleAddToCart} style={styles.addToCartButton}>
        <Ionicons color="#ffffff" name="cart-outline" size={18} />
        <Text style={styles.addToCartText}>{t('bookDetails.addToCart')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  cover: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
    textAlign: 'center',
  },
  meta: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    minWidth: 200,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
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
});
