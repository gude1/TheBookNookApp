import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';

import { getCartItemCount, useCartStore } from '@/store';

type TabIconProps = {
  color: string;
  size: number;
};

export function BrowseTabIcon({ color, size }: TabIconProps) {
  return <Ionicons color={color} name="book-outline" size={size} />;
}

export function CartTabIcon({ color, size }: TabIconProps) {
  const itemCount = useCartStore(state => getCartItemCount(state.items));

  return (
    <View style={styles.container}>
      <Ionicons color={color} name="cart-outline" size={size} />
      {itemCount > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#c62828',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});
