"use client";

import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n/language";

/**
 * Key achievement stats — displayed as a clean standalone strip
 * immediately below the ImpactMarquee (outside the 100svh hero zone).
 * Each stat is centred within its column cell.
 */
export function HeroStats() {
  const { heroStats } = useContent();

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line/60 py-10 sm:gap-x-10 md:grid-cols-4 md:py-12 lg:py-14">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              {/* Accent bar above the number */}
              <span
                className={
                  stat.accent === "saffron"
                    ? "mb-3 h-[3px] w-8 rounded-full bg-saffron"
                    : stat.accent === "forest"
                      ? "mb-3 h-[3px] w-8 rounded-full bg-forest"
                      : "mb-3 h-[3px] w-8 rounded-full bg-congress"
                }
              />
              <p className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 max-w-[16ch] text-[11px] uppercase tracking-[0.14em] text-muted sm:text-[12px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
