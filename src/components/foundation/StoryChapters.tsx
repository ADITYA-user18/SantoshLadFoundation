"use client";

import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

interface StoryChaptersProps {
  onOpenJoin: () => void;
}

const CHAPTER_IMAGES = [
  'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1574958269340-fa927304f208?auto=format&fit=crop&w=1400&q=80',
];

export const StoryChapters: React.FC<StoryChaptersProps> = ({ onOpenJoin }) => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].storyChapters;
  const [selectedStory, setSelectedStory] = useState<(typeof t.chapters)[0] | null>(null);

  return (
    <section id="chapters" className="py-28 sm:py-36 bg-[#F8F6F0] text-[#141414]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#857E74] block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-semibold tracking-tight text-[#141414]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#666055] font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Five Asymmetric Magazine Spreads */}
        <div className="space-y-24 sm:space-y-36">
          {t.chapters.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={chapter.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Image Side */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-sm bg-[#EDE8DE]">
                    <img
                      src={CHAPTER_IMAGES[index]}
                      alt={chapter.headline}
                      className="w-full h-80 sm:h-[440px] object-cover object-center filter saturate-[0.92]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#141414]/70 backdrop-blur-md text-white text-[11px] uppercase tracking-widest font-medium">
                      Chapter {chapter.chapterNumber}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#857E74] block">
                    {chapter.theme}
                  </span>

                  <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141414] leading-[1.12]">
                    {chapter.headline}
                  </h3>

                  <p className="text-base sm:text-lg text-[#524C42] font-light leading-relaxed">
                    {chapter.copy}
                  </p>

                  {/* Impact highlights in understated badge format */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <div className="px-4 py-2.5 rounded-2xl bg-[#EDE8DE] border border-[#E0D8CB] text-xs">
                      <strong className="font-editorial text-base text-[#141414] block leading-tight">
                        {chapter.metricHighlight}
                      </strong>
                      <span className="text-[#6B6458] font-light">
                        {chapter.metricDesc}
                      </span>
                    </div>
                  </div>

                  {chapter.quoteText && (
                    <blockquote className="pl-4 border-l-2 border-[#141414] text-sm text-[#5C5549] italic font-reading">
                      “{chapter.quoteText}”
                    </blockquote>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedStory(chapter)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#141414] hover:text-[#5C5549] transition-colors cursor-pointer group"
                    >
                      <span>{t.readDoc}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Field Note Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F8F6F0] rounded-3xl max-w-xl w-full p-8 text-[#141414] relative shadow-2xl border border-[#E8E4D9]">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAE4D9] text-[#141414] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#857E74] font-semibold block mb-2">
              {t.modalRecord} • Chapter {selectedStory.chapterNumber}
            </span>

            <h3 className="font-editorial text-3xl font-medium text-[#141414] mb-4">
              {selectedStory.headline}
            </h3>

            <p className="text-sm sm:text-base text-[#524C42] font-light leading-relaxed mb-4">
              {selectedStory.copy}
            </p>

            {selectedStory.fieldNote && (
              <div className="p-4 rounded-2xl bg-[#EDE8DE] text-xs text-[#524C42] leading-relaxed mb-6">
                <strong className="block text-[#141414] font-semibold mb-1">{t.modalContext}</strong>
                {selectedStory.fieldNote}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E4D9]">
              <button
                onClick={() => setSelectedStory(null)}
                className="text-xs font-semibold uppercase tracking-wider text-[#736B5E]"
              >
                {t.closeView}
              </button>

              <button
                onClick={() => {
                  setSelectedStory(null);
                  onOpenJoin();
                }}
                className="px-6 py-2.5 rounded-full bg-[#141414] text-[#F8F6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2A26] transition-all"
              >
                {t.getInvolved}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
