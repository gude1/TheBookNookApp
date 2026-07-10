import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  getCartItemCount,
  useCartIconAnimationStore,
  useCartStore,
} from '@/store';

export function BookDetailsHeaderRight() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const itemCount = useCartStore(state => getCartItemCount(state.items));
  const bumpCount = useCartIconAnimationStore(state => state.bumpCount);
  const resetBump = useCartIconAnimationStore(state => state.resetBump);
  const rotation = useSharedValue(0);
  const ringScale = useSharedValue(0.6);
  const ringOpacity = useSharedValue(0);

  useEffect(() => {
    return () => {
      resetBump();
    };
  }, [resetBump]);

  useEffect(() => {
    if (bumpCount === 0) {
      return;
    }

    rotation.value = withSequence(
      withTiming(-12, { duration: 60 }),
      withTiming(12, { duration: 60 }),
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(0, { duration: 60 }),
    );

    ringScale.value = 0.6;
    ringOpacity.value = 0.7;
    ringScale.value = withTiming(2, { duration: 450 });
    ringOpacity.value = withTiming(0, { duration: 450 });
  }, [bumpCount, ringOpacity, ringScale, rotation]);

  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const ringAnimatedStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ scale: ringScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.cartWrap}>
        <Animated.View
          pointerEvents="none"
          style={[styles.ring, ringAnimatedStyle]}
        />
        <Pressable
          accessibilityLabel={t('navigation.cart')}
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
          style={styles.cartButton}
        >
          <Animated.View style={cartAnimatedStyle}>
            <Ionicons color="#1a1a1a" name="cart-outline" size={22} />
          </Animated.View>
          {itemCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {itemCount > 99 ? '99+' : itemCount}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>
      <LanguageSwitcher variant="header" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginEnd: 4,
  },
  cartWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  cartButton: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
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
