"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { House, Image as ImageIcon, Newspaper } from "lucide-react";
import { useContent } from "@/i18n/language";
import { cn } from "@/lib/utils";

const EASE = "power3.out";

/**
 * Editorial Bottom Navigation Bar - Aligned with Santosh Lad Foundation Palette
 * Base Text: #5C5549
 * Active/Hover Fill: #141414 (Charcoal Obsidian) with #FFFFFF text
 * Container: Warm Cream #F8F6F0 with delicate border #E8E4D9
 */
export function BottomNavigation() {
  const pathname = usePathname();
  const { ui } = useContent();
  const { resolvedTheme } = useTheme();

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const tweenRefs = useRef<(gsap.core.Tween | null)[]>([]);

  const items = [
    {
      href: "/",
      label: ui.home,
      icon: House,
      baseColor: "text-[#5C5549] dark:text-white/70 font-medium hover:text-[#141414]",
      activeColor: "text-white dark:text-white font-semibold",
      bubbleBg: "#141414", // Deep obsidian dark charcoal matching primary CTA
      hoverTextColor: "#ffffff",
      hoverIconColor: "#ffffff",
      match: (p: string) => p === "/",
    },
    {
      href: "/latest",
      label: ui.latestFeed,
      icon: Newspaper,
      baseColor: "text-[#5C5549] dark:text-white/70 font-medium hover:text-[#141414]",
      activeColor: "text-white dark:text-white font-semibold",
      bubbleBg: "#141414", // Deep obsidian dark charcoal matching primary CTA
      hoverTextColor: "#ffffff",
      hoverIconColor: "#ffffff",
      match: (p: string) => p.startsWith("/latest"),
    },
    {
      href: "/gallery",
      label: ui.gallery,
      icon: ImageIcon,
      baseColor: "text-[#5C5549] dark:text-white/70 font-medium hover:text-[#141414]",
      activeColor: "text-white dark:text-white font-semibold",
      bubbleBg: "#141414", // Deep obsidian dark charcoal matching primary CTA
      hoverTextColor: "#ffffff",
      hoverIconColor: "#ffffff",
      match: (p: string) => p.startsWith("/gallery"),
    },
  ] as const;

  /* ─── Build/rebuild GSAP timelines ─── */
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const { width: w, height: h } = pill.getBoundingClientRect();

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const labelBase = pill.querySelector<HTMLElement>(".nav-text");
        const labelHover = pill.querySelector<HTMLElement>(".nav-text-hover");
        const iconBase = pill.querySelector<HTMLElement>(".nav-icon");
        const iconHover = pill.querySelector<HTMLElement>(".nav-icon-hover");

        if (labelBase) gsap.set(labelBase, { y: 0, opacity: 1 });
        if (labelHover) gsap.set(labelHover, { y: h + 12, opacity: 0 });
        if (iconBase) gsap.set(iconBase, { y: 0, opacity: 1 });
        if (iconHover) gsap.set(iconHover, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.15, xPercent: -50, duration: 0.55, ease: EASE }, 0);
        if (labelBase) tl.to(labelBase, { y: -(h + 8), opacity: 0, duration: 0.4, ease: EASE }, 0);
        if (labelHover) tl.to(labelHover, { y: 0, opacity: 1, duration: 0.4, ease: EASE }, 0.05);
        if (iconBase) tl.to(iconBase, { y: -(h + 8), opacity: 0, duration: 0.4, ease: EASE }, 0);
        if (iconHover) tl.to(iconHover, { y: 0, opacity: 1, duration: 0.4, ease: EASE }, 0.05);

        tlRefs.current[i] = tl;

        if (items[i].match(pathname)) {
          tl.progress(1);
        } else {
          tl.progress(0);
        }
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => { });
    return () => window.removeEventListener("resize", layout);
  }, [resolvedTheme]);

  /* ─── Sync active tab bubble state on route change ─── */
  useEffect(() => {
    items.forEach((item, i) => {
      const active = item.match(pathname);
      const tl = tlRefs.current[i];
      if (!tl) return;
      tweenRefs.current[i]?.kill();
      if (active) {
        tweenRefs.current[i] = tl.tweenTo(tl.duration(), {
          duration: 0.35,
          ease: EASE,
          overwrite: "auto",
        });
      } else {
        tweenRefs.current[i] = tl.tweenTo(0, {
          duration: 0.28,
          ease: EASE,
          overwrite: "auto",
        });
      }
    });
  }, [pathname]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    tweenRefs.current[i]?.kill();
    tweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.28,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const active = items[i].match(pathname);
    if (active) return; // Keep active item's bubble fixed!

    const tl = tlRefs.current[i];
    if (!tl) return;
    tweenRefs.current[i]?.kill();
    tweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.22,
      ease: EASE,
      overwrite: "auto",
    });
  };

  return (
    <nav
      aria-label="Primary experience"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-full p-1.5 backdrop-blur-xl transition-colors duration-500 border border-[#141414]/15 bg-[#F8F6F0]/90 text-[#141414] shadow-[0_16px_48px_rgba(0,0,0,0.10)] dark:border-white/20 dark:bg-[#141414]/95 dark:text-white"
      >
        {items.map((item, i) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.href === "/") {
                  if (window.location.hash) {
                    window.history.replaceState(null, "", "/");
                  }
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              className={cn(
                "relative flex items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-2.5 text-[12px] sm:gap-2 sm:px-4.5 sm:text-[13px] md:px-5.5 transition-colors",
                active ? item.activeColor : item.baseColor
              )}
            >
              {/* Liquid bubble — deep obsidian fill matching website primary theme */}
              <span
                ref={(el) => { circleRefs.current[i] = el; }}
                aria-hidden="true"
                className="absolute left-1/2 rounded-full will-change-transform"
                style={{ background: item.bubbleBg }}
              />

              {/* Icon — stacked pair so hover-coloured icon slides up with the bubble */}
              <span className="relative z-10 shrink-0 overflow-hidden" style={{ width: 15, height: 15 }}>
                {/* Base icon */}
                <Icon size={15} strokeWidth={1.75} className="nav-icon block" />
                {/* Hover icon */}
                <Icon
                  size={15}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="nav-icon-hover absolute inset-0"
                  style={{ color: item.hoverIconColor }}
                />
              </span>

              {/* Stacked label pair */}
              <span className="relative z-10 h-[1.1em] overflow-hidden leading-none">
                <span className="nav-text block">{item.label}</span>
                <span
                  className="nav-text-hover absolute left-0 top-0 block font-semibold"
                  style={{ color: item.hoverTextColor }}
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
