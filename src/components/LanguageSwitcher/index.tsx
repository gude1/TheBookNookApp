import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLanguageStore } from '@/store';
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/utils';

const LANGUAGE_LABEL_KEYS = {
  en: 'language.english',
  es: 'language.spanish',
} as const satisfies Record<SupportedLanguage, string>;

type LanguageSwitcherProps = {
  variant?: 'default' | 'header';
};

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const isHeader = variant === 'header';

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, isHeader && styles.headerContainer]}>
      {!isHeader ? <Text style={styles.label}>{t('language.label')}</Text> : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('language.label')}
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen(true)}
        style={[styles.trigger, isHeader && styles.headerTrigger]}
      >
        <Text style={[styles.triggerText, isHeader && styles.headerTriggerText]}>
          {t(LANGUAGE_LABEL_KEYS[language])}
        </Text>
        <Text style={[styles.chevron, isHeader && styles.headerChevron]}>▾</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          accessibilityRole="button"
          style={styles.backdrop}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.menu}>
            {SUPPORTED_LANGUAGES.map((code) => {
              const isSelected = language === code;

              return (
                <Pressable
                  key={code}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => handleSelect(code)}
                  style={[styles.menuItem, isSelected && styles.menuItemSelected]}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      isSelected && styles.menuItemTextSelected,
                    ]}
                  >
                    {t(LANGUAGE_LABEL_KEYS[code])}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  headerContainer: {
    marginTop: 0,
    width: 'auto',
    marginEnd: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  trigger: {
    minWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff',
  },
  headerTrigger: {
    minWidth: 108,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerTriggerText: {
    fontSize: 12,
  },
  chevron: {
    fontSize: 14,
    color: '#666666',
    marginStart: 8,
  },
  headerChevron: {
    fontSize: 12,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 96,
    paddingEnd: 16,
  },
  menu: {
    minWidth: 160,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  menuItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuItemSelected: {
    backgroundColor: '#f5f5f5',
  },
  menuItemText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  menuItemTextSelected: {
    fontWeight: '700',
  },
});
