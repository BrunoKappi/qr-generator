import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pt } from './pt';
import { en } from './en';
import { es } from './es';

export type Language = 'pt-BR' | 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const locales = {
  'pt-BR': pt,
  en: en,
  es: es,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('bkappi_lang_pref');
    if (saved === 'en' || saved === 'es' || saved === 'pt-BR') {
      return saved as Language;
    }
    // Auto detect from browser
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language;
      if (browserLang.startsWith('pt')) return 'pt-BR';
      if (browserLang.startsWith('es')) return 'es';
    }
    return 'pt-BR';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('bkappi_lang_pref', newLang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = locales[lang];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to portuguese if key missing in translation
        let fallback: any = pt;
        for (const k of keys) {
          if (fallback && fallback[k] !== undefined) {
            fallback = fallback[k];
          } else {
            fallback = undefined;
            break;
          }
        }
        return fallback || path;
      }
    }
    
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
