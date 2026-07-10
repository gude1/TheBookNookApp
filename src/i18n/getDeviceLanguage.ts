import { NativeModules, Platform } from 'react-native';

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function getLocaleIdentifier(): string | undefined {
  if (Platform.OS === 'ios') {
    const settings = NativeModules.SettingsManager?.settings;

    return (
      settings?.AppleLocale ??
      settings?.AppleLanguages?.[0]
    );
  }

  return NativeModules.I18nManager?.localeIdentifier;
}

export function getDeviceLanguage(): SupportedLanguage {
  try {
    const locale = getLocaleIdentifier();
    const language = locale?.split(/[-_]/)[0]?.toLowerCase();

    if (
      language &&
      SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)
    ) {
      return language as SupportedLanguage;
    }
  } catch {
    // Fall back to English when device locale cannot be read.
  }

  return 'en';
}
