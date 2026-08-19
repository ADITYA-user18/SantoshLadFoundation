"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { TricolorBar } from "@/components/site/TricolorBar";
import { Button } from "@/components/ui/button";
import { useContent } from "@/i18n/language";

// ---------------------------------------------------------------------------
// Morph-reveal constants (adapted from the Orbit poster spec)
// ---------------------------------------------------------------------------
const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 260; // 2x bigger blob radius to reveal more of underlying image
const TRAIL_NOISE_AMP = 70;
const TRAIL_BLOB_PTS = 28;
const TRAIL_FADE_SPEED = 0.85;
const TRAIL_SAMPLE_DIST = 10;

interface TrailPoint {
  x: number;
  y: number;
  r: number;
  alpha: number;
  seed: number;
}

function drawMorphBlob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  seed: number,
) {
  if (r < 2) return;

  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < TRAIL_BLOB_PTS; i++) {
    const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
    // Reduced speed multipliers for a smoother, slower morphing effect
    const n1 = Math.sin(angle * 3 + t * 0.45 + seed) * 0.45;
    const n2 = Math.sin(angle * 5 - t * 0.3 + seed * 2.3) * 0.3;
    const n3 = Math.cos(angle * 2 + t * 0.55 + seed * 0.7) * 0.25;
    const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
    const radius = r + noise;
    pts.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }

  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const mx = (curr.x + next.x) / 2;
    const my = (curr.y + next.y) / 2;
    if (i === 0) ctx.moveTo(mx, my);
    else ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
  }
  ctx.closePath();
  ctx.fill();
}

// ---------------------------------------------------------------------------
// MorphRevealImage component
// ---------------------------------------------------------------------------
interface MorphRevealImageProps {
  frontSrc: string;
  revealSrc: string;
  alt: string;
  className?: string;
}

function MorphRevealImage({
  frontSrc,
  revealSrc,
  alt,
  className = "",
}: MorphRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontOverlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    trail: [] as TrailPoint[],
    headRadius: 0,
    hovering: false,
    lastSample: { x: 0, y: 0 },
    time: 0,
    lastMouseCanvas: { x: 0, y: 0 },
  });

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const frontOverlay = frontOverlayRef.current;
    if (!canvas || !container || !frontOverlay) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    state.time += 0.016;

    // Lerp head radius
    const targetR = state.hovering ? TRAIL_HEAD_R : 0;
    const lerpSpeed = state.hovering ? 0.14 : 0.18;
    state.headRadius += (targetR - state.headRadius) * lerpSpeed;

    // Add new trail point when hovering and moved enough
    if (state.hovering && state.headRadius > 5) {
      const dx = state.lastMouseCanvas.x - state.lastSample.x;
      const dy = state.lastMouseCanvas.y - state.lastSample.y;
      if (Math.sqrt(dx * dx + dy * dy) > TRAIL_SAMPLE_DIST) {
        state.trail.push({
          x: state.lastMouseCanvas.x,
          y: state.lastMouseCanvas.y,
          r: state.headRadius,
          alpha: 1,
          seed: Math.random() * 100,
        });
        if (state.trail.length > TRAIL_MAX_POINTS) state.trail.shift();
        state.lastSample = { ...state.lastMouseCanvas };
      }
    }

    // Decay trail
    state.trail = state.trail.filter((p) => {
      p.alpha *= TRAIL_FADE_SPEED;
      p.r *= 0.995;
      return p.alpha > 0.01;
    });

    // Clear canvas
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw white fill over entire canvas (represents front image fully visible)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // Punch holes with destination-out blobs (removes front image in those areas)
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(255,255,255,1)";

    // Draw head blob
    if (state.headRadius > 2) {
      ctx.globalAlpha = 1;
      drawMorphBlob(
        ctx,
        state.lastMouseCanvas.x,
        state.lastMouseCanvas.y,
        state.headRadius,
        state.time,
        42,
      );
    }

    // Draw trail blobs
    for (const pt of state.trail) {
      ctx.globalAlpha = pt.alpha;
      drawMorphBlob(ctx, pt.x, pt.y, pt.r, state.time, pt.seed);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    // Apply canvas as mask to the front overlay
    frontOverlay.style.maskImage = `url(${canvas.toDataURL()})`;
    frontOverlay.style.webkitMaskImage = `url(${canvas.toDataURL()})`;
    frontOverlay.style.maskSize = "100% 100%";
    frontOverlay.style.webkitMaskSize = "100% 100%";

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);

    const toCanvasCoords = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.lastMouseCanvas = toCanvasCoords(e.clientX, e.clientY);
    };
    const onMouseEnter = (e: MouseEvent) => {
      stateRef.current.hovering = true;
      stateRef.current.lastMouseCanvas = toCanvasCoords(e.clientX, e.clientY);
      stateRef.current.lastSample = toCanvasCoords(e.clientX, e.clientY);
    };
    const onMouseLeave = () => {
      stateRef.current.hovering = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [tick]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* LAYER 1 — Reveal image (always behind, always fully visible) */}
      <div className="absolute inset-0">
        <Image
          src={revealSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover object-[42%_center]"
          priority
        />
      </div>

      {/* LAYER 2 — Front image (masked by canvas blob trail) */}
      <div
        ref={frontOverlayRef}
        className="absolute inset-0"
        style={{ maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
      >
        <Image
          src={frontSrc}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover object-[42%_center]"
        />
      </div>

      {/* Hidden canvas — drives the mask */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* Hover hint label */}
      <div
        className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 pointer-events-none select-none"
        style={{
          transition: "opacity 0.4s ease",
        }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-saffron animate-pulse" />
        Hover to reveal
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export function Hero() {
  const { hero, floatingCard, site } = useContent();
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    const card = cardRef.current;
    if (!root || !text || !card) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(rect.height * 0.85, 1)),
      );
      const ease = 1 - Math.pow(1 - progress, 1.65);
      text.style.transform = `translate3d(0, ${ease * -56}px, 0)`;
      card.style.transform = `translate3d(0, ${ease * -24}px, 0)`;
      card.style.opacity = String(Math.max(0.18, 1 - ease * 0.55));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col px-3 pt-[72px] sm:px-5 md:flex-1 md:min-h-0 md:pt-[68px] md:pb-0 md:px-6 lg:px-8"
    >
      {/* Hero card */}
      <div className="relative flex flex-col min-h-0 md:flex-1 overflow-hidden rounded-[24px] bg-surface sm:rounded-[28px] md:rounded-[36px]">
        <div className="texture-grain texture-fine pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] md:rounded-[36px]" />
        <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-black/5 md:rounded-[36px]" />

        {/* Inner grid */}
        <div className="relative z-20 flex flex-col md:h-full md:grid md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-2 px-3 pb-4 pt-3 sm:gap-4 sm:px-6 sm:pb-6 sm:pt-5 md:gap-2 md:px-7 md:pb-4 md:pt-4 lg:px-9 lg:pb-5 lg:pt-5">

          {/* LEFT: text + CTAs */}
          <div
            ref={textRef}
            className="order-2 flex flex-col justify-center md:order-1 px-0.5 py-0 sm:p-0 md:pr-4 lg:pr-6 xl:pl-[14%] 2xl:pl-[18%]"
            style={{ willChange: "transform" }}
          >
            <p className="mb-1 sm:mb-4 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.24em] text-saffron-deep">
              {hero.eyebrow}
            </p>
            <h1 className="w-full font-display text-[36px] leading-[1.04] tracking-[-0.03em] text-ink sm:max-w-[14ch] sm:text-[38px] sm:leading-[1.05] md:text-[36px] lg:text-[44px] xl:text-[56px] 2xl:text-[68px]">
              {hero.lineOne}
              <span className="mt-1 block text-forest sm:mt-0.5">{hero.lineTwo}</span>
            </h1>
            <p className="mt-1 sm:mt-3 md:mt-2 max-w-md text-[14px] sm:text-sm md:text-[13px] lg:text-[15px] xl:text-base text-charcoal leading-relaxed">
              {hero.description}
            </p>
            <div className="mt-3 sm:mt-5 md:mt-3 flex flex-row gap-2 sm:gap-3 flex-wrap">
              <Button asChild variant="saffron" size="lg" className="rounded-full flex-1 sm:flex-none sm:w-auto justify-center h-10 md:h-10 lg:h-11 text-sm lg:text-base px-3.5 sm:px-5">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-forest/40 text-forest-deep hover:bg-forest/10 hover:border-forest flex-1 sm:flex-none sm:w-auto justify-center h-10 md:h-10 lg:h-11 text-sm lg:text-base px-3.5 sm:px-5">
                <Link href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: dual morph-reveal photo */}
          <div className="group relative order-1 mx-auto w-full max-w-[420px] sm:max-w-[540px] md:order-2 md:mx-0 md:w-full md:max-w-none md:h-full">
            <MorphRevealImage
              frontSrc="/images/portraits/hero-podium.jpg"
              revealSrc="/images/portraits/hero-labour.jpg"
              alt={`${site.name}, ${site.role}`}
              className="aspect-[4/3] w-full sm:aspect-[4/3] md:aspect-auto md:h-full rounded-[16px] sm:rounded-[22px] shadow-[0_20px_40px_rgba(17,17,17,0.12)]"
            />

            {/* Floating info card — compact on mobile, full on desktop */}
            <Link
              ref={cardRef}
              href={floatingCard.href}
              className="absolute top-2 right-2 z-20 w-[120px] overflow-hidden rounded-xl bg-navy/92 p-2 text-white shadow-[0_12px_28px_rgba(14,28,64,0.32)] backdrop-blur-md will-change-transform sm:top-auto sm:bottom-3 sm:right-3 sm:w-[160px] sm:rounded-3xl sm:p-3 md:bottom-4 md:right-3 md:w-[180px] md:p-3.5 lg:w-[200px] lg:p-4 lg:right-4"
            >
              <TricolorBar className="absolute inset-x-0 top-0" />
              <div className="flex items-start justify-between">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-saffron leading-tight">
                  {floatingCard.eyebrow}
                </p>
                <ArrowUpRight size={11} className="text-white/70 shrink-0 sm:w-[13px] md:w-[15px]" />
              </div>
              <p className="mt-1.5 sm:mt-2 md:mt-2.5 font-display text-[13px] sm:text-[16px] md:text-xl leading-tight">
                {floatingCard.title}
              </p>
              <ul className="mt-1.5 sm:mt-2 md:mt-3 space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] md:text-[12px] text-white/70">
                {floatingCard.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
