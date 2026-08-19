"use client";

import { useLanguage } from "@/i18n/language";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark" || theme === "dark";

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "kn" : "en");
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-slate-200 bg-white shrink-0" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "h-9 w-9 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md font-sans select-none",
        isDark
          ? "bg-slate-900 border-white/20 text-saffron hover:border-saffron"
          : "bg-white border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50",
        className
      )}
      title={locale === "en" ? "Switch to Kannada (ಕನ್ನಡ)" : "Switch to English (EN)"}
      aria-label="Toggle Language"
    >
      {locale === "en" ? (
        <span className="text-[14px] font-bold leading-none">ಕ</span>
      ) : (
        <span className="text-[13px] font-extrabold tracking-tight leading-none inline-block translate-y-[1.5px]">
          EN
        </span>
      )}
    </button>
  );
}
