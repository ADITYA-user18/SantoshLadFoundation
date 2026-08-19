"use client";

import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n/language";

export function VisionMission() {
  const { visionMission } = useContent();
  return (
    <section id="vision" className="bg-[#0b1428] py-16 text-white sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.22em] text-saffron">
            {visionMission.title}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            {visionMission.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {visionMission.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-saffron">
              {visionMission.visionLabel}
            </p>
            <ul className="mt-6 space-y-3">
              {visionMission.vision.map((item, index) => (
                <Reveal key={item} delay={(index % 4) as 0 | 1 | 2 | 3}>
                  <li className="border-b border-white/15 pb-3 font-display text-3xl leading-tight text-white md:text-5xl">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">
              {visionMission.missionLabel}
            </p>
            <ul className="mt-6 space-y-3">
              {visionMission.mission.map((item, index) => (
                <Reveal key={item} delay={(index % 4) as 0 | 1 | 2 | 3}>
                  <li className="border-b border-white/15 pb-3 font-display text-3xl leading-tight text-white md:text-5xl">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal>
          <p className="mt-16 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            {visionMission.community}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
