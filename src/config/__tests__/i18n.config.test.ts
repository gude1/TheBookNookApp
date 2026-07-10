import i18n from '@/config/i18n.config';

describe('i18n.config', () => {
  it('initializes with English as the fallback language', () => {
    expect(i18n.language).toBe('en');
  });

  it('returns English translations by default', () => {
    expect(i18n.t('app.title')).toBe('The Book Nook');
    expect(i18n.t('common.loading')).toBe('Loading...');
  });

  it('switches to Spanish translations', async () => {
    await i18n.changeLanguage('es');

    expect(i18n.t('app.tagline')).toBe('Descubre tu próxima gran lectura');
    expect(i18n.t('common.retry')).toBe('Intentar de nuevo');

    await i18n.changeLanguage('en');
  });
});
