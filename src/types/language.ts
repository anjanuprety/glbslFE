// Language types for the bilingual application

export type Language = 'en' | 'ne';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface Translations {
  [key: string]: {
    en: string;
    ne: string;
  };
}
