"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent, useLanguage } from "@/i18n/language";

export function Timeline() {
  const { journey } = useContent();
  const { locale } = useLanguage();

  return (
    <section id="journey" className="bg-surface/70 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          index={journey.index}
          title={journey.title}
          lead={journey.lead}
        />

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[32px] border border-saffron/30 bg-gradient-to-br from-paper via-surface to-paper p-8 sm:p-12 md:p-16 shadow-xl">
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-semibold text-saffron-deep">
                <Sparkles size={14} />
                <span>{locale === "kn" ? "ಅಂತರ್ಕ್ರಿಯೆ ಕಾಲಾನುಕ್ರಮ" : "Interactive 3D Timeline"}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-tight">
                {locale === "kn"
                  ? "2002 ರಿಂದ ಇಂದಿನವರೆಗಿನ ರಾಜಕೀಯ ಪಯಣವನ್ನು ವೀಕ್ಷಿಸಿ"
                  : "Experience the Political Journey (2002 – Present)"}
              </h3>
              <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed">
                {locale === "kn"
                  ? "ಸಂಡೂರು ಪಟ್ಟಣ ಪುರಸಭೆಯಿಂದ ಆರಂಭಿಸಿ, ಶಾಸಕರಾಗಿ, ಮಂತ್ರಿಗಳಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದ ಪ್ರತಿಯೊಂದು ಐತಿಹಾಸಿಕ ಘಟ್ಟವನ್ನು ನೂತನ 3D ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಅನುಭವಿಸಿ."
                  : "Explore every milestone of public service from Sandur Municipal Council to Legislative Assembly and Cabinet Ministry in a high-fidelity 3D interactive timeline."}
              </p>

              <div className="pt-4">
                <Link
                  href="/timeline"
                  className="inline-flex items-center gap-3 rounded-2xl bg-saffron text-navy font-bold px-7 py-4 text-sm sm:text-base shadow-lg transition-all duration-300 hover:bg-saffron-deep hover:text-white hover:scale-[1.02]"
                >
                  <span>{locale === "kn" ? "ಕಾಲಾನುಕ್ರಮ ಪುಟಕ್ಕೆ ಹೋಗಿ" : "Open 3D Timeline"}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
