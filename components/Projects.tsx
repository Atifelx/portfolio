import ImageCarousel, { type Slide } from "./ImageCarousel";
import ChequeCaseStudy from "./ChequeCaseStudy";

type Project = {
  id: string;
  title: string;
  tagline: string;
  why: string; // what this project proves, i.e. why it made the cut
  problem: string;
  built: string;
  result: string;
  note?: string;
  tech: string[];
  links: { label: string; href: string }[];
  slides: Slide[];
  slidesAspect: string;
  results?: { label: string; value: string }[]; // measured results, shown as a small table under Result
  caseStudy?: boolean;
};

const projects: Project[] = [
  {
    id: "writebookai",
    title: "WriteBookAI",
    tagline: "Agentic SaaS for authority books. Live in production.",
    why: "A complete product in production: an agent pipeline, routing across three model providers, payments and real users.",
    problem: "Coaches, consultants and founders want a book that sounds like them, but ghostwriters are slow and expensive.",
    built:
      "Guided interviews capture the author's thinking; agents orchestrate OpenAI, Claude and Gemini to match their voice and draft each chapter. Editable manuscript, Kindle export and Stripe billing.",
    result: "Live at writebookai.com with 184 sign-ups, all from organic search.",
    tech: ["AI agents", "OpenAI", "Claude", "Gemini", "React", "Node.js", "PostgreSQL", "Stripe"],
    links: [{ label: "Visit writebookai.com", href: "https://www.writebookai.com/" }],
    slides: [{ src: "/writebookaiN.png", title: "WriteBookAI: authority books in your voice" }],
    slidesAspect: "2532 / 1546",
  },
  {
    id: "cryptoclever",
    title: "CryptoClever",
    tagline: "Real-time multi-agent trading platform, running live.",
    why: "Agents making real-time decisions around the clock, with an AI check before any signal goes out.",
    problem: "Crypto markets move around the clock. No person can watch every chart, indicator and news headline at once.",
    built:
      "Agents powered by OpenAI's GPT-5.6 Sol model trade Binance spot markets: scalping agents on 1-minute candles, a support-and-resistance agent, long-term trend agents, and a news agent where the LLM scores each event +1 or -1. An AI layer double-confirms every signal before it is broadcast live to users, and an execution agent scans every Binance spot symbol and trades 24/7.",
    result: "Two months of live testing, measured from the agents' logs and the trades they executed. Results differ by strategy:",
    results: [
      { label: "Long-term agent, uptrend (buy) signals", value: "72%" },
      { label: "Support and resistance", value: "62%" },
      { label: "Long-term agent, downtrend signals", value: "51%" },
      { label: "Scalping", value: "45%" },
    ],
    tech: ["Python", "Multi-agent", "GPT-5.6 Sol", "WebSockets", "Binance API", "ChromaDB"],
    links: [{ label: "Code on GitHub", href: "https://github.com/Atifelx/CryptoClever" }],
    slides: [{ src: "/landingimage/cryptoclever.png", title: "CryptoClever: live agent dashboard" }],
    slidesAspect: "2878 / 1434",
  },
  {
    id: "icici-pixel",
    title: "Cheque verification AI",
    tagline: "Project ICiCI-pixel: five vision models, two of them fine-tuned.",
    why: "Five models working as one system, with every model choice settled by a measured comparison.",
    problem: "Bank staff check every cheque by hand: read the handwriting, find the account, compare the signature.",
    built:
      "A FastAPI and React app that runs five vision models in sequence: OCR for printed text, YOLO to find each field, a fine-tuned TrOCR for handwriting and a Siamese network for signatures. It shows every step live and ships as an offline, CPU-only Docker image.",
    result:
      "Handwritten amounts read correctly went from 1 of 17 to 16 of 17 after fine-tuning. Every verdict lists its reasons, and anything doubtful goes to a person.",
    note: "Built and evaluated on synthetic test data. Not affiliated with ICICI Bank.",
    tech: ["TrOCR", "YOLO", "EasyOCR", "PyTorch", "Hugging Face", "FastAPI", "React", "Docker"],
    links: [
      {
        label: "Download app and models (Docker)",
        href: "https://www.dropbox.com/scl/fi/rssds2c8q0pvjaxojshdc/icici-pixel.zip?rlkey=cb5q5k78wl5mk2w5r2c445de3&st=uq2wn7tn&dl=0",
      },
    ],
    slides: [
      { src: "/icicpixel/hero-1.png", title: "Watch it check a cheque", video: ["/icicpixel/demo.mp4"] },
      { src: "/icicpixel/3.png", title: "Signature located" },
      { src: "/icicpixel/4.png", title: "Every field with its confidence" },
      { src: "/icicpixel/2.png", title: "Final verification report" },
      { src: "/icicpixel/nikhil-3.png", title: "Synthetic test cheque" },
    ],
    slidesAspect: "3396 / 1914",
    caseStudy: true,
  },
  {
    id: "triagelens",
    title: "TriageLens",
    tagline: "Fine-tuned Gemma for IT incident triage.",
    why: "Proof that a small, cheap model does the job when it is trained on the right data.",
    problem:
      "Service desk engineers read every incident to judge its urgency before it can be routed, so critical outages wait in the queue.",
    built:
      "Prompting plateaued at about 20% accuracy, so I fine-tuned Google's Gemma 3 270M on 1,500 real incident examples. When severity kept failing, I added 400 targeted examples and trained a second LoRA adapter: one base model, two specialist adapters. Engineers review each analysis before it is routed to Teams, ServiceNow, Jira or a CRM.",
    result: "Severity accuracy rose from 7% to 89%, on a model small enough to run on a plain CPU.",
    tech: ["Gemma 3 270M", "LoRA", "PyTorch", "Hugging Face", "FastAPI", "Next.js"],
    links: [
      { label: "Code on GitHub", href: "https://github.com/Atifelx/AI_Triage" },
      {
        label: "Download code and model",
        href: "https://www.dropbox.com/scl/fo/gysi2jbvm043rygk7ag43/AIs7c81v_5BqOu4Qc8dS-hs?rlkey=wsfrjdq8yfbfnuzrsh6r5f1gc&st=z4dbmv3w&e=1&dl=0",
      },
    ],
    slides: [
      { src: "/AITRIAGE/1.png", title: "AI triage result" },
      { src: "/AITRIAGE/2_1.png", title: "Route for human review" },
      { src: "/AITRIAGE/4_1.png", title: "Review decision" },
      { src: "/AITRIAGE/3_1.png", title: "Integrations" },
    ],
    slidesAspect: "2792 / 1590",
  },
];

const moreProjects = [
  {
    title: "Clever RAG",
    text: "Chat with your own documents, with sources. Upload PDFs, Word files or whole books; every answer cites the document it came from, and questions outside the library go to live web search.",
    link: { label: "Try the live demo", href: "https://agent-live-vpbp.vercel.app/" },
  },
];

const linkClass = "font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-cobalt";

function ProjectRow({ project }: { project: Project }) {
  return (
    <article id={project.id} className="grid grid-cols-1 gap-8 border-t border-rule py-14 md:grid-cols-12 md:gap-12 md:py-20">
      <div className="min-w-0 md:col-span-5">
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
        <p className="mt-2 text-ink-3">{project.tagline}</p>
        <p className="mt-4 border-l-2 border-cobalt pl-3 text-sm leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">Why it&apos;s here: </span>
          {project.why}
        </p>

        <dl className="mt-8 space-y-5 leading-relaxed">
          <div>
            <dt className="font-semibold">Problem</dt>
            <dd className="mt-1 text-ink-2">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold">What I built</dt>
            <dd className="mt-1 text-ink-2">{project.built}</dd>
          </div>
          <div>
            <dt className="font-semibold">Result</dt>
            <dd className="mt-1 font-medium text-outcome">{project.result}</dd>
            {project.results && (
              <dd className="mt-3">
                <table className="w-full text-sm">
                  <caption className="sr-only">Signal accuracy by strategy</caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Strategy</th>
                      <th>Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.results.map((r) => (
                      <tr key={r.label} className="border-t border-rule">
                        <td className="py-2 pr-4 text-ink-2">{r.label}</td>
                        <td className="py-2 text-right font-semibold tabular-nums">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            )}
          </div>
        </dl>

        <p className="mt-6 text-sm text-ink-3">Built with {project.tech.join(", ")}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {link.label}
            </a>
          ))}
          {project.caseStudy && <ChequeCaseStudy className={`${linkClass} cursor-pointer`} />}
        </div>

        {project.note && <p className="mt-6 text-sm text-ink-3">{project.note}</p>}
      </div>

      <div className="min-w-0 md:col-span-7">
        <ImageCarousel slides={project.slides} alt={project.title} aspectRatio={project.slidesAspect} />
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-[62ch]">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Selected work</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Four projects, each chosen to show a different part of the job: two agent platforms running live, and two
            fine-tuned models with measured results. All four built end to end, from the problem to a working system.
          </p>
        </div>

        <div className="mt-10">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>

        <div className="border-t border-rule pt-10">
          <h3 className="text-xl font-semibold tracking-tight">Also built</h3>
          <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            {moreProjects.map((p) => (
              <li key={p.title} className="leading-relaxed">
                <span className="font-semibold">{p.title}. </span>
                <span className="text-ink-2">{p.text}</span>
                {p.link && (
                  <>
                    {" "}
                    <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {p.link.label}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
