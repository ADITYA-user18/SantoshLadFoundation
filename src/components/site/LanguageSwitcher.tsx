"use client";

import { useLanguage } from "@/i18n/language";
import { useEffect, useState } from "react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9.5 h-9.5 rounded-full bg-[#EDE8DE]/60 animate-pulse shrink-0" />
    );
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "kn" : "en");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`relative w-9.5 h-9.5 rounded-full bg-[#141414] text-[#F8F6F0] hover:bg-[#2C2A26] border border-[#2C2A26] flex items-center justify-center transition-all duration-300 cursor-pointer select-none shrink-0 shadow-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#141414]/20 ${
        className || ""
      }`}
      title={locale === "en" ? "Switch to Kannada (ಕನ್ನಡ)" : "Switch to English (EN)"}
      aria-label="Toggle language"
    >
      {locale === "en" ? (
        <span className="font-bold text-[16px] leading-none transition-transform duration-200">
          ಕ
        </span>
      ) : (
        <span className="font-bold text-[11px] tracking-wider uppercase leading-none">
          EN
        </span>
      )}
    </button>
  );
}
