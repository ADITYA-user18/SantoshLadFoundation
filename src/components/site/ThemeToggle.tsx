"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-slate-200 bg-white" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`h-9 w-9 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md ${
        isDark
          ? "bg-slate-900 border-white/20 text-saffron hover:border-saffron"
          : "bg-white border-slate-300 text-amber-500 hover:border-amber-500"
      }`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun size={17} className="text-saffron fill-saffron/25 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={17} className="text-amber-500 fill-amber-500/25 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
