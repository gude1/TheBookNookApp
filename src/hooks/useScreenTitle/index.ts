import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export function useScreenTitle(titleKey: string) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const label = t(titleKey as never);

    navigation.setOptions({
      title: label,
      tabBarLabel: label,
    });
  }, [navigation, t, titleKey]);
}
