import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "left",
}: {
  index?: string;
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center mx-auto")}>
      {kicker ? (
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-[3px] w-10 overflow-hidden rounded-full">
            <span className="flex-1 bg-saffron" />
            <span className="flex-1 bg-paper" />
            <span className="flex-1 bg-forest" />
          </span>
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            {kicker}
          </span>
        </div>
      ) : null}
      <h2
        className={cn(
          "max-w-4xl font-display text-3xl leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[64px]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 sm:mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
