import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { BookPrice } from '@/components/BookPrice';
import { useScreenTitle } from '@/hooks';
import { getCartTotalPrice, useCartStore } from '@/store';
import type { CartItem as CartItemType } from '@/types/cart.types';

function CheckoutSummaryItem({ item }: { item: CartItemType }) {
  const { book, quantity } = item;

  return (
    <View style={styles.summaryItem}>
      <View style={styles.summaryDetails}>
        <Text numberOfLines={2} style={styles.summaryTitle}>
          {book.title}
        </Text>
        <Text style={styles.summaryMeta}>
          {quantity} × ${book.price.toFixed(2)}
        </Text>
      </View>
      <BookPrice price={book.price * quantity} />
    </View>
  );
}

export function CheckoutScreen() {
  const { t } = useTranslation();
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItems = useMemo(() => Object.values(items), [items]);
  const totalPrice = useMemo(() => getCartTotalPrice(items), [items]);

  useScreenTitle('navigation.checkout');

  const handlePlaceOrder = useCallback(() => {
    clearCart();
    setOrderPlaced(true);
  }, [clearCart]);

  const renderItem: ListRenderItem<CartItemType> = useCallback(
    ({ item }) => <CheckoutSummaryItem item={item} />,
    [],
  );

  if (orderPlaced) {
    return (
      <View style={styles.centered}>
        <Text style={styles.successText}>{t('checkout.success')}</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>{t('checkout.empty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('checkout.orderSummary')}</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cartItems}
        keyExtractor={item => item.book.id}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>
          {t('cart.total', { amount: `$${totalPrice.toFixed(2)}` })}
        </Text>
        <Pressable onPress={handlePlaceOrder} style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>{t('checkout.placeOrder')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9d9d9',
  },
  summaryDetails: {
    flex: 1,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryMeta: {
    fontSize: 14,
    opacity: 0.7,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d9d9d9',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  placeOrderButton: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
