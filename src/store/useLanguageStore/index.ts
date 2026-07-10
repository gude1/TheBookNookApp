import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import i18n from '@/config/i18n.config';
import {
  getDeviceLanguage,
  type SupportedLanguage,
} from '@/utils/getDeviceLanguage';

type LanguageState = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: getDeviceLanguage(),
      setLanguage: language => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'book-nook-language',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
      },
    },
  ),
);
