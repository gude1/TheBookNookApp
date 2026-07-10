import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';

import { BookPrice } from '@/components/BookPrice';
import type { CartItem as CartItemType } from '@/types/cart.types';

type CartItemProps = {
  item: CartItemType;
  onIncrement: (bookId: string) => void;
  onDecrement: (bookId: string) => void;
  onRemove: (bookId: string) => void;
};

export function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const { t } = useTranslation();
  const { book, quantity } = item;

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={{ uri: book.coverUrl }}
        style={styles.cover}
      />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {book.title}
        </Text>
        <Text style={styles.author}>{book.author}</Text>
        <BookPrice price={book.price * quantity} style={styles.lineTotal} />
        <View style={styles.controls}>
          <Text style={styles.quantityLabel}>{t('cart.quantity')}</Text>
          <Pressable
            accessibilityLabel={t('cart.decreaseQuantity')}
            accessibilityRole="button"
            onPress={() => onDecrement(book.id)}
            style={styles.quantityButton}
          >
            <Ionicons color="#1a1a1a" name="remove" size={18} />
          </Pressable>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <Pressable
            accessibilityLabel={t('cart.increaseQuantity')}
            accessibilityRole="button"
            onPress={() => onIncrement(book.id)}
            style={styles.quantityButton}
          >
            <Ionicons color="#1a1a1a" name="add" size={18} />
          </Pressable>
          <Pressable
            accessibilityLabel={t('cart.remove')}
            accessibilityRole="button"
            onPress={() => onRemove(book.id)}
            style={styles.removeButton}
          >
            <Ionicons color="#c62828" name="trash-outline" size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9d9d9',
  },
  cover: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 6,
  },
  lineTotal: {
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  quantityLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
