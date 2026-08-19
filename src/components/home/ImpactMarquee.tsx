"use client";

import { useContent } from "@/i18n/language";

export function ImpactMarquee() {
  const { marqueeItems } = useContent();
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-line/80 bg-surface/70 py-3.5 mb-20 md:mb-0 md:py-5">
      <div className="marquee-track flex w-max items-center gap-8">
        {items.map((item, index) => {
          const accent =
            index % 3 === 0
              ? "bg-saffron"
              : index % 3 === 1
                ? "bg-forest"
                : "bg-saffron-deep";
          return (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-ink">
                {item}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${accent}`} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
