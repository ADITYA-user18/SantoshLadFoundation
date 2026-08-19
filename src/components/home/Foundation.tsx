"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TricolorBar } from "@/components/site/TricolorBar";
import { useContent } from "@/i18n/language";

export function Foundation() {
  const { campaign, foundation, site } = useContent();

  const locations = [
    "Hangal",
    "Sandur",
    "Davangere South",
    "Ballari",
    "Dharwad",
    "Tamil Nadu",
    "Goa",
  ];

  return (
    <section id="foundation" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Card: Santosh Lad Foundation */}
        <Reveal className="w-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line/80 bg-paper shadow-sm transition-all duration-300 hover:shadow-md sm:rounded-[32px]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
              <Image
                src="/images/portraits/namaste.jpg"
                alt={foundation.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-mono object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron-deep">
                  {foundation.kicker}
                </p>
                <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl md:text-5xl">
                  {foundation.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-charcoal/90 sm:text-base">
                  {foundation.text}
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Right Card: Strength of Every Campaign */}
        <Reveal className="w-full" delay={2}>
          <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1428] p-6 text-white shadow-xl sm:rounded-[32px] sm:p-8 md:p-10">
            <TricolorBar className="absolute inset-x-0 top-0" />
            
            <div className="pt-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron">
                {site.party}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl md:text-[42px]">
                {campaign.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">
                {campaign.text}
              </p>
            </div>

            {/* Campaign Locations Pills */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-saffron" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron/90">
                  Key Constituency & Campaign Footprint
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md transition-all duration-200 hover:border-saffron/40 hover:bg-saffron/20 hover:text-white"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
