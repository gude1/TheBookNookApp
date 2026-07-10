import { useCallback, useLayoutEffect, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { CartItem } from '@/components/CartItem';
import { useScreenTitle } from '@/hooks';
import {
  getCartItemCount,
  getCartTotalPrice,
  useCartStore,
} from '@/store';
import type { CartItem as CartItemType } from '@/types/cart.types';

export function CartScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const cartItems = useMemo(() => Object.values(items), [items]);
  const itemCount = useMemo(() => getCartItemCount(items), [items]);
  const totalPrice = useMemo(() => getCartTotalPrice(items), [items]);

  useScreenTitle('navigation.cart');

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: itemCount > 0 ? itemCount : undefined,
    });
  }, [itemCount, navigation]);

  const handleIncrement = useCallback(
    (bookId: string) => {
      const currentItem = items[bookId];

      if (currentItem) {
        addItem(currentItem.book);
      }
    },
    [addItem, items],
  );

  const handleDecrement = useCallback(
    (bookId: string) => {
      const currentItem = items[bookId];

      if (currentItem) {
        setQuantity(bookId, currentItem.quantity - 1);
      }
    },
    [items, setQuantity],
  );

  const handleRemove = useCallback(
    (bookId: string) => {
      removeItem(bookId);
    },
    [removeItem],
  );

  const handleCheckout = useCallback(() => {
    if (itemCount > 0) {
      navigation.navigate('Checkout');
    }
  }, [itemCount, navigation]);

  const renderItem: ListRenderItem<CartItemType> = useCallback(
    ({ item }) => (
      <CartItem
        item={item}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        onRemove={handleRemove}
      />
    ),
    [handleDecrement, handleIncrement, handleRemove],
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{t('cart.title')}</Text>
        <Text style={styles.emptyText}>{t('cart.empty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cartItems}
        keyExtractor={(item) => item.book.id}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>
          {t('cart.total', { amount: `$${totalPrice.toFixed(2)}` })}
        </Text>
        <Pressable onPress={handleCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>{t('cart.checkout')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
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
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
