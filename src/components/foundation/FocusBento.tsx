"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

interface FocusBentoProps {
  onOpenStory: (id: string) => void;
}

export const FocusBento: React.FC<FocusBentoProps> = ({ onOpenStory }) => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].focusBento;

  return (
    <section id="focus-areas" className="py-24 sm:py-32 bg-[#F8F6F0] text-[#141414]">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          
          {/* Bento Card 1: Large Photographic Card (Span 7) */}
          <div
            onClick={() => onOpenStory('water')}
            className="md:col-span-7 group relative h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=85"
              alt={t.card1Title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter saturate-[0.9]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-[#141414]/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-white mb-1">
                  {t.card1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5DFD5] font-light max-w-md">
                  {t.card1Desc}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#141414] transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Warm Beige Editorial Card (Span 5) */}
          <div
            onClick={() => onOpenStory('food')}
            className="md:col-span-5 bg-[#EDE8DE] p-8 sm:p-10 rounded-3xl flex flex-col justify-between cursor-pointer hover:bg-[#E5DFD4] transition-all shadow-sm group"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-widest text-[#736B5E] font-medium">
                {t.card2Tag}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#DFD9CE] flex items-center justify-center text-[#141414] group-hover:bg-[#141414] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#141414] font-medium tracking-tight mb-2">
                {t.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666055] font-light leading-relaxed">
                {t.card2Desc}
              </p>
            </div>
          </div>

          {/* Bento Card 3: Warm Taupe / Clay Card (Span 5) */}
          <div
            onClick={() => onOpenStory('independence')}
            className="md:col-span-5 bg-[#D9D2C5] p-8 sm:p-10 rounded-3xl flex flex-col justify-between cursor-pointer hover:bg-[#CFC7B9] transition-all shadow-sm group"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-widest text-[#665F53] font-medium">
                {t.card3Tag}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#CEC6B7] flex items-center justify-center text-[#141414] group-hover:bg-[#141414] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#141414] font-medium tracking-tight mb-2">
                {t.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#575045] font-light leading-relaxed">
                {t.card3Desc}
              </p>
            </div>
          </div>

          {/* Bento Card 4: Muted Earthy Green Card with Portrait on Right (Span 7) */}
          <div
            onClick={() => onOpenStory('education')}
            className="md:col-span-7 bg-[#445142] p-8 sm:p-10 rounded-3xl text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between cursor-pointer hover:bg-[#3B4739] transition-all shadow-sm group"
          >
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#C8D4C6] font-medium block">
                {t.card4Tag}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-white">
                {t.card4Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E0E8DF] font-light leading-relaxed">
                {t.card4Desc}
              </p>
            </div>

            <div className="mt-6 sm:mt-0 relative w-36 sm:w-44 h-44 sm:h-52 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=85"
                alt={t.card4Title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
