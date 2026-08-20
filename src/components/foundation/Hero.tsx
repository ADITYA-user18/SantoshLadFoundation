"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';
import CircularGallery from '@/components/ui/CircularGallery';
import Magnet from '@/components/ui/Magnet';
import TextType from '@/components/ui/TextType';

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

  const headlinePhrases = locale === 'kn'
    ? ["ನಿಮ್ಮೊಂದಿಗೆ.", "ಪ್ರತಿ ಕ್ಷಣದಲ್ಲೂ.", "ಪ್ರತಿ ಹೋರಾಟದಲ್ಲೂ.", "ಪ್ರತಿ ಜಯದಲ್ಲೂ."]
    : ["every step.", "every journey.", "every struggle.", "every milestone."];

  return (
    <div className="bg-[#F8F6F0] text-[#141414]">

      {/* 1. INITIAL VIEWPORT FOLD (100vh) */}
      <section className="min-h-screen min-h-[100dvh] pt-20 sm:pt-16 lg:pt-16 pb-24 sm:pb-24 lg:pb-28 flex flex-col justify-center sm:justify-start items-center text-center overflow-hidden px-4 sm:px-8 lg:px-12 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center py-4 sm:py-2 my-auto sm:my-0">

          {/* Rotating Circular Hero Emblem with 2nd Image & Spinning Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-4 sm:mb-5 lg:mb-6 relative"
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-50 md:h-50 flex items-center justify-center group cursor-pointer select-none">
              {/* Blue Circular Frame with Rotating White Text */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                {/* Outer Glow & Shadow */}
                <div className="absolute inset-2 rounded-full bg-[#062058] shadow-[0_12px_32px_rgba(6,32,88,0.35)] transition-transform duration-500 group-hover:scale-105" />

                {/* SVG Rotating Text Ring */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full relative z-10 animate-[spin_18s_linear_infinite] pointer-events-none"
                >
                  <defs>
                    <path
                      id="heroTextCircle"
                      d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                    />
                  </defs>

                  {/* Blue Ring Backdrop */}
                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    className="fill-none stroke-[#062058] stroke-[28]"
                  />

                  {/* Outer & Inner Subtle Borders */}
                  <circle
                    cx="100"
                    cy="100"
                    r="89.5"
                    className="fill-none stroke-white/25 stroke-[1]"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="62.5"
                    className="fill-none stroke-white/25 stroke-[1]"
                  />

                  {/* Rotating White Curved Letters */}
                  <text
                    fill="#FFFFFF"
                    className="text-[9.5px] font-extrabold uppercase tracking-[0.22em] font-sans"
                  >
                    <textPath href="#heroTextCircle" startOffset="0%">
                      SANTOSH LAD FOUNDATION • KARNATAKA • SANTOSH LAD FOUNDATION • KARNATAKA •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central Rounded Person Portrait (2nd Image) */}
              <div className="relative z-10 w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] md:w-[136px] md:h-[136px] rounded-full overflow-hidden p-1 bg-white shadow-xl transition-transform duration-300 group-hover:scale-105 border-2 border-white/80">
                <img
                  src="/images/portraits/santosh-namaste-clean.png"
                  alt="Santosh Lad"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Editorial Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-2 sm:mb-2.5"
          >
            <span className="font-editorial text-lg sm:text-xl md:text-2xl text-[#5C5549] italic font-normal tracking-wide">
              {t.eyebrow}
            </span>
          </motion.div>

          {/* Major Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#141414] leading-tight sm:leading-tight whitespace-normal max-w-3xl px-3"
          >
            {t.headlineLead}{' '}
            <span className="font-normal font-editorial italic text-[#38322B] block sm:inline mt-0.5 sm:mt-0">
              <TextType
                key={locale}
                as="span"
                text={headlinePhrases}
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={2500}
                showCursor
                cursorCharacter="|"
                cursorBlinkDuration={0.6}
                loop
              />
            </span>
          </motion.h1>

          {/* Short Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-3.5 sm:mt-4 text-sm sm:text-base text-[#666055] font-light max-w-xl leading-relaxed px-4 sm:px-0"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 sm:mt-4 lg:mt-5 translate-y-0 sm:-translate-y-3 lg:-translate-y-4 flex items-center justify-center"
          >
            <Magnet padding={50} magnetStrength={3}>
              <button
                onClick={onExploreWork}
                id="hero-cta-explore"
                className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-[#141414] text-[#F8F6F0] text-sm font-semibold tracking-wide hover:bg-[#2C2A26] transition-all cursor-pointer shadow-lg group"
              >
                <span>{t.exploreCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnet>
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
          className="relative max-w-7xl mx-auto overflow-hidden"
        >
          {/* Side Fade Vignette Overlays matching reference image */}
          <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent pointer-events-none z-10" />

          <div style={{ height: '520px', position: 'relative' }}>
            <CircularGallery
              items={GALLERY_ITEMS}
              bend={2.5}
              textColor="#141414"
              borderRadius={0.02}
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
