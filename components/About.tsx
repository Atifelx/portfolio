import { REMOTE } from "@/lib/profile";

type Lane = {
  title: string;
  proof: string;
  accent: string; // bar and tag tint
  ink: string; // readable text shade of the accent
  core: string[]; // the keywords a recruiter searches for first
  more: string[];
};

// Skills grouped by the work Atif is hired for; every keyword is backed by the public resume or a project on this site
const lanes: Lane[] = [
  {
    title: "Forward deployed engineering",
    proof: "10+ years working directly with enterprise customers; took a Fortune 500 client's agentic RAG assistant from demo to production.",
    accent: "#2f54eb",
    ink: "#2440c6",
    core: ["Customer-facing delivery", "Demo to production", "Enterprise integration"],
    more: [
      "Business rules to agent behavior",
      "Live diagnosis with customer IT",
      "SEV-A incident response",
      "99.5% SLA",
      "Team lead",
      "Remote delivery since 2019",
    ],
  },
  {
    title: "Cloud & DevOps",
    proof: "WriteBookAI runs in production on Google Cloud, with CI/CD, health checks and automatic rollback.",
    accent: "#c2410c",
    ink: "#b23a0b",
    core: ["Google Cloud", "Docker", "CI/CD"],
    more: [
      "Compute Engine",
      "Cloud Build",
      "Artifact Registry",
      "Secret Manager",
      "Identity-Aware Proxy",
      "Cloud Monitoring",
      "Cloud Logging",
      "Firebase Hosting",
      "Azure",
      "Load testing",
    ],
  },
  {
    title: "AI engineering",
    proof: "Built the fourth agent and completed the orchestration of a production four-agent LangGraph assistant on Google Vertex AI.",
    accent: "#0f7a55",
    ink: "#0f7a55",
    core: ["AI agents", "LangGraph", "RAG", "MCP", "Model routing & fallback"],
    more: [
      "Multi-agent systems",
      "Tool calling",
      "Structured JSON outputs",
      "Google Vertex AI",
      "Azure AI Foundry",
      "Azure AI Search",
      "Gemini",
      "Claude",
      "OpenAI",
    ],
  },
  {
    title: "Machine learning",
    proof: "LoRA took severity accuracy from ~20% (best prompting) to 89%; full fine-tuning took handwriting reads from 1/17 to 16/17.",
    accent: "#6d28d9",
    ink: "#6d28d9",
    core: ["Fine-tuning", "LoRA / PEFT", "PyTorch", "Hugging Face"],
    more: [
      "Full fine-tuning",
      "Gemma",
      "TrOCR",
      "YOLO",
      "Held-out test sets",
      "Model comparison",
      "Error analysis",
    ],
  },
];

const foundation = [
  "Python",
  "TypeScript",
  "Node.js",
  "Express",
  "React",
  "Next.js",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Microsoft Graph API",
  "ServiceNow",
  "Jira",
  "OAuth2",
];

const facts = [
  { label: "Remote setup", value: `India (IST). ${REMOTE.hours}.` },
  { label: "Work authorization", value: `${REMOTE.visa}. ${REMOTE.relocation}.` },
  { label: "Open to", value: `Remote Forward Deployed Engineer and AI engineer roles worldwide. ${REMOTE.hire}` },
  { label: "Recognition", value: "Etisalat Monthly Excellence Award, January 2019" },
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
                I&apos;m a Forward Deployed Engineer: a full-stack developer who ships AI to production on the cloud,
                working directly with enterprise customers. I sit with the customer, find the real problem, and see the
                fix into production.
              </p>
              <p>
                I started on the client side, six years at Etisalat in Dubai between enterprise customers and engineering
                teams. Since 2019 I&apos;ve built software for clients as an independent engineer and worked as a software
                engineer and customer-facing team lead at Sherweb. Today I&apos;m a senior software engineer at LTIMindtree, shipping an
                agentic RAG assistant to production for a Fortune 500 consumer-goods client. I also run WriteBookAI, my
                own product, in production on Google Cloud.
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

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
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
            <h4 className="font-semibold">Full-stack and integrations</h4>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Full-stack and integration skills">
              {foundation.map((skill) => (
                <li key={skill} className="rounded-full border border-rule bg-paper px-3 py-1 text-sm text-ink-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
