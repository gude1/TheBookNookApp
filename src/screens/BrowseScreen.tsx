import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

import { useScreenTitle } from '@/hooks';

export function BrowseScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  useScreenTitle('navigation.browse');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('browse.title')}</Text>
      <Text style={styles.subtitle}>{t('browse.subtitle')}</Text>
      <Button
        style={styles.button}
        onPress={() =>
          navigation.navigate('BookDetails', { bookId: 'sample-book-1' })
        }
      >
        {t('bookDetails.title')}
      </Button>
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
  button: {
    marginTop: 24,
  },
});
