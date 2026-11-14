// Four steps, each backed by work shown elsewhere on this page
const steps = [
  {
    title: "Discover",
    lead: "Sit with the customer, find the real problem.",
    line: "10+ years with enterprise customers, from Etisalat client coordination to Sherweb's customer IT teams.",
  },
  {
    title: "Prototype",
    lead: "Working demo fast.",
    line: "TriageLens and the cheque verification AI are working apps, not notebooks: FastAPI and React, running on CPU.",
  },
  {
    title: "Ship",
    lead: "Production on their cloud, with CI/CD, rollback and security.",
    line: "Took a client's agentic RAG assistant from demo to production; WriteBookAI runs on Google Cloud with CI/CD and automatic rollback.",
  },
  {
    title: "Measure",
    lead: "Baselines and evals before claiming a win.",
    line: "Fine-tuned models are measured against prompting and rival models: ~20% → 89%, 1/17 → 16/17.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How I work</h2>
        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border border-rule bg-paper p-5">
              <span className="text-sm font-semibold text-cobalt tabular-nums">Step {i + 1}</span>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 font-medium leading-snug">{s.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
