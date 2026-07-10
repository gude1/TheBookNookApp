import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

import { useScreenTitle } from '@/hooks';
import type { BookDetailsRouteProp } from '@/types';

export function BookDetailsScreen() {
  const { t } = useTranslation();
  const route = useRoute<BookDetailsRouteProp>();
  useScreenTitle('navigation.bookDetails');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('bookDetails.title')}</Text>
      <Text style={styles.subtitle}>
        {t('bookDetails.placeholder', { bookId: route.params.bookId })}
      </Text>
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
