"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent } from "@/i18n/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LabourImpact() {
  const { labourInitiatives, labourIntro } = useContent();
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    stat: string;
    detail: string;
    text: string;
  } | null>(null);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <SectionHeading
        index={labourIntro.index}
        title={labourIntro.title}
        lead={labourIntro.lead}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {labourInitiatives.map((item, index) => {
          const isLong = item.text.length > 90;

          return (
            <Reveal key={item.title} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <article
                className={cn(
                  "group flex h-full flex-col justify-between rounded-[26px] border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,17,17,0.06)] md:p-7",
                )}
              >
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <p className="font-display text-4xl leading-none tracking-tight text-ink md:text-[42px]">
                      {item.stat}
                    </p>
                    <span
                      className={
                        index % 3 === 0
                          ? "mt-2 h-2 w-2 rounded-full bg-saffron"
                          : index % 3 === 1
                            ? "mt-2 h-2 w-2 rounded-full bg-forest"
                            : "mt-2 h-2 w-2 rounded-full bg-congress"
                      }
                    />
                  </div>
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.detail}
                  </p>
                  <p className="mt-3.5 line-clamp-3 text-sm leading-relaxed text-charcoal/90">
                    {item.text}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                  {isLong ? (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition hover:text-saffron-deep cursor-pointer"
                    >
                      <span>...more</span>
                      <ArrowRight size={13} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted transition hover:text-ink cursor-pointer"
                    >
                      <span>View detail</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-line bg-paper p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted transition hover:text-ink cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <span className="font-display text-4xl text-saffron-deep">
                {selectedItem.stat}
              </span>
              <Badge variant="navy">{selectedItem.detail}</Badge>
            </div>

            <h3 className="mt-4 font-display text-2xl text-ink">
              {selectedItem.title}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-charcoal">
              {selectedItem.text}
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItem(null)}
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
