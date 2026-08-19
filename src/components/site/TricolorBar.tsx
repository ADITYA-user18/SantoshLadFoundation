import { cn } from "@/lib/utils";

export function TricolorBar({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex overflow-hidden",
        orientation === "horizontal" ? "h-[3px] w-full" : "h-full w-[3px] flex-col",
        className,
      )}
    >
      <span className="flex-1 bg-saffron" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-forest" />
    </div>
  );
}

export function TricolorMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex h-2.5 w-2.5 overflow-hidden rounded-full", className)}
    >
      <span className="h-full w-1/3 bg-saffron" />
      <span className="h-full w-1/3 bg-white" />
      <span className="h-full w-1/3 bg-forest" />
    </span>
  );
}
