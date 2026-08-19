"use client";

import React from 'react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

export const Philosophy: React.FC = () => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].philosophy;

  return (
    <section id="philosophy" className="py-28 sm:py-40 bg-[#F8F6F0] text-[#141414] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#857E74]">
            {t.eyebrow}
          </span>
        </div>

        {/* Large Centered Editorial Quote */}
        <blockquote className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#141414] font-normal leading-[1.18] tracking-tight max-w-4xl mx-auto">
          {t.quote}
        </blockquote>

        {/* Attribution */}
        <div className="mt-8 text-xs uppercase tracking-widest font-semibold text-[#5C5549]">
          {t.author}<span className="font-light text-[#857E74]">{t.role}</span>
        </div>

        {/* Supporting Editorial Paragraphs */}
        <div className="mt-12 max-w-2xl mx-auto text-base sm:text-lg text-[#666055] font-light leading-relaxed space-y-4">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>

      </div>
    </section>
  );
};
