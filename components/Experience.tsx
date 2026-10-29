"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

type Logo = { src: string; alt: string; w: number; h: number };

const LOGOS: Record<string, Logo> = {
  etisalat: { src: "/logos/etisalat.png", alt: "Etisalat by e&", w: 450, h: 153 },
  upwork: { src: "/logos/upwork.png", alt: "Upwork", w: 369, h: 246 },
  sherweb: { src: "/logos/sherweb.png", alt: "Sherweb", w: 900, h: 245 },
  ltm: { src: "/logos/ltm.png", alt: "LTIMindtree", w: 1200, h: 461 },
  pg: { src: "/logos/pg.png", alt: "Procter & Gamble", w: 319, h: 158 },
};

// Oldest first: the story reads left to right along the arrow (bottom to top on narrow screens).
// `color` is the brand accent for rings and rails; `textColor` is a darker shade that stays readable as text.
const chapters = [
  {
    id: "chapter-etisalat",
    logo: LOGOS.etisalat,
    color: "#e5432f",
    textColor: "#c0321f",
    company: "Etisalat",
    role: "Technical Operations and Client Coordination",
    years: "2013 – 2019",
    place: "Dubai, UAE",
    short: "The client side",
    story: "Learning what enterprise customers need",
    narrative:
      "Six years as the link between enterprise telecom clients and three engineering teams. I ran incident triage, escalations, post-incident reviews and SLA negotiations, and learned how enterprise customers really work.",
    highlights: ["Monthly Excellence Award for customer-centric performance, January 2019"],
  },
  {
    id: "chapter-upwork-2019",
    logo: LOGOS.upwork,
    color: "#14a800",
    textColor: "#0f7a0a",
    company: "Upwork",
    role: "Freelance Software Engineer",
    years: "2019 – 2021",
    place: "Remote",
    short: "Freelance builds",
    story: "Switching to engineering",
    narrative:
      "I moved from coordinating engineers to being one: two years of full-stack React and WooCommerce builds with payments and analytics for clients around the world.",
    highlights: ["15+ clients delivered", "$20K+ earned"],
  },
  {
    id: "chapter-sherweb",
    logo: LOGOS.sherweb,
    color: "#1f5fae",
    textColor: "#1f5fae",
    company: "Sherweb",
    role: "Software Engineer, Enterprise Microsoft 365",
    years: "2021 – 2023",
    place: "Canada, remote",
    short: "Customer engineering",
    story: "Engineering in front of the customer",
    narrative:
      "Customer-facing engineer for enterprise Microsoft 365 tenants (Exchange, SharePoint, Teams, Azure AD). I diagnosed issues live with customer IT teams, then turned the problems that kept coming back into software.",
    highlights: [
      "Held a 99.5% SLA and led SEV-A recoveries",
      "Intune and Graph API monitoring with Teams alerts: detection 45% faster",
      "React and PostgreSQL ticketing system: response time down 35%",
    ],
  },
  {
    id: "chapter-upwork-2024",
    logo: LOGOS.upwork,
    color: "#14a800",
    textColor: "#0f7a0a",
    company: "Upwork",
    role: "Freelance AI Engineer",
    years: "2024",
    place: "Remote",
    short: "First AI build",
    story: "Into AI, with a result to show",
    narrative:
      "Built a RAG sales assistant over a 13,000-item inventory, used for demand forecasting and stock optimization.",
    highlights: ["Sell-through up 30%"],
  },
  {
    id: "chapter-ltimindtree",
    logo: LOGOS.ltm,
    client: LOGOS.pg,
    color: "#f26b5f",
    textColor: "#c2410c",
    company: "LTIMindtree",
    role: "Software Engineer, Enterprise AI",
    years: "2024 – now",
    place: "Client: Procter & Gamble",
    short: "Production AI for P&G",
    story: "Leading a multi-agent system into production",
    narrative:
      "Lead developer of a four-agent assistant built in LangGraph and deployed on Google Vertex AI for Procter & Gamble. I took it from solution design to production and translated P&G's business rules into agent behavior.",
    highlights: [
      "Designed the agent graph: an intent agent routes requests, a retrieval agent queries the client's Azure AI Search through MCP, and a resolver proposes solutions",
      "Fixed intent identification and the JSON data processing and mapping behind it: accuracy rose from 67% to 92%, holding up on most edge cases",
      "Evals and tracing in Arize Phoenix to find and fix routing failures on open-ended questions, off-topic input and file uploads",
    ],
    stack: "Google Vertex AI, LangGraph, Gemini 2.5 Flash, Azure AI Search, MCP",
    diagram: true,
  },
];

// Arrow geometry in a 1000 x 440 box: a start point, one point per chapter, and the arrow tip
const VIEW_W = 1000;
const VIEW_H = 440;
const POINTS: [number, number][] = [
  [20, 398],
  [130, 372],
  [318, 390],
  [505, 362],
  [690, 300],
  [850, 212],
  [958, 122],
];
const MILESTONES = POINTS.slice(1, -1);

// Smooth curve through the points (Catmull-Rom converted to cubic Béziers)
function smoothPath(points: [number, number][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}
const ARROW_PATH = smoothPath(POINTS);

type Chapter = (typeof chapters)[number];
const LAST = chapters.length - 1;

function LogoCard({ logo, className }: { logo: Logo; className: string }) {
  return (
    <span className={`relative block ${className}`}>
      <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} sizes="144px" className="h-full w-full object-contain" />
    </span>
  );
}

const FLOW = [
  { title: "Intent agent", text: "Identifies what the user wants and processes and maps the JSON data" },
  { title: "Specialist agents", text: "A retrieval agent queries the client's Azure AI Search (RAG) through MCP tool nodes" },
  { title: "Resolver agent", text: "Updates the graph state and proposes a solution" },
];

// Simplified view of the P&G assistant: no client data, only the shape of the agent graph
function AgentDiagram() {
  return (
    <figure className="mt-8 rounded-xl border border-rule bg-surface p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="font-semibold">How the assistant works</span>
        <span className="text-sm text-ink-3">Simplified; no client data</span>
      </figcaption>
      <ol className="mt-4 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <li className="flex items-center justify-center rounded-full border border-rule bg-paper px-4 py-2 text-sm font-medium">
          User request
        </li>
        {FLOW.map((step) => (
          <li key={step.title} className="contents">
            <ArrowRight size={18} className="mx-auto hidden flex-shrink-0 text-ink-3 md:block" aria-hidden />
            <ArrowDown size={18} className="mx-auto flex-shrink-0 text-ink-3 md:hidden" aria-hidden />
            <div className="flex-1 rounded-lg border-2 border-[#f26b5f]/50 bg-paper p-3">
              <p className="font-semibold">{step.title}</p>
              <p className="mt-1 text-sm leading-snug text-ink-2">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-center text-sm text-ink-2">
        LangGraph on Google Vertex AI with Gemini 2.5 Flash. Every step traced and evaluated in Arize Phoenix.
      </p>
    </figure>
  );
}

function ChapterDetail({ c, index, compact }: { c: Chapter; index: number; compact?: boolean }) {
  return (
    <>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        {!compact && (
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-14 w-32 items-center justify-center rounded-xl border border-rule bg-paper px-3 py-2">
              <LogoCard logo={c.logo} className="h-full w-full" />
            </span>
            {"client" in c && c.client && (
              <span className="flex items-center gap-2 text-sm text-ink-3">
                for
                <span className="flex h-14 w-24 items-center justify-center rounded-xl border border-rule bg-paper px-3 py-2">
                  <LogoCard logo={c.client} className="h-full w-full" />
                </span>
              </span>
            )}
          </div>
        )}
        <p className="font-semibold">{c.company}</p>
        <p className="text-ink-2">{c.role}</p>
        <p className="mt-1 text-ink-3 tabular-nums">
          {c.years}, {c.place}
        </p>
      </div>

      <div className="min-w-0 md:col-span-8">
        <p className="text-sm font-semibold" style={{ color: c.textColor }}>
          Chapter {index + 1} of {chapters.length}
        </p>
        <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight md:text-3xl">{c.story}</h3>
        <p className="mt-3 text-lg leading-relaxed text-ink-2">{c.narrative}</p>
        <ul className="mt-4 space-y-2">
          {c.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-sm" style={{ background: c.color }} aria-hidden />
              <span className="font-medium">{h}</span>
            </li>
          ))}
        </ul>
        {"stack" in c && c.stack && <p className="mt-4 text-sm text-ink-3">{c.stack}</p>}
      </div>
    </div>
    {"diagram" in c && c.diagram && <AgentDiagram />}
    </>
  );
}

// Wide screens: the horizontal arrow with selectable milestones and a story panel underneath
function HorizontalJourney({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;
  const c = chapters[active];

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = Math.min(LAST, Math.max(0, active + (e.key === "ArrowRight" ? 1 : -1)));
      setActive(next);
      document.getElementById(`milestone-${next}`)?.focus();
    }
  };

  return (
    <div className="mt-14 hidden lg:block">
      <div ref={ref} className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="journey-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="45%" stopColor="#2f54eb" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <marker id="journey-head" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
            </marker>
            <filter id="journey-shadow" x="-10%" y="-10%" width="120%" height="140%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <clipPath id="journey-reveal">
              <motion.rect
                x="0"
                y="-40"
                height={VIEW_H + 80}
                initial={{ width: reduce ? VIEW_W + 60 : 0 }}
                animate={{ width: show ? VIEW_W + 60 : 0 }}
                transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#journey-reveal)">
            <path d={ARROW_PATH} transform="translate(0 14)" fill="none" stroke="rgba(20,22,27,0.12)" strokeWidth="22" strokeLinecap="round" filter="url(#journey-shadow)" />
            <path d={ARROW_PATH} fill="none" stroke="url(#journey-stroke)" strokeWidth="22" strokeLinecap="round" markerEnd="url(#journey-head)" />
          </g>
        </svg>

        <div role="tablist" aria-label="Career milestones" onKeyDown={onKeyDown}>
          {chapters.map((ch, i) => {
            const [x, y] = MILESTONES[i];
            const selected = i === active;
            return (
              <motion.button
                key={ch.id}
                id={`milestone-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className="group absolute flex w-44 -translate-x-1/2 -translate-y-full cursor-pointer flex-col items-center text-center"
                style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: reduce ? 0 : 1.0 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-sm font-semibold leading-tight" style={{ color: selected ? ch.textColor : undefined }}>
                  {ch.short}
                </span>
                <span className="mt-0.5 text-sm text-ink-3 tabular-nums">{ch.years}</span>
                <span
                  className="relative mt-2 flex h-[68px] w-36 items-center justify-center rounded-2xl border-2 bg-paper px-4 py-3 transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    borderColor: ch.color,
                    boxShadow: selected
                      ? `0 0 0 5px ${ch.color}2e, 0 18px 34px -16px rgba(20,22,27,0.5)`
                      : "0 14px 30px -16px rgba(20,22,27,0.45)",
                    scale: selected ? "1.06" : "1",
                  }}
                >
                  <LogoCard logo={ch.logo} className="h-full w-full" />
                  {i === LAST && (
                    <span className="absolute -right-2 -top-2.5 rounded-full bg-cobalt px-2 py-0.5 text-xs font-semibold text-white">
                      Now
                    </span>
                  )}
                </span>
                <span className="h-9 w-[3px]" style={{ background: ch.color }} aria-hidden />
                <span className="h-4 w-4 translate-y-1/2 rounded-full border-[3px] bg-paper" style={{ borderColor: ch.color }} aria-hidden />
                <span className="sr-only">
                  {ch.company}, {ch.years}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-ink-3">Select a milestone to read that chapter.</p>

      {/* Story panel, with a notch that points at the selected milestone */}
      <div className="relative mt-8">
        <span
          className="absolute -top-2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-rule bg-paper transition-[left] duration-500"
          style={{ left: `${(MILESTONES[active][0] / VIEW_W) * 100}%` }}
          aria-hidden
        />
        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`milestone-${active}`}
          className="rounded-2xl border border-rule bg-paper p-8 shadow-[0_20px_50px_-30px_rgba(20,22,27,0.35)]"
          style={{ borderTop: `4px solid ${c.color}` }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={c.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ChapterDetail c={c} index={active} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
            <button
              type="button"
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className="font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-cobalt disabled:cursor-default disabled:text-ink-3 disabled:no-underline"
            >
              Previous chapter
            </button>
            <button
              type="button"
              onClick={() => setActive(Math.min(LAST, active + 1))}
              disabled={active === LAST}
              className="font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-cobalt disabled:cursor-default disabled:text-ink-3 disabled:no-underline"
            >
              Next chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Narrow screens: the same arrow standing upright, newest at the top; tap a milestone to expand its story
function VerticalJourney({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;
  const order = chapters.map((_, i) => LAST - i);

  return (
    <div ref={ref} className="relative mt-12 pl-14 lg:hidden">
      {/* Arrow shaft rising from the first chapter (bottom) to the head at the top */}
      <motion.span
        className="absolute bottom-6 left-[18px] top-7 w-3 origin-bottom rounded-full bg-gradient-to-t from-[#c7d2fe] via-[#2f54eb] to-[#10b981] shadow-[6px_8px_16px_-8px_rgba(20,22,27,0.35)]"
        initial={reduce ? false : { scaleY: 0 }}
        animate={show ? { scaleY: 1 } : undefined}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden
      />
      <motion.span
        className="absolute left-[6px] top-0 h-0 w-0 border-x-[18px] border-b-[30px] border-x-transparent border-b-[#10b981]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: reduce ? 0 : 1.1 }}
        aria-hidden
      />

      <ul className="space-y-4 pt-10">
        {order.map((i, row) => {
          const ch = chapters[i];
          const open = i === active;
          return (
            <motion.li
              key={ch.id}
              className="relative"
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={show ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.5 + row * 0.12 }}
            >
              <span
                className="absolute -left-[46px] top-7 h-5 w-5 rounded-full border-[4px] bg-paper"
                style={{ borderColor: ch.color }}
                aria-hidden
              />
              <div
                className="overflow-hidden rounded-2xl border bg-paper transition-shadow"
                style={{
                  borderColor: open ? ch.color : "var(--color-rule)",
                  boxShadow: open ? `0 0 0 4px ${ch.color}24` : undefined,
                }}
              >
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`${ch.id}-story`}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span className="flex h-12 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-rule bg-paper px-2.5 py-2">
                    <LogoCard logo={ch.logo} className="h-full w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-tight" style={{ color: open ? ch.textColor : undefined }}>
                      {ch.short}
                    </span>
                    <span className="block text-sm text-ink-3 tabular-nums">
                      {ch.company}, {ch.years}
                    </span>
                  </span>
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-rule text-lg leading-none text-ink-2 transition-transform duration-300"
                    style={{ rotate: open ? "45deg" : "0deg" }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${ch.id}-story`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-t border-rule px-4 pb-5 pt-4">
                        {"client" in ch && ch.client && (
                          <p className="mb-3 flex items-center gap-2 text-sm text-ink-3">
                            Client
                            <span className="flex h-9 w-16 items-center justify-center rounded-lg border border-rule bg-paper px-2 py-1.5">
                              <LogoCard logo={ch.client} className="h-full w-full" />
                            </span>
                          </p>
                        )}
                        <ChapterDetail c={ch} index={i} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Experience() {
  // Opens on the current role; -1 means every chapter is closed (narrow screens only)
  const [active, setActive] = useState(LAST);

  return (
    <section id="experience" className="w-full overflow-hidden bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-[62ch]">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Experience</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            From the client side to leading AI in production: 10+ years with enterprise customers, the last 5+ as a
            hands-on engineer.
          </p>
        </div>

        <HorizontalJourney active={active < 0 ? LAST : active} setActive={setActive} />
        <VerticalJourney active={active} setActive={setActive} />
      </div>
    </section>
  );
}
