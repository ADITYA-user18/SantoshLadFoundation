"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';
import Magnet from '@/components/ui/Magnet';

interface ClosingCTAProps {
  onOpenJoin: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenJoin }) => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].closingCta;

  return (
    <section className="py-28 sm:py-36 bg-[#F8F6F0] text-[#141414] border-t border-[#E8E4D9]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#857E74] block mb-4">
          {t.eyebrow}
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight text-[#141414] leading-[1.12]">
          {t.headlineLead} <br />
          <span className="font-normal font-editorial italic text-[#5C5549]">
            {t.headlineItalic}
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#666055] font-light max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Magnet padding={50} magnetStrength={3}>
            <button
              onClick={onOpenJoin}
              id="closing-cta-join-btn"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141414] text-[#F8F6F0] text-sm font-semibold tracking-wide hover:bg-[#2C2A26] transition-all cursor-pointer shadow-sm group"
            >
              <span>{t.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnet>
        </div>

      </div>
    </section>
  );
};
