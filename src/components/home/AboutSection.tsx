"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent } from "@/i18n/language";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { about, site } = useContent();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading index={about.index} title={about.title} />

          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-charcoal/90 md:text-base">
            {/* Lead paragraph — always visible, matching body font style */}
            <Reveal>
              <p>{about.lead}</p>
            </Reveal>

            {/* Body paragraphs — collapsible on mobile, fully visible on desktop */}
            <div className={cn("space-y-5 transition-all duration-300", !expanded && "hidden md:block")}>
              {about.body.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* Mobile Read More / Show Less Toggle */}
            <div className="md:hidden pt-1">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:underline cursor-pointer"
              >
                <span>{expanded ? "Show less" : "Read more..."}</span>
                <ChevronDown
                  size={16}
                  className={cn("transition-transform duration-200", expanded && "rotate-180")}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:self-center lg:pt-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-surface">
              <div className="relative aspect-[16/9.5]">
                <Image
                  src="/images/portraits/about.jpg"
                  alt={site.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {about.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <div className="rounded-2xl border border-line bg-paper px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm text-ink">{fact.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal>
        <blockquote className="mt-16 max-w-4xl border-l-[3px] border-saffron pl-6 font-display text-2xl leading-snug text-ink md:mt-20 md:text-4xl">
          {about.quote}
        </blockquote>
      </Reveal>
    </section>
  );
}
