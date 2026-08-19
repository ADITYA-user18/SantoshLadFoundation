"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent } from "@/i18n/language";

export function JanathaDarshan() {
  const { janatha, site } = useContent();
  return (
    <section id="janatha" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            index={janatha.index}
            kicker={janatha.kicker}
            title={janatha.title}
            lead={janatha.lead}
          />
          <Reveal>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-charcoal">
              {janatha.body}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-surface">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/work/children.jpg"
                  alt={site.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="img-mono object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
