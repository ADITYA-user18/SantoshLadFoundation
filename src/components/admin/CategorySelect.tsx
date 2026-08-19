"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Tag } from "lucide-react";
import { FEED_CATEGORIES, GALLERY_CATEGORIES } from "@/types/post";
import { cn } from "@/lib/utils";

const KANNADA_CATEGORIES: Record<string, string> = {
  Labour: "ಕಾರ್ಮಿಕರು",
  Dharwad: "ಧಾರವಾಡ",
  Kalaghatgi: "ಕಲಘಟಗಿ",
  Events: "ಕಾರ್ಯಕ್ರಮಗಳು",
  "Janatha Darshan": "ಜನತಾ ದರ್ಶನ",
  "Party Works": "ಪಕ್ಷದ ಕಾರ್ಯಗಳು",
  Portrait: "ಭಾವಚಿತ್ರಗಳು",
  Rescue: "ರಕ್ಷಣೆ",
  "Special Occasions": "ವಿಶೇಷ ಸಂದರ್ಭಗಳು",
  "Public Life": "ಸಾರ್ವಜನಿಕ ಜೀವನ",
  Dignitaries: "ಗಣ್ಯರು",
  Development: "ಅಭಿವೃದ್ಧಿ",
  "Rescue & Relief": "ರಕ್ಷಣೆ ಮತ್ತು ಪರಿಹಾರ",
  Announcements: "ಪ್ರಕಟಣೆಗಳು",
  People: "ಜನರು",
  Public: "ಸಾರ್ವಜನಿಕ",
};

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  destination?: "FEED" | "GALLERY" | "BOTH";
  className?: string;
}

export function CategorySelect({ value, onChange, destination, className }: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories =
    destination === "GALLERY"
      ? (GALLERY_CATEGORIES as readonly string[])
      : destination === "BOTH"
        ? Array.from(new Set([...FEED_CATEGORIES, ...GALLERY_CATEGORIES]))
        : (FEED_CATEGORIES as readonly string[]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedKannada = KANNADA_CATEGORIES[value] || "";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border bg-paper px-4 py-3 text-left transition-all duration-200 cursor-pointer shadow-sm",
          open
            ? "border-navy ring-2 ring-navy/15 dark:border-saffron dark:ring-saffron/20"
            : "border-line hover:border-saffron/50 hover:bg-surface"
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-saffron/15 text-saffron-deep dark:bg-saffron/25 dark:text-saffron">
            <Tag size={13} />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-[13px] font-semibold text-ink">{value || "Select Category"}</span>
            {selectedKannada && (
              <span className="rounded-md bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted border border-line">
                {selectedKannada}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={cn("text-muted transition-transform duration-200 shrink-0", open && "rotate-180 text-navy dark:text-saffron")}
        />
      </button>

      {/* Floating Stylish Popover Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-line bg-paper p-1.5 shadow-[0_16px_40px_rgba(14,28,64,0.18)] backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {categories.map((cat) => {
              const isSelected = value === cat;
              const knLabel = KANNADA_CATEGORIES[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onChange(cat);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "bg-navy text-white shadow-sm dark:bg-saffron dark:text-slate-950 font-semibold"
                      : "text-ink hover:bg-surface hover:text-saffron-deep dark:hover:bg-slate-800"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{cat}</span>
                    {knLabel && (
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[11px]",
                          isSelected
                            ? "bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950"
                            : "bg-surface text-muted border border-line"
                        )}
                      >
                        {knLabel}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check size={15} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
