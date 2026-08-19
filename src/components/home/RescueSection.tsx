"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, ArrowRight, X, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RescueSection() {
  const { rescue } = useContent();
  const [selectedOp, setSelectedOp] = useState<{
    name: string;
    year: string;
    image: string;
    text: string;
  } | null>(null);

  return (
    <section id="work" className="bg-[#0b1428] py-16 text-white sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-saffron">
            {rescue.kicker}
          </p>
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[64px]">
            {rescue.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
            {rescue.lead} {rescue.body}
          </p>
        </div>

        {/* 4 Identical, Symmetrical Cards with top-framed photos */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {rescue.operations.map((operation, index) => {
            const isLongText = operation.text.length > 95;

            return (
              <Reveal key={operation.name} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/15 bg-white/5 shadow-lg transition-all duration-300 hover:border-saffron/50 hover:bg-white/10 hover:-translate-y-1">
                  {/* Photo with natural top framing */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                    <Image
                      src={operation.image}
                      alt={operation.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1428]/90 via-black/10 to-transparent pointer-events-none" />

                    {/* Location Badge */}
                    <div className="absolute inset-x-0 bottom-0 p-4 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-saffron min-w-0">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{operation.year}</span>
                      </div>
                      <h3 className="mt-1 font-display text-2xl text-white break-words hyphens-auto">
                        {operation.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body with uniform fixed clamp & modal view */}
                  <div className="flex flex-1 flex-col justify-between p-5 min-w-0">
                    <p className="line-clamp-3 text-sm leading-relaxed text-white/80 break-words">
                      {operation.text}
                    </p>

                    <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      {isLongText ? (
                        <button
                          type="button"
                          onClick={() => setSelectedOp(operation)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-saffron transition hover:text-white cursor-pointer"
                        >
                          <span>...more</span>
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedOp(operation)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition hover:text-saffron cursor-pointer"
                        >
                          <span>View mission</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOp && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedOp(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-[#0b1428] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-black/60">
              <Image
                src={selectedOp.image}
                alt={selectedOp.name}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1428]/95 via-transparent to-transparent pointer-events-none" />
              <button
                type="button"
                onClick={() => setSelectedOp(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black cursor-pointer"
                aria-label="Close"
              >
                <X size={17} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2">
                  <Badge variant="saffron">{selectedOp.year}</Badge>
                  <span className="flex items-center gap-1 text-xs text-white/90">
                    <ShieldCheck size={13} className="text-forest" />
                    Rescue & Humanitarian Mission
                  </span>
                </div>
                <h3 className="mt-2 font-display text-3xl text-white">
                  {selectedOp.name}
                </h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-base leading-relaxed text-white/90">
                {selectedOp.text}
              </p>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="saffron"
                  size="sm"
                  onClick={() => setSelectedOp(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
