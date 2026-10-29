"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import clsx from "clsx";

// For a video slide, `src` is the poster image and `video` lists sources in order of preference
export type Slide = { src: string; title: string; video?: string[] };

const SLIDE_INTERVAL_MS = 5000;

function NavButton({ dir, onClick, large }: { dir: "prev" | "next"; onClick: () => void; large?: boolean }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center transition-colors",
        large
          ? "w-11 h-11 md:w-14 md:h-14 bg-white/10 text-white hover:bg-white hover:text-ink"
          : "w-9 h-9 bg-paper/95 text-ink border border-rule shadow-sm hover:text-cobalt hover:border-cobalt",
        dir === "prev" ? (large ? "left-2 md:left-6" : "left-3") : (large ? "right-2 md:right-6" : "right-3")
      )}
    >
      <Icon size={large ? 24 : 18} />
    </button>
  );
}

export default function ImageCarousel({ slides, alt, aspectRatio = "16 / 9" }: { slides: Slide[]; alt: string; aspectRatio?: string }) {
  const multi = slides.length > 1;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback((delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!multi || hovered || expanded || reduceMotion || slides[index].video) return;
    const timer = setInterval(() => go(1), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [multi, hovered, expanded, reduceMotion, go, index, slides]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, go]);

  const slide = slides[index];
  const offset = reduceMotion ? 0 : 40;
  const slideMotion = {
    initial: { opacity: 0, x: direction * offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction * -offset },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <figure
        className="overflow-hidden rounded-xl border border-rule bg-paper"
        role="region"
        aria-roledescription={multi ? "carousel" : undefined}
        aria-label={alt}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative cursor-zoom-in overflow-hidden bg-surface"
          style={{ aspectRatio }}
          role="button"
          tabIndex={0}
          aria-label={slide.video ? `Play video: ${slide.title}` : `Open full screen: ${slide.title}`}
          onClick={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(true); }
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key={slide.src + slide.title} {...slideMotion} className="absolute inset-0">
              <Image
                src={slide.src}
                alt={`${alt}: ${slide.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
          {slide.video && (
            <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
              <span className="flex items-center gap-2 rounded-full bg-cobalt p-3.5 font-medium text-white shadow-lg sm:pl-4 sm:pr-5">
                <Play size={20} className="fill-white" /> <span className="hidden sm:inline">Watch the demo</span>
              </span>
            </div>
          )}
          {multi && <NavButton dir="prev" onClick={() => go(-1)} />}
          {multi && <NavButton dir="next" onClick={() => go(1)} />}
        </div>

        <figcaption className="flex items-center justify-between gap-4 border-t border-rule px-4 py-3 text-sm">
          <span className="min-w-0 truncate text-ink-2" aria-live="polite">
            {multi && <span className="mr-2 tabular-nums text-ink-3">{index + 1}/{slides.length}</span>}
            {slide.title}
          </span>
          {multi && (
            <span className="flex flex-shrink-0 gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.src + s.title}
                  type="button"
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Show slide ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  className={clsx("h-2 rounded-full transition-all", i === index ? "w-6 bg-cobalt" : "w-2 bg-rule hover:bg-ink-3")}
                />
              ))}
            </span>
          )}
        </figcaption>
      </figure>

      {expanded && createPortal(
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 p-3 md:p-6 cursor-zoom-out"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt}, full screen`}
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-ink md:right-6 md:top-6"
          >
            <X size={22} />
          </button>

          <div className="relative flex h-[70vh] w-full max-w-7xl items-center justify-center md:h-[82vh]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div key={slide.src + slide.title} {...slideMotion} className="absolute inset-0 flex items-center justify-center">
                {slide.video ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    poster={slide.src}
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-full max-w-full rounded-lg bg-black"
                  >
                    {slide.video.map((v) => <source key={v} src={v} type="video/mp4" />)}
                  </video>
                ) : (
                  <Image
                    src={slide.src}
                    alt={`${alt}: ${slide.title}`}
                    fill
                    sizes="100vw"
                    onClick={(e) => e.stopPropagation()}
                    className="object-contain cursor-default"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {multi && <NavButton dir="prev" onClick={() => go(-1)} large />}
          {multi && <NavButton dir="next" onClick={() => go(1)} large />}

          <p className="mt-5 text-white">
            {multi && <span className="mr-2 tabular-nums text-white/60">{index + 1}/{slides.length}</span>}
            {slide.title}
          </p>
        </div>,
        document.body
      )}
    </>
  );
}
