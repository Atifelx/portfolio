"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Shared shell for the "Read the case study" modals: trigger button, full-height dialog, Escape and backdrop to close
export default function CaseStudyModal({
  title,
  subtitle,
  footer,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Read the case study
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/60 md:items-center md:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={() => setOpen(false)}
          >
            <div
              className="relative max-h-full w-full max-w-4xl overflow-y-auto overscroll-contain bg-paper shadow-2xl md:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-rule bg-paper px-5 py-5 md:px-10">
                <div>
                  <p className="text-sm text-ink-3">Case study</p>
                  <h2 id={titleId} className="text-2xl font-bold tracking-tight md:text-3xl">
                    {title}
                  </h2>
                  {subtitle && <p className="text-sm text-ink-3">{subtitle}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close case study"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-5 pb-8 md:px-10">
                {children}
                {footer && <p className="border-t border-rule pt-6 text-sm leading-relaxed text-ink-3">{footer}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-rule py-8 first:border-t-0">
      <h3 className="mb-4 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
      {children}
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-ink-2 marker:text-ink-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
