import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "@/types";
import { strings, type StringKey } from "@/i18n/strings";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: StringKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "semsy:lang";

function getInitialLang(): Language {
  if (typeof window === "undefined") return "tr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "tr" || stored === "en") return stored;
  return "tr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === "tr" ? "en" : "tr"));
  }, []);

  const t = useCallback(
    (key: StringKey) => strings[lang][key],
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
