"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';
import CircularGallery from '@/components/ui/CircularGallery';

interface HeroProps {
  onExploreWork: () => void;
  onOpenJoin: () => void;
}

const GALLERY_ITEMS = [
  { image: '/images/portraits/hero-close.jpg', text: 'Agrarian Dignity' },
  { image: '/images/work/children.jpg', text: 'Youth Education' },
  { image: '/images/work/gig-meet.jpg', text: 'Elderly Care' },
  { image: '/images/portraits/namaste.jpg', text: 'Daily Nutrition' },
  { image: '/images/work/health-van.jpg', text: 'Every Ability' },
  { image: '/images/work/students.jpg', text: 'Livelihood Pride' },
  { image: '/images/rescue/uttarakhand.jpeg', text: 'Community Ties' },
];

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenJoin }) => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].hero;

  return (
    <div className="bg-[#F8F6F0] text-[#141414]">
      
      {/* 1. INITIAL VIEWPORT FOLD (100vh) */}
      <section className="min-h-screen min-h-[100dvh] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-8 lg:px-12 relative">
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center my-auto">
          
          {/* Official Circular Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-2 sm:mb-4 relative"
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center group cursor-pointer">
              {/* Rotating thin border */}
              <div className="absolute inset-0 rounded-full p-[1.5px] bg-[conic-gradient(from_0deg,#141414_0%,#A8A29E_50%,#141414_100%)] animate-[spin_12s_linear_infinite] shadow-xl" />

              {/* Static Image Container */}
              <div className="relative z-10 w-[calc(100%-3px)] h-[calc(100%-3px)] rounded-full overflow-hidden p-1 bg-white transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/brand/foundation-seal.png"
                  alt="Santosh Lad Foundation Official Seal"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Editorial Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-1.5 sm:mb-2"
          >
            <span className="font-editorial text-base sm:text-xl md:text-2xl text-[#5C5549] italic font-normal tracking-wide">
              {t.eyebrow}
            </span>
          </motion.div>

          {/* Major Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#141414] leading-tight whitespace-normal max-w-3xl"
          >
            {t.headlineLead} <span className="font-normal font-editorial italic text-[#38322B]">{t.headlineItalic}</span>
          </motion.h1>

          {/* Short Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2.5 sm:mt-4 text-xs sm:text-sm lg:text-base text-[#666055] font-light max-w-xl leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 sm:mt-6 flex items-center justify-center"
          >
            <button
              onClick={onExploreWork}
              id="hero-cta-explore"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#141414] text-[#F8F6F0] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#2C2A26] transition-all cursor-pointer shadow-md group"
            >
              <span>{t.exploreCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. GALLERY & PILLARS SECTION - Concave Bowl Curve matching exact reference image */}
      <section className="pt-6 sm:pt-10 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* React Bits Circular Gallery WebGL Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative max-w-7xl mx-auto"
        >
          <div style={{ height: '460px', position: 'relative' }}>
            <CircularGallery
              items={GALLERY_ITEMS}
              bend={2.5}
              textColor="#141414"
              borderRadius={0.06}
              scrollEase={0.05}
              font="bold 22px Figtree"
              scrollSpeed={2}
            />
          </div>
        </motion.div>

        {/* 3 Minimal Text Columns Below the Gallery */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left max-w-5xl mx-auto pt-10 border-t border-[#E8E4D9]">
          {t.cols.map((col, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-[#141414] tracking-tight uppercase mb-2">
                {col.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666055] font-light leading-relaxed">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Hero;
