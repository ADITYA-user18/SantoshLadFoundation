"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';
import { LanguageSwitcher } from '@/components/site/LanguageSwitcher';

interface NavbarProps {
  onOpenJoin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = foundationContent[locale].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E8E4D9] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 relative flex items-center justify-between">
        
        {/* Left Navigation Links (Shifted further right towards middle element) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest font-medium text-[#4A453E] lg:pl-24">
          <Link href={getHref('#philosophy')} className="hover:text-[#141414] transition-colors">{t.philosophy}</Link>
          <Link href={getHref('#focus-areas')} className="hover:text-[#141414] transition-colors">{t.focusAreas}</Link>
          <Link href={getHref('#chapters')} className="hover:text-[#141414] transition-colors">{t.stories}</Link>
        </nav>

        {/* Absolutely Centered Brand Title */}
        <Link
          href="/"
          className="text-center group focus:outline-none lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <span className="font-editorial text-xl sm:text-2xl tracking-tight text-[#141414] block leading-none">
            {t.brandTitle}
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#857E74] block mt-0.5 font-sans-clean font-medium">
            {t.brandSubtitle}
          </span>
        </Link>

        {/* Right Navigation Links & Primary CTA & Language Switcher */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 ml-auto">
          <Link href={getHref('#impact')} className="text-xs uppercase tracking-widest font-medium text-[#4A453E] hover:text-[#141414] transition-colors">
            {t.impact}
          </Link>
          <Link href={getHref('#crisis')} className="text-xs uppercase tracking-widest font-medium text-[#4A453E] hover:text-[#141414] transition-colors">
            {t.relief}
          </Link>
          <Link href={getHref('#founder')} className="text-xs uppercase tracking-widest font-medium text-[#4A453E] hover:text-[#141414] transition-colors">
            {t.founder}
          </Link>

          <button
            onClick={onOpenJoin}
            id="nav-cta-join"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#141414] text-[#F8F6F0] hover:bg-[#2C2A26] transition-all cursor-pointer shadow-sm group shrink-0"
          >
            <span>{t.contactUs}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Professional Circular Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile / Tablet Actions */}
        <div className="flex lg:hidden items-center gap-3 ml-auto">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#141414] hover:bg-[#EAE4D9] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F6F0] border-b border-[#E8E4D9] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="space-y-3 text-sm uppercase tracking-wider font-medium text-[#4A453E]">
            <Link href={getHref('#philosophy')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.philosophy}</Link>
            <Link href={getHref('#focus-areas')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.focusAreas}</Link>
            <Link href={getHref('#impact')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.impact}</Link>
            <Link href={getHref('#chapters')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.stories}</Link>
            <Link href={getHref('#crisis')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.relief}</Link>
            <Link href={getHref('#founder')} onClick={() => setMobileMenuOpen(false)} className="block py-1">{t.founder}</Link>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#141414] text-[#F8F6F0]"
            >
              <span>{t.contactUs}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
