"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useContent } from "@/i18n/language";

// Dynamic import with SSR disabled for WebGL canvas component
const Carousel = dynamic(() => import("@/components/timeline/Carousel"), {
  ssr: false,
});

export default function TimelinePage() {
  const { site, ui } = useContent();

  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#070d18] text-ink overflow-hidden">
      {/* Fixed top overlay for navigation & controls */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 md:px-10 bg-transparent pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 backdrop-blur-md transition-all hover:bg-white dark:hover:bg-slate-900 hover:text-amber-600 dark:hover:text-saffron shadow-sm hover:shadow-md shrink-0"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-slate-600 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-saffron" />
          <span>{site.name}</span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Viscose 3D Interactive Carousel */}
      <main className="relative h-screen w-screen overflow-hidden">
        <Carousel />
      </main>
    </div>
  );
}
