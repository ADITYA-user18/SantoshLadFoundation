import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0e1c40] text-white shadow-[0_4px_16px_rgba(14,28,64,0.18)] hover:bg-[#0e1c40]/90 dark:bg-saffron dark:text-[#0e1c40] dark:font-semibold dark:hover:bg-saffron-deep hover:-translate-y-0.5",
        saffron:
          "bg-saffron text-[#0e1c40] font-semibold shadow-[0_8px_20px_rgba(255,153,51,0.28)] hover:bg-saffron-deep hover:shadow-[0_12px_26px_rgba(255,153,51,0.38)] hover:-translate-y-0.5",
        forest:
          "bg-forest text-white font-medium shadow-[0_6px_20px_rgba(19,136,8,0.24)] hover:bg-forest-deep hover:shadow-[0_8px_24px_rgba(19,136,8,0.32)] hover:-translate-y-0.5",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-line bg-paper text-charcoal shadow-sm hover:bg-surface hover:text-ink hover:border-navy/30 dark:bg-slate-900/60 dark:text-slate-100 dark:border-slate-700",
        secondary:
          "bg-surface text-charcoal hover:bg-surface/80 hover:text-ink dark:bg-slate-800 dark:text-slate-100",
        ghost:
          "hover:bg-surface hover:text-ink dark:hover:bg-slate-800 dark:hover:text-slate-100",
        link:
          "text-navy dark:text-saffron underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-7 text-base font-semibold",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
