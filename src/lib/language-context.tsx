"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProfile, saveProfile } from "@/lib/storage";
import { translate, type Language, type TranslationKey } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    getProfile().then((p) => {
      if (p?.language) setLanguageState(p.language);
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    getProfile().then((p) => {
      if (p) saveProfile({ ...p, language: lang });
    });
  };

  const t = (key: TranslationKey, vars?: Record<string, string>) => translate(language, key, vars);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
