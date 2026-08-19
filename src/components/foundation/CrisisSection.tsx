"use client";

import React from 'react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

export const CrisisSection: React.FC = () => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].crisis;

  return (
    <section id="crisis" className="py-28 sm:py-36 bg-[#24201B] text-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#B8AEA0] block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-[#F8F6F0] tracking-tight leading-[1.12]">
            {t.headlineLead} <br />
            <span className="italic text-[#E5DFD5]">{t.headlineItalic}</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#C7BFB2] font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* 4 Emergency Response Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.events.map((event, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#302B24] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B8AEA0] font-medium block mb-3">
                  {event.location}
                </span>

                <h3 className="font-editorial text-2xl text-white font-medium mb-3">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#C7BFB2] font-light leading-relaxed mb-6">
                  {event.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-semibold text-[#F8F6F0]">
                {event.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Closing Restrained Poetic Line */}
        <div className="mt-20 text-center max-w-2xl mx-auto pt-10 border-t border-white/10">
          <p className="font-editorial text-xl sm:text-2xl text-[#E5DFD5] italic font-normal leading-relaxed">
            {t.quote}
          </p>
        </div>

      </div>
    </section>
  );
};
