"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent } from "@/i18n/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DistrictSection() {
  const { district } = useContent();
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    text: string;
  } | null>(null);

  return (
    <section id="district" className="bg-surface/80 py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          index={district.index}
          title={district.title}
          lead={district.lead}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {district.cards.map((card, index) => {
            const isLong = card.text.length > 110;

            return (
              <Reveal key={card.title} delay={(index + 1) as 1 | 2 | 3}>
                <article className="flex h-full flex-col justify-between rounded-[28px] border border-line bg-paper p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <span
                      className={
                        index === 0
                          ? "mb-6 block h-1 w-10 rounded-full bg-saffron"
                          : index === 1
                            ? "mb-6 block h-1 w-10 rounded-full bg-forest"
                            : "mb-6 block h-1 w-10 rounded-full bg-congress"
                      }
                    />
                    <h3 className="font-display text-2xl leading-snug text-ink md:text-[26px]">
                      {card.title}
                    </h3>
                    <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-charcoal">
                      {card.text}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                    {isLong ? (
                      <button
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-saffron-deep cursor-pointer"
                      >
                        <span>...more</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted transition hover:text-ink cursor-pointer"
                      >
                        <span>View initiative</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* District Detail Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-line bg-paper p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted transition hover:text-ink cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <span className="inline-block h-1 w-10 rounded-full bg-saffron mb-4" />
            <h3 className="font-display text-2xl text-ink md:text-3xl">
              {selectedCard.title}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-charcoal">
              {selectedCard.text}
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCard(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
