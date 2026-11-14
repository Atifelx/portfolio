"use client";

import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import clsx from "clsx";
import CaseStudyModal, { Bullets, Section } from "./CaseStudyModal";

type Node = { title: string; sub?: string; tone?: "primary" | "fallback" | "plain" };

const tone = {
  plain: "border-rule bg-paper",
  primary: "border-cobalt/50 bg-cobalt/5",
  fallback: "border-outcome/40 bg-outcome/5",
};

// One lane of the diagram: boxes joined by arrows, in a row from md up and a column on phones
function Lane({ label, nodes, arrowLabel }: { label: string; nodes: Node[]; arrowLabel?: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">{label}</p>
      <ol className="flex flex-col items-stretch gap-1.5 md:flex-row md:items-center md:gap-2">
        {nodes.map((n, i) => (
          <Fragment key={n.title}>
            {i > 0 && (
              <li className="flex flex-shrink-0 items-center justify-center gap-1 text-ink-3" aria-hidden>
                <ArrowRight size={16} className="hidden md:block" />
                <ArrowDown size={16} className="md:hidden" />
                {arrowLabel && <span className="text-[11px] md:hidden">{arrowLabel}</span>}
              </li>
            )}
            <li className={clsx("min-w-0 flex-1 rounded-lg border px-3 py-2 text-center", tone[n.tone ?? "plain"])}>
              <span className="block text-sm font-semibold leading-tight">{n.title}</span>
              {n.sub && <span className="mt-0.5 block text-xs leading-snug text-ink-3">{n.sub}</span>}
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

function Architecture() {
  return (
    <figure className="rounded-xl border border-rule bg-surface p-4 md:p-6">
      <div className="space-y-6">
        <Lane
          label="Request path"
          nodes={[
            { title: "React app", sub: "Firebase Hosting" },
            { title: "Caddy", sub: "Reverse proxy, TLS" },
            { title: "Node.js 22 API", sub: "Docker on Compute Engine", tone: "primary" },
            { title: "MongoDB Atlas", sub: "Data and job queue" },
          ]}
        />
        <Lane
          label="Long AI jobs"
          nodes={[
            { title: "API", sub: "Puts a job on the queue" },
            { title: "Agenda.js queue", sub: "Stored in MongoDB" },
            { title: "Worker container", sub: "Runs chapter jobs" },
            { title: "Model router", sub: "One service for all AI calls", tone: "primary" },
          ]}
        />
        <Lane
          label="Model fallback chain (on failure, try the next)"
          arrowLabel="on failure"
          nodes={[
            { title: "Claude Opus 5.5", sub: "Azure AI Foundry", tone: "primary" },
            { title: "Gemini 3 Flash", sub: "Vertex AI", tone: "fallback" },
            { title: "Gemini 3.1 Flash-Lite", sub: "Vertex AI", tone: "fallback" },
          ]}
        />
        <div className="border-t border-dashed border-rule pt-6">
          <Lane
            label="Delivery (side lane)"
            nodes={[
              { title: "Cloud Build" },
              { title: "Artifact Registry" },
              { title: "Deploy script", sub: "On the VM" },
              { title: "Health check" },
              { title: "Auto-rollback", sub: "Last good release", tone: "fallback" },
            ]}
          />
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-center text-sm text-ink-2">
            Watched by Cloud Monitoring and Cloud Logging, with API and worker watchdogs.
          </p>
        </div>
      </div>
      <figcaption className="mt-5 text-sm leading-relaxed text-ink-3">
        Stage prompts (voice / writing DNA → project context → source analysis → author verification → drafting) are
        model-agnostic and editable in an admin panel. Sources go to the model as long context, not through a vector
        index.
      </figcaption>
    </figure>
  );
}

const jobSettings = [
  { setting: "Queue", value: "Agenda.js, stored in MongoDB, in a separate worker container" },
  { setting: "Polling", value: "Every 5 s" },
  { setting: "Concurrency", value: "4 chapter jobs at once, max 2 per author" },
  { setting: "Job lock", value: "3 minutes, renewed every minute" },
  { setting: "Retries", value: "3, with exponential backoff" },
  { setting: "AI timeout", value: "300 s" },
  { setting: "Heartbeat", value: "Every 30 s" },
  { setting: "Duplicates", value: "Duplicate-job protection" },
];

const loadTest = [
  { authors: 10, success: "100%", p95: "168 ms" },
  { authors: 25, success: "100%", p95: "161 ms" },
  { authors: 50, success: "100%", p95: "333 ms" },
];

function CaseStudy() {
  return (
    <>
      <Section title="The problem">
        <p className="leading-relaxed text-ink-2">
          WriteBookAI drafts book chapters in an author&apos;s own voice. Each chapter is a long, multi-stage AI job, and
          any model provider can be slow or fail mid-job. The system has to finish the work anyway, run several authors
          at once, keep secrets safe, and let me ship changes without breaking production.
        </p>
      </Section>

      <Section title="Architecture">
        <Architecture />
      </Section>

      <Section title="Reliability for long AI tasks">
        <div className="overflow-x-auto rounded-lg border border-rule">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-ink-3">
              <tr>
                <th className="px-4 py-3 font-medium">Job setting</th>
                <th className="px-4 py-3 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {jobSettings.map((r) => (
                <tr key={r.setting} className="border-t border-rule align-top">
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{r.setting}</td>
                  <td className="px-4 py-3 text-ink-2">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-ink-2">
          Deploys go through Google Cloud Build and Artifact Registry to automated VM deploy scripts, with secret
          scanning, health checks, commit verification and automatic rollback to the last good release.
        </p>
      </Section>

      <Section title="Security">
        <Bullets
          items={[
            "Secrets in Secret Manager; model API keys are encrypted before storage.",
            "Least-privilege service account.",
            "SSH only through Identity-Aware Proxy; only ports 80 and 443 open.",
            "Shielded VM (Secure Boot, vTPM); the container runs as a non-root user.",
            "TLS and a static-IP allowlist to the database.",
            "CORS, request limits and authentication on the API.",
            "Daily disk snapshots, kept 7 days.",
          ]}
        />
      </Section>

      <Section title="Load test">
        <div className="overflow-x-auto rounded-lg border border-rule">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-surface text-left text-ink-3">
              <tr>
                <th className="px-4 py-3 font-medium">Concurrent simulated authors</th>
                <th className="px-4 py-3 font-medium">Success</th>
                <th className="px-4 py-3 font-medium">p95 latency</th>
              </tr>
            </thead>
            <tbody>
              {loadTest.map((r) => (
                <tr key={r.authors} className="border-t border-rule">
                  <td className="px-4 py-3 font-medium">{r.authors}</td>
                  <td className="px-4 py-3 text-outcome">{r.success}</td>
                  <td className="px-4 py-3">{r.p95}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-ink">
          <b>
            Run on a developer laptop with a mocked LLM (15 s simulated latency). This proves API and queue handling. It
            does not prove 50 real simultaneous AI generations, and it is not a production test.
          </b>
        </p>
      </Section>

      <Section title="Known limits and next steps">
        <Bullets
          items={[
            // TODO(Atif): confirm next step
            <>
              <b className="text-ink">Single VM.</b> Cost-lean, but a single point of failure.
            </>,
            // TODO(Atif): confirm next step
            <>
              <b className="text-ink">Mocked model in the load test.</b> Real AI generation under concurrent load is not
              measured yet.
            </>,
            // TODO(Atif): confirm next step
            <>
              <b className="text-ink">Long context, not retrieval.</b> Sources go to the model as long context.
            </>,
          ]}
        />
      </Section>
    </>
  );
}

export default function WriteBookCaseStudy({ className }: { className?: string }) {
  return (
    <CaseStudyModal
      title="WriteBookAI"
      subtitle="Agentic writing platform in production on Google Cloud"
      className={className}
      footer="Founder-built. Live at writebookai.com."
    >
      <CaseStudy />
    </CaseStudyModal>
  );
}
