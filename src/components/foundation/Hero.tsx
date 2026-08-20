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
      <section className="min-h-screen min-h-[100dvh] pt-16 sm:pt-14 lg:pt-14 xl:pt-14 pb-20 sm:pb-20 lg:pb-20 xl:pb-20 flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-8 lg:px-12 relative">
        <div className="max-w-4xl xl:max-w-5xl mx-auto flex flex-col items-center py-2 my-auto">

          {/* Rotating Circular Hero Emblem with 2nd Image & Spinning Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-3 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-5 2xl:mb-5 min-[1921px]:mb-7 relative"
          >
            <div className="relative w-36 h-36 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-48 xl:h-48 2xl:w-48 2xl:h-48 min-[1921px]:w-56 min-[1921px]:h-56 flex items-center justify-center group cursor-pointer select-none">
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
              <div className="relative z-10 w-[96px] h-[96px] sm:w-[70px] sm:h-[70px] md:w-[76px] md:h-[76px] lg:w-[82px] lg:h-[82px] xl:w-[132px] xl:h-[132px] 2xl:w-[132px] 2xl:h-[132px] min-[1921px]:w-[156px] min-[1921px]:h-[156px] rounded-full overflow-hidden p-1 bg-white shadow-xl transition-transform duration-300 group-hover:scale-105 border-2 border-white/80">
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
            className="mb-1.5 sm:mb-1.5 lg:mb-2 xl:mb-3"
          >
            <span className="font-editorial text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#5C5549] italic font-normal tracking-wide">
              {t.eyebrow}
            </span>
          </motion.div>

          {/* Major Headline - Fixed height container to eliminate layout shift */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-6xl 2xl:text-7xl font-sans font-semibold tracking-tight text-[#141414] leading-tight sm:leading-tight whitespace-normal max-w-3xl xl:max-w-4xl px-3 min-h-[2.4em] sm:min-h-[2.2em] lg:min-h-[2.2em] flex flex-col sm:flex-row items-center justify-center flex-wrap"
          >
            <span>{t.headlineLead}&nbsp;</span>
            <span className="font-normal font-editorial italic text-[#38322B] inline-block text-center sm:text-left align-baseline whitespace-nowrap min-w-[8ch] sm:min-w-[12ch]">
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
            className="mt-2.5 sm:mt-2.5 lg:mt-3 xl:mt-3.5 2xl:mt-3.5 min-[1921px]:mt-6 text-sm sm:text-[11px] md:text-xs lg:text-sm xl:text-sm 2xl:text-sm min-[1921px]:text-lg text-[#666055] font-light max-w-lg lg:max-w-xl xl:max-w-xl min-[1921px]:max-w-2xl leading-relaxed px-4 sm:px-0"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 sm:mt-3.5 lg:mt-4 xl:mt-7 2xl:mt-8 flex items-center justify-center"
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
