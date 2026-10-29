import Image from "next/image";
import { REMOTE } from "@/lib/profile";

type Lane = {
  title: string;
  proof: string;
  accent: string; // bar and tag tint
  ink: string; // readable text shade of the accent
  core: string[]; // the keywords a recruiter searches for first
  more: string[];
};

// Skills grouped by the three roles Atif targets; every keyword is backed by the resume or a project on this site
const lanes: Lane[] = [
  {
    title: "Forward deployed engineering",
    proof: "10+ years working directly with enterprise customers; lead developer for Procter & Gamble.",
    accent: "#2f54eb",
    ink: "#2440c6",
    core: ["Customer discovery", "Solution design", "Production ownership", "Enterprise integration"],
    more: [
      "Rapid prototyping",
      "Proofs of concept and demos",
      "Stakeholder management",
      "Live troubleshooting with customer IT",
      "SEV-A incident response",
      "99.5% SLA ownership",
      "Remote delivery across US and EU hours",
    ],
  },
  {
    title: "AI engineering",
    proof: "Four-agent LangGraph system in production on Google Vertex AI; intent and JSON-mapping accuracy raised from 67% to 92%.",
    accent: "#0f7a55",
    ink: "#0f7a55",
    core: ["AI agents", "Multi-agent systems", "LangGraph", "RAG", "MCP"],
    more: [
      "LLM applications",
      "Tool calling",
      "Prompt engineering",
      "Evals and tracing (Arize Phoenix)",
      "Google Vertex AI",
      "Gemini",
      "OpenAI",
      "Claude",
      "Azure OpenAI",
      "Azure AI Search",
      "ChromaDB",
    ],
  },
  {
    title: "Machine learning",
    proof: "LoRA lifted severity accuracy from 7% to 89%; full fine-tuning took handwriting reads from 1/17 to 16/17.",
    accent: "#6d28d9",
    ink: "#6d28d9",
    core: ["Fine-tuning", "LoRA / PEFT", "PyTorch", "Hugging Face Transformers"],
    more: [
      "Full fine-tuning",
      "Small language models (Gemma, Llama, Mistral)",
      "Computer vision",
      "OCR (TrOCR)",
      "Object detection (YOLO)",
      "Dataset curation",
      "Synthetic data",
      "Model evaluation",
      "Failure-mode analysis",
    ],
  },
];

const foundation = [
  "Python",
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "FastAPI",
  "REST",
  "WebSockets",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Google Cloud",
  "Azure",
  "Microsoft Graph API",
  "OAuth2 / JWT",
  "ServiceNow",
  "Jira",
  "Stripe",
  "n8n",
];

const facts = [
  { label: "Remote setup", value: `India (IST). ${REMOTE.hours}.` },
  { label: "Work authorization", value: `${REMOTE.visa}. ${REMOTE.relocation}.` },
  { label: "Open to", value: "Remote forward deployed, AI engineer and applied ML roles with US and European teams; contract (B2B) or full-time" },
  { label: "Education", value: "B.E. Electronics and Communication, Visvesvaraya Technological University. MBA, Sikkim Manipal University" },
];

export default function About() {
  return (
    <section id="about" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About</h2>
            <div className="mt-6 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                I&apos;m a full-stack engineer who moved into AI agents and machine learning. I work the way a forward
                deployed engineer does: sit with the customer, turn a messy problem into working software, and own it in
                production.
              </p>
              <p>
                I started on the client side, six years at Etisalat in Dubai between enterprise customers and engineering
                teams. Since 2019 I&apos;ve been a hands-on engineer, and today I lead development of a multi-agent
                assistant for Procter &amp; Gamble.
              </p>
            </div>
          </div>

          <dl className="self-end md:col-span-5">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-rule py-4">
                <dt className="text-sm text-ink-3">{f.label}</dt>
                <dd className="mt-1 leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Skills</h3>
            <p className="text-ink-3">Grouped by the work I&apos;m hired for. Highlighted tags are the core of each.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {lanes.map((lane) => (
              <article key={lane.title} className="relative overflow-hidden rounded-2xl border border-rule bg-paper p-6">
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: lane.accent }} aria-hidden />
                <h4 className="text-xl font-bold tracking-tight" style={{ color: lane.ink }}>
                  {lane.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{lane.proof}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${lane.title} skills`}>
                  {lane.core.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border px-3 py-1 text-sm font-semibold"
                      style={{ color: lane.ink, borderColor: `${lane.accent}55`, background: `${lane.accent}12` }}
                    >
                      {skill}
                    </li>
                  ))}
                  {lane.more.map((skill) => (
                    <li key={skill} className="rounded-full border border-rule px-3 py-1 text-sm text-ink-2">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-rule bg-surface p-6">
            <h4 className="font-semibold">Full-stack and cloud foundation</h4>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Full-stack and cloud skills">
              {foundation.map((skill) => (
                <li key={skill} className="rounded-full border border-rule bg-paper px-3 py-1 text-sm text-ink-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-8 border-t border-rule pt-10 md:mt-24 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h3 className="text-xl font-semibold tracking-tight">Recognition</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink-2">
              Etisalat Monthly Excellence Award for exemplary, customer-centric performance, January 2019.
            </p>
          </div>
          <a
            href="/etisalat-excellence-award.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-rule transition-shadow hover:shadow-lg md:col-span-7"
          >
            <Image
              src="/etisalat-excellence-award.jpg"
              alt="Etisalat Monthly Excellence Award presented to Atif Shaikh, January 2019"
              width={1100}
              height={774}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="h-auto w-full"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
