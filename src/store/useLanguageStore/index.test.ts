import i18n from '@/config/i18n.config';

import { useLanguageStore } from './index';

jest.mock('@/config/i18n.config', () => ({
  __esModule: true,
  default: {
    changeLanguage: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('useLanguageStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLanguageStore.setState({ language: 'en' });
  });

  it('initializes with English by default in tests', () => {
    expect(useLanguageStore.getState().language).toBe('en');
  });

  it('updates language and syncs i18n', () => {
    useLanguageStore.getState().setLanguage('es');

    expect(useLanguageStore.getState().language).toBe('es');
    expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
  });

  it('can switch back to English', () => {
    useLanguageStore.getState().setLanguage('es');
    useLanguageStore.getState().setLanguage('en');

    expect(useLanguageStore.getState().language).toBe('en');
    expect(i18n.changeLanguage).toHaveBeenLastCalledWith('en');
  });
});
