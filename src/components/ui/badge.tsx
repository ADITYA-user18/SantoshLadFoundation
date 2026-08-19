import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-navy text-white shadow-sm",
        secondary:
          "border-line bg-surface text-charcoal",
        destructive:
          "border-transparent bg-red-500 text-white",
        outline: "border-line text-charcoal",
        saffron:
          "border-saffron/30 bg-saffron/10 text-saffron-deep font-medium",
        forest:
          "border-forest/30 bg-forest/10 text-forest-deep font-medium",
        navy:
          "border-navy/20 dark:border-sky-400/30 bg-navy/8 dark:bg-sky-400/10 text-navy dark:text-sky-300 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
