"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { english, type SiteContent } from "@/data/content";
import { kannada } from "@/i18n/kn";

export type Locale = "en" | "kn";

const STORAGE_KEY = "slad-locale";

const dictionaries: Record<Locale, SiteContent> = {
  en: english,
  kn: kannada,
};

let currentLocale: Locale = "en";
const listeners = new Set<() => void>();

function readStoredLocale(): Locale {
  return "en";
}

if (typeof window !== "undefined") {
  currentLocale = readStoredLocale();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getLocale() {
  return currentLocale;
}

function getServerLocale(): Locale {
  return "en";
}

function setStoredLocale(next: Locale) {
  currentLocale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: SiteContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, getServerLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "kn" ? "kn" : "en";
    document.documentElement.classList.toggle("lang-kn", locale === "kn");
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setStoredLocale,
      content: dictionaries[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useContent() {
  return useLanguage().content;
}
