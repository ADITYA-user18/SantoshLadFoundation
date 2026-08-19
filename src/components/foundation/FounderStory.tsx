"use client";

import React from 'react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

export const FounderStory: React.FC = () => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].founder;

  return (
    <section id="founder" className="py-28 sm:py-36 bg-[#F8F6F0] text-[#141414] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-sm bg-[#EDE8DE]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85"
                alt={t.badgeTitle}
                className="w-full h-[460px] sm:h-[520px] object-cover object-center filter saturate-[0.92]"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#F8F6F0]/90 backdrop-blur-md text-[#141414]">
                <div className="font-editorial text-xl font-semibold">{t.badgeTitle}</div>
                <div className="text-xs uppercase tracking-wider text-[#736B5E] font-medium">
                  {t.badgeRole}
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#857E74] block">
              {t.eyebrow}
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#141414] leading-[1.15]">
              {t.headlineLead} <br />
              <span className="italic text-[#5C5549]">{t.headlineItalic}</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#524C42] font-light leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            {/* Core Values Strip */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E8E4D9]">
              <div>
                <strong className="font-editorial text-lg text-[#141414] block">{t.stat1Val}</strong>
                <span className="text-xs text-[#736B5E] font-light">{t.stat1Label}</span>
              </div>
              <div>
                <strong className="font-editorial text-lg text-[#141414] block">{t.stat2Val}</strong>
                <span className="text-xs text-[#736B5E] font-light">{t.stat2Label}</span>
              </div>
              <div>
                <strong className="font-editorial text-lg text-[#141414] block">{t.stat3Val}</strong>
                <span className="text-xs text-[#736B5E] font-light">{t.stat3Label}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
