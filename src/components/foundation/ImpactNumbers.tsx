"use client";

import React from 'react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

export const ImpactNumbers: React.FC = () => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].impact;

  return (
    <section id="impact" className="py-24 sm:py-32 bg-[#F8F6F0] text-[#141414] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-sans font-semibold tracking-tight text-[#141414]">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#666055] font-light max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#EDE8DE] hover:bg-[#E5DFD4] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#787063] font-semibold block mb-4">
                  {metric.category}
                </span>

                <div className="font-editorial text-4xl sm:text-5xl font-normal text-[#141414] tracking-tight mb-2">
                  {metric.value}
                </div>

                <div className="text-sm sm:text-base font-medium text-[#2C2822] leading-snug">
                  {metric.label}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCD5C8] text-xs text-[#6B6458] font-light leading-relaxed">
                {metric.story}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Footer Disclaimer */}
        <div className="mt-12 text-center text-xs text-[#8C8476] font-light">
          {t.disclaimer}
        </div>

      </div>
    </section>
  );
};
