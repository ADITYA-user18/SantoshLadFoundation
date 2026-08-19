"use client";

import { useContent } from "@/i18n/language";

export function LatestIntro() {
  const { feed } = useContent();

  return (
    <>
      <p className="font-editorial text-lg sm:text-2xl text-[#5C5549] italic font-normal tracking-wide">
        {feed.kicker}
      </p>
      <h1 className="mt-2.5 max-w-4xl font-sans text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#141414] leading-[1.05]">
        {feed.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#666055] font-light">
        {feed.lead}
      </p>
    </>
  );
}
