import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useScreenTitle } from '@/hooks';

export function CheckoutScreen() {
  const { t } = useTranslation();
  useScreenTitle('navigation.checkout');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('checkout.title')}</Text>
      <Text style={styles.subtitle}>{t('checkout.subtitle')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
