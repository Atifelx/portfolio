import Image from "next/image";
import { LINKEDIN_URL } from "@/lib/profile";

const people = [
  {
    name: "Dr Chiranjiv Roy",
    detail: "Applied AI transformation leader, OnCon Global Top 50, formerly at Nissan, Mercedes and HP. Atif's mentor.",
    href: "https://www.linkedin.com/in/chiranjiv/",
  },
  {
    name: "Bilal Hameed",
    detail: "Head of Interconnect Management at e& (Etisalat). Managed Atif at Etisalat.",
  },
];

export default function Recommendations() {
  return (
    <section id="recommendations" className="w-full bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Recommendations</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">In their own words, on LinkedIn.</p>
          <ul className="mt-8 space-y-5">
            {people.map((p) => (
              <li key={p.name}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-rule decoration-2 underline-offset-4 hover:decoration-cobalt"
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="font-semibold">{p.name}</span>
                )}
                <p className="mt-1 text-ink-3">{p.detail}</p>
              </li>
            ))}
          </ul>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-medium underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-cobalt"
          >
            See them on LinkedIn
          </a>
        </div>

        <a
          href="/linkedin-recommendations.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block self-start overflow-hidden rounded-xl border border-rule bg-paper shadow-sm transition-shadow hover:shadow-lg md:col-span-8"
        >
          <Image
            src="/linkedin-recommendations.png"
            alt="LinkedIn recommendations for Atif Shaikh from Dr Chiranjiv Roy and Bilal Hameed"
            width={1566}
            height={940}
            sizes="(max-width: 768px) 100vw, 66vw"
            className="h-auto w-full"
          />
        </a>
      </div>
    </section>
  );
}
