import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getDeviceLanguage } from './getDeviceLanguage';
import en from './translations/en.json';
import es from './translations/es.json';
import './types';

const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
