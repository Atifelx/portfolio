"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import clsx from "clsx";

export type Slide = { src: string; title: string };

const SLIDE_INTERVAL_MS = 5000;

function NavButton({ dir, onClick, large }: { dir: "prev" | "next"; onClick: () => void; large?: boolean }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-colors",
        dir === "prev" ? (large ? "left-6" : "left-4") : (large ? "right-6" : "right-4"),
        large ? "w-14 h-14" : "w-11 h-11"
      )}
    >
      <Icon size={large ? 26 : 22} />
    </button>
  );
}

export default function ImageCarousel({ slides, alt, aspectRatio = "2584 / 1598" }: { slides: Slide[]; alt: string; aspectRatio?: string }) {
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
    if (!multi || hovered || expanded || reduceMotion) return;
    const timer = setInterval(() => go(1), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [multi, hovered, expanded, reduceMotion, go, index]);

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
  const offset = reduceMotion ? 0 : 60;
  const slideMotion = {
    initial: { opacity: 0, x: direction * offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction * -offset },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl cursor-zoom-in"
        role="region"
        aria-roledescription={multi ? "carousel" : undefined}
        aria-label={alt}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(true)}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio }}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={`${alt} — ${slide.title}`}
              {...slideMotion}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-105"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {multi && <NavButton dir="prev" onClick={() => go(-1)} />}
          {multi && <NavButton dir="next" onClick={() => go(1)} />}

          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity">
            <Maximize2 size={12} /> Click to expand
          </span>

          {multi && (
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-white" aria-live="polite">
              <span className="font-mono text-teal-400 mr-2">{index + 1}/{slides.length}</span>
              {slide.title}
            </span>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Show image ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  className={clsx(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-teal-400" : "w-2 bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </div>
          )}
        </div>
      </div>

      {expanded && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-6 cursor-zoom-out"
              role="dialog"
              aria-modal="true"
              aria-label={`${alt} — full screen`}
              onClick={() => setExpanded(false)}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close"
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-teal-400 hover:text-black transition-colors"
              >
                <X size={22} />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-7xl h-[82vh] flex items-center justify-center"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={slide.src}
                    src={slide.src}
                    alt={`${alt} — ${slide.title}`}
                    {...slideMotion}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl cursor-default"
                  />
                </AnimatePresence>
              </motion.div>

              {multi && <NavButton dir="prev" onClick={() => go(-1)} large />}
              {multi && <NavButton dir="next" onClick={() => go(1)} large />}

              <p className="mt-6 text-white font-bold">
                {multi && <span className="font-mono text-teal-400 mr-2">{index + 1}/{slides.length}</span>}
                {slide.title}
              </p>
            </motion.div>,
        document.body
      )}
    </>
  );
}
