import type { CSSProperties } from "react";
import Image from "next/image";
import { BadgeCheck, Briefcase, Clock, Globe } from "lucide-react";
import { BOOKING_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, REMOTE, RESUME_URL } from "@/lib/profile";

const remoteFacts = [
  { icon: Globe, text: REMOTE.since },
  { icon: Clock, text: REMOTE.hours },
  { icon: BadgeCheck, text: REMOTE.visa },
  { icon: Briefcase, text: REMOTE.hire },
];

const companies = [
  { name: "Procter & Gamble", note: "Client: lead developer via LTIMindtree", logo: "/logos/pg.png", w: 319, h: 158 },
  { name: "LTIMindtree", note: "Software Engineer, Enterprise AI", logo: "/logos/ltm.png", w: 1200, h: 461 },
  { name: "Sherweb", note: "Enterprise Microsoft 365, Canada", logo: "/logos/sherweb.png", w: 900, h: 245 },
  { name: "Etisalat", note: "Six years with enterprise clients, Dubai", logo: "/logos/etisalat.png", w: 450, h: 153 },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const textLink =
  "font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] transition-colors hover:decoration-cobalt";

function LogoOrbit() {
  return (
    <div className="orbit" role="group" aria-label="Companies Atif has worked with">
      {/* Track through the logo centers, and a soft glow behind the label */}
      <div
        className="absolute rounded-full border-2 border-dashed border-rule"
        style={{ inset: "calc(var(--badge-w) / 2)" }}
        aria-hidden
      />
      <div
        className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(47,84,235,0.14),rgba(15,122,85,0.06)_55%,transparent_72%)]"
        aria-hidden
      />
      <p className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm text-ink-3">Worked with</span>
        <span className="mt-1 text-lg font-semibold leading-tight">
          10+ years of
          <br />
          enterprise work
        </span>
      </p>

      <ul className="orbit-ring">
        {companies.map((c, i) => (
          <li key={c.name} className="orbit-slot" style={{ "--angle": `${i * 90 - 45}deg` } as CSSProperties}>
            <div
              className="orbit-badge flex items-center justify-center rounded-2xl border border-rule bg-paper px-3.5 py-2.5 shadow-[0_12px_30px_-14px_rgba(20,22,27,0.35)]"
              title={`${c.name}: ${c.note}`}
            >
              <Image src={c.logo} alt={c.name} width={c.w} height={c.h} sizes="140px" className="h-full w-full object-contain" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="w-full overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="rise inline-flex items-center gap-2.5 rounded-full border border-outcome/30 bg-outcome/10 px-4 py-1.5 font-medium text-outcome"
          style={delay(0)}
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-outcome opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-outcome" />
          </span>
          {REMOTE.badge}
        </p>

        <h1
          className="rise mt-5 text-[clamp(3.5rem,12.5vw,9.75rem)] font-bold leading-[0.88] tracking-[-0.045em] font-stretch-[80%]"
          style={delay(80)}
        >
          Atif Shaikh
        </h1>

        <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p
              className="rise max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
              style={delay(160)}
            >
              Forward deployed engineer. Full-stack, AI agents, RAG and fine-tuning.
            </p>

            <p className="rise mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-2 md:text-xl" style={delay(240)}>
              I sit with the customer, turn a messy problem into working software and own it in production. Right now
              I&apos;m lead developer of a multi-agent system for Procter &amp; Gamble; 10+ years with enterprise
              customers, the last 5+ as a hands-on engineer.
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={delay(320)}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-cobalt px-6 py-3.5 text-lg font-medium text-white transition-colors hover:bg-cobalt-deep"
              >
                Book a call
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
                Resume (PDF)
              </a>
              <a href={`mailto:${EMAIL}`} className={textLink}>
                Email
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
                LinkedIn
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
                GitHub
              </a>
            </div>

            <ul className="rise mt-10 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-rule pt-6 sm:grid-cols-2" style={delay(380)}>
              {remoteFacts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 leading-snug text-ink-2">
                  <Icon size={18} className="mt-0.5 flex-shrink-0 text-outcome" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise flex justify-center" style={delay(400)}>
            <LogoOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
