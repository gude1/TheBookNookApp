import { NativeModules, Platform } from 'react-native';

import {
  getDeviceLanguage,
  SUPPORTED_LANGUAGES,
} from '../src/i18n/getDeviceLanguage';

describe('getDeviceLanguage', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    Platform.OS = originalPlatform;
    delete NativeModules.SettingsManager;
    delete NativeModules.I18nManager;
  });

  it('exposes the supported language list', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'es']);
  });

  it('returns English when no locale is available', () => {
    expect(getDeviceLanguage()).toBe('en');
  });

  it('reads the iOS device locale when supported', () => {
    Platform.OS = 'ios';
    NativeModules.SettingsManager = {
      settings: {
        AppleLocale: 'es_ES',
      },
    };

    expect(getDeviceLanguage()).toBe('es');
  });

  it('reads the Android device locale when supported', () => {
    Platform.OS = 'android';
    NativeModules.I18nManager = {
      localeIdentifier: 'es_MX',
    };

    expect(getDeviceLanguage()).toBe('es');
  });

  it('falls back to English for unsupported locales', () => {
    Platform.OS = 'android';
    NativeModules.I18nManager = {
      localeIdentifier: 'fr_FR',
    };

    expect(getDeviceLanguage()).toBe('en');
  });
});
