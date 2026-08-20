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

      {/* 1. INITIAL VIEWPORT FOLD (100vh) — Logo + Single-Line Headline + Animated Gallery */}
      <section className="h-[100dvh] min-h-[100dvh] pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-4 sm:pb-6 flex flex-col justify-start items-center text-center overflow-hidden px-4 sm:px-8 lg:px-12 relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-start h-full py-1 relative">

          {/* Top Rotating Circular Hero Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mt-2 sm:mt-3 lg:mt-4 xl:mt-5 mb-0 relative shrink-0 z-20"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center group cursor-pointer select-none">
              {/* Blue Circular Frame with Rotating White Text */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                {/* Outer Glow & Shadow */}
                <div className="absolute inset-1.5 rounded-full bg-[#062058] shadow-[0_10px_28px_rgba(6,32,88,0.3)] transition-transform duration-500 group-hover:scale-105" />

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

              {/* Central Rounded Person Portrait */}
              <div className="relative z-10 w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] md:w-[72px] md:h-[72px] lg:w-[82px] lg:h-[82px] xl:w-[94px] xl:h-[94px] rounded-full overflow-hidden p-1 bg-white shadow-xl transition-transform duration-300 group-hover:scale-105 border-2 border-white/80">
                <img
                  src="/images/portraits/santosh-namaste-clean.png"
                  alt="Santosh Lad"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Compact Single-Line Animated Headline Directly Below Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 mb-1 lg:mt-3 lg:mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-sans font-semibold tracking-tight text-[#141414] inline-flex items-center justify-center whitespace-nowrap z-20 shrink-0 px-2"
          >
            <span>{t.headlineLead}&nbsp;</span>
            <span className="font-normal font-editorial italic text-[#38322B] inline-block text-left align-baseline whitespace-nowrap min-w-[8ch] sm:min-w-[12ch]">
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

          {/* Animated 3D Concave Circular Gallery Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-7xl mx-auto flex-1 min-h-0 flex items-center justify-center overflow-hidden -mt-2 sm:-mt-4 lg:-mt-8 xl:-mt-10 my-auto"
          >
            {/* Side Fade Vignette Overlays matching reference image */}
            <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-28 lg:w-36 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-28 lg:w-36 bg-gradient-to-l from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent pointer-events-none z-10" />

            <div className="w-full h-[330px] sm:h-[370px] md:h-[400px] lg:h-[440px] xl:h-[470px] relative">
              <CircularGallery
                items={GALLERY_ITEMS}
                bend={2.5}
                textColor="#FFFFFF"
                borderRadius={0.02}
                scrollEase={0.05}
                font="bold 22px Figtree"
                scrollSpeed={2}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. TEXT CONTENT & PILLARS SECTION — Positioned Below the Initial Gallery Viewport */}
      <section className="pt-12 sm:pt-16 pb-20 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 text-center border-t border-[#E8E4D9]">
        
        {/* Supporting Statement — Larger & Darker */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2C2A26] font-normal max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
        >
          {t.description}
        </motion.p>

        {/* Explore Our Work CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex items-center justify-center"
        >
          <Magnet padding={50} magnetStrength={3}>
            <button
              onClick={onExploreWork}
              id="hero-cta-explore"
              className="inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-[#141414] text-[#F8F6F0] text-sm sm:text-base font-semibold tracking-wide hover:bg-[#2C2A26] transition-all cursor-pointer shadow-lg group"
            >
              <span>{t.exploreCta}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnet>
        </motion.div>

        {/* 3 Minimal Text Columns Below the CTA */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left pt-12 border-t border-[#E8E4D9]">
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

