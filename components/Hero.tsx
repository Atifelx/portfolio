import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BOOKING_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, REMOTE, RESUME_URL } from "@/lib/profile";

// The three things a hiring manager should take away in the first few seconds; each links to its proof
const tiles = [
  { stat: "Production AI", caption: "Agentic RAG assistant for a Fortune 500 client", href: "#experience" },
  { stat: "Live on Google Cloud", caption: "WriteBookAI: Claude → Gemini fallback, CI/CD, auto-rollback", href: "#writebookai" },
  { stat: "~20% → 89%", caption: "Incident-severity accuracy after fine-tuning Gemma", href: "#triagelens" },
];

const remoteFacts = [REMOTE.since, "India (IST)", REMOTE.hire];

const companies = [
  { name: "LTIMindtree", logo: "/logos/ltm.png", w: 1200, h: 461 },
  { name: "Sherweb", logo: "/logos/sherweb.png", w: 900, h: 245 },
  { name: "Etisalat", logo: "/logos/etisalat.png", w: 450, h: 153 },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const textLink =
  "font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] transition-colors hover:decoration-cobalt";

export default function Hero() {
  return (
    <section id="home" className="w-full overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="rise inline-flex items-center gap-2 rounded-full border border-outcome/30 bg-outcome/10 px-3 py-1 text-sm font-medium text-outcome md:px-4 md:py-1.5 md:text-base"
          style={delay(0)}
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-outcome opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-outcome" />
          </span>
          {REMOTE.badge}
        </p>

        <h1
          className="rise mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] font-stretch-[80%]"
          style={delay(60)}
        >
          Atif Shaikh
        </h1>

        <p
          className="rise mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] text-cobalt"
          style={delay(120)}
        >
          Forward Deployed Engineer
        </p>

        <p className="rise mt-3 max-w-[58ch] text-lg leading-snug text-ink-2 md:text-xl" style={delay(180)}>
          Full-stack developer who ships AI to production on the cloud, working directly with enterprise customers.
        </p>

        <ul className="rise mt-6 grid grid-cols-1 gap-2.5 md:mt-8 md:grid-cols-3 md:gap-4" style={delay(240)}>
          {tiles.map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                className="group flex h-full items-start justify-between gap-3 rounded-xl border border-rule bg-paper px-4 py-3 transition-colors hover:border-outcome/60 md:flex-col md:justify-start md:gap-1.5 md:p-5"
              >
                <span className="min-w-0">
                  <span className="block text-lg font-bold leading-tight tracking-tight text-outcome md:text-2xl">
                    {t.stat}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-2 md:mt-1.5 md:text-base">{t.caption}</span>
                </span>
                <ArrowDown
                  size={18}
                  className="mt-1 flex-shrink-0 text-ink-3 transition-colors group-hover:text-outcome md:hidden"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-8" style={delay(300)}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cobalt px-5 py-3 text-lg font-medium text-white transition-colors hover:bg-cobalt-deep md:px-6 md:py-3.5"
          >
            View resume
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-ink px-5 py-2.5 text-lg font-medium text-ink transition-colors hover:bg-ink hover:text-white md:px-6 md:py-3"
          >
            Book a call
          </a>
          <span className="flex flex-wrap items-center gap-x-2 text-ink-3">
            <a href={`mailto:${EMAIL}`} className={textLink}>
              Email
            </a>
            <span aria-hidden>·</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
              LinkedIn
            </a>
            <span aria-hidden>·</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
              GitHub
            </a>
          </span>
        </div>

        <div
          className="rise mt-8 flex flex-col gap-5 border-t border-rule pt-5 md:flex-row md:items-center md:justify-between md:gap-8"
          style={delay(360)}
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-2" aria-label="Remote work">
            {remoteFacts.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-outcome" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-sm text-ink-3">Worked with</span>
            <ul className="flex items-center gap-5" aria-label="Companies Atif has worked with">
              {companies.map((c) => (
                <li key={c.name} className="h-6 w-20 md:h-7 md:w-24">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={c.w}
                    height={c.h}
                    sizes="96px"
                    className="h-full w-full object-contain opacity-60 grayscale"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
