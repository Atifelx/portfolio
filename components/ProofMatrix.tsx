import { ArrowRight } from "lucide-react";

// Each row maps a skill hiring teams screen for to the section on this page that proves it
const rows = [
  {
    skill: "Production AI system design",
    proof: "WriteBookAI: model router with fallback chain, async job queue, CI/CD with rollback",
    href: "#writebookai",
  },
  {
    skill: "Cloud & DevOps",
    proof:
      "Google Cloud: Compute Engine, Cloud Build, Artifact Registry, Secret Manager, IAP, Monitoring; Firebase Hosting; Docker",
    href: "#writebookai",
  },
  {
    skill: "AI agents & orchestration",
    proof:
      "Production agentic RAG assistant (4 agents, LangGraph) for a Fortune 500 client: built the 4th agent + completed the orchestration",
    href: "#experience",
  },
  {
    skill: "RAG & retrieval",
    proof:
      "Production agentic RAG: the client assistant retrieves from Azure AI Search through MCP; RAG sales assistant over a 13K-item inventory (2024)",
    href: "#experience",
  },
  {
    skill: "Evaluation",
    proof: "Held-out tests and head-to-head model comparison (TrOCR vs Qwen3-VL-4B); fine-tuned vs prompted baselines",
    href: "#icici-pixel",
  },
  {
    skill: "Fine-tuning",
    proof: "Gemma + LoRA (TriageLens); full fine-tuning of TrOCR and YOLO",
    href: "#triagelens",
  },
  {
    skill: "Customer-facing delivery",
    proof: "10+ years: Etisalat client coordination, Sherweb team lead (99.5% SLA), enterprise client work today",
    href: "#experience",
  },
];

export default function ProofMatrix() {
  return (
    <section id="proof" className="w-full bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-[24ch] text-3xl font-bold tracking-tight sm:text-4xl">
          What hiring teams ask for, and where it&apos;s proven
        </h2>

        {/* Table from md up */}
        <table className="mt-8 hidden w-full overflow-hidden rounded-xl border border-rule bg-paper text-left md:table">
          <thead className="bg-paper text-sm text-ink-3">
            <tr className="border-b border-rule">
              <th scope="col" className="w-[30%] px-6 py-3 font-medium">
                Skill they screen for
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Where it&apos;s proven
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.skill} className="border-t border-rule align-top first:border-t-0">
                <th scope="row" className="px-6 py-4 font-semibold">
                  {r.skill}
                </th>
                <td className="px-6 py-4">
                  <a href={r.href} className="group flex items-start justify-between gap-6 text-ink-2 hover:text-ink">
                    <span className="leading-relaxed">{r.proof}</span>
                    <ArrowRight
                      size={18}
                      className="mt-1 flex-shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                      aria-hidden
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cards on phones */}
        <ul className="mt-8 space-y-3 md:hidden">
          {rows.map((r) => (
            <li key={r.skill}>
              <a href={r.href} className="block rounded-xl border border-rule bg-paper p-4">
                <span className="flex items-center justify-between gap-3 font-semibold">
                  {r.skill}
                  <ArrowRight size={16} className="flex-shrink-0 text-ink-3" aria-hidden />
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-2">{r.proof}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
