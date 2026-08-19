"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useContent } from "@/i18n/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DevelopmentSection() {
  const { development } = useContent();
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    image: string;
    text: string;
    stat?: string;
    statLabel?: string;
  } | null>(null);

  return (
    <section id="constituency" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <SectionHeading
        index={development.index}
        title={development.title}
        lead={development.lead}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {development.projects.map((project, index) => {
          const isLongText = project.text.length > 130;

          return (
            <Reveal key={project.title} delay={(index % 2 === 0 ? 1 : 2) as 1 | 2}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,17,17,0.08)]">
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    {/* Stat badge sits ABOVE title — avoids side-by-side overflow on mobile */}
                    {"stat" in project && project.stat ? (
                      <div className="mb-3 flex items-center gap-2 flex-wrap">
                        <span className="font-display text-2xl leading-none text-saffron-deep">
                          {project.stat}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-muted leading-tight">
                          {project.statLabel}
                        </span>
                      </div>
                    ) : null}

                    <h3 className="font-display text-2xl text-ink md:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-charcoal md:text-[15px]">
                      {project.text}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                    {isLongText ? (
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition hover:text-saffron-deep cursor-pointer"
                      >
                        <span>...more</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted transition hover:text-ink cursor-pointer"
                      >
                        <span>View project</span>
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-line bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-surface">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover object-top"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black cursor-pointer"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-ink md:text-3xl">
                  {selectedProject.title}
                </h3>
                {selectedProject.stat && (
                  <Badge variant="saffron" className="text-xs">
                    {selectedProject.stat} {selectedProject.statLabel}
                  </Badge>
                )}
              </div>
              <p className="mt-4 text-base leading-relaxed text-charcoal">
                {selectedProject.text}
              </p>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
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
