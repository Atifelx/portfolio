import { existsSync } from "node:fs";
import { join } from "node:path";
import ImageCarousel, { type Slide } from "./ImageCarousel";
import ChequeCaseStudy from "./ChequeCaseStudy";
import WriteBookCaseStudy from "./WriteBookCaseStudy";
import { CHEQUE_REPO_URL } from "@/lib/profile";

type Project = {
  id: string;
  title: string;
  tagline: string;
  proves: string[]; // pill row: what this project proves
  result: string;
  problem: string;
  built: string;
  note?: string;
  tech: string[];
  links: { label: string; href: string }[];
  slides: Slide[];
  slidesAspect: string;
  caseStudy?: "writebookai" | "cheque";
};

// Optional screenshots: a slide appears only once its file is in public/
const ifExists = (slide: Slide): Slide[] => (existsSync(join(process.cwd(), "public", slide.src)) ? [slide] : []);

const projects: Project[] = [
  {
    id: "writebookai",
    title: "WriteBookAI",
    tagline: "Agentic writing platform in production on Google Cloud.",
    proves: ["Production", "GCP", "Model fallback", "CI/CD"],
    result:
      "In production on GCP with a Claude → Gemini fallback chain, CI/CD with automatic rollback, and a background job queue built for long AI tasks.",
    problem:
      "Drafting a book chapter in an author's voice is a long, multi-stage AI job. It has to finish even when a model provider is slow or fails.",
    built:
      "Founder-built. A React app on Firebase Hosting and a Node.js 22 API in Docker on Compute Engine. One model-routing service sends each stage to Claude Opus 5.5 on Azure AI Foundry and falls over to Gemini 3 Flash, then Gemini 3.1 Flash-Lite, on Vertex AI. Chapters run on an Agenda.js job queue in a separate worker, with locks, retries and timeouts. Cloud Build deploys with health checks and automatic rollback.",
    tech: ["Node.js 22", "React", "MongoDB Atlas", "Docker", "Google Cloud", "Azure AI Foundry", "Vertex AI"],
    links: [{ label: "Live site", href: "https://www.writebookai.com/" }],
    slides: [
      ...ifExists({
        src: "/writebookai/admin-ai-models.png",
        title: "Admin: model routing with fallback and model-agnostic stage prompts",
      }),
      { src: "/writebookaiN.png", title: "WriteBookAI: books in the author's voice" },
      ...ifExists({ src: "/writebookai/app-1.png", title: "WriteBookAI app" }),
      ...ifExists({ src: "/writebookai/app-2.png", title: "WriteBookAI app" }),
    ],
    slidesAspect: "2532 / 1546",
    caseStudy: "writebookai",
  },
  {
    id: "triagelens",
    title: "TriageLens",
    tagline: "Fine-tuned Gemma for IT incident triage.",
    proves: ["Fine-tuning", "LoRA", "Baseline vs fine-tuned"],
    result: "Severity accuracy: best prompting ~20% → fine-tuned 89%",
    problem: "Service desk engineers read every incident to judge its severity before it can be routed.",
    built:
      "Best prompting plateaued at about 20% severity accuracy, so I fine-tuned Gemma 3 270M on 1,500 real incidents. Then I added 400 targeted severity examples and a second LoRA adapter: one base model, two specialists. It runs on CPU, and engineers review each result before it is routed to Teams, ServiceNow or Jira.",
    tech: ["Gemma 3 270M", "LoRA", "PyTorch", "Hugging Face", "FastAPI", "Next.js"],
    links: [
      { label: "Code", href: "https://github.com/Atifelx/AI_Triage" },
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
  {
    id: "icici-pixel",
    title: "Cheque verification AI",
    tagline: "Five vision models in one pipeline, three of them fully fine-tuned.",
    proves: ["Computer vision", "Full fine-tuning", "Head-to-head eval"],
    result: "Handwritten amounts read correctly: 1/17 → 16/17 on unseen cheques",
    problem: "Bank staff check every cheque by hand: read the handwriting, find the account, compare the signature.",
    built:
      "EasyOCR for printed text, two fully fine-tuned YOLO detectors to find each field, a fully fine-tuned TrOCR for handwriting and a Siamese ResNet-18 for signatures. TrOCR beat Qwen3-VL-4B head to head: fewer wrong amounts, 7× smaller. Ships as an offline, CPU-only FastAPI + React app in Docker.",
    note: "Built on synthetic data. Not affiliated with any bank.",
    tech: ["TrOCR", "YOLO", "EasyOCR", "PyTorch", "Hugging Face", "FastAPI", "React", "Docker"],
    links: [
      ...(CHEQUE_REPO_URL ? [{ label: "Code", href: CHEQUE_REPO_URL }] : []),
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
    caseStudy: "cheque",
  },
];

const linkClass = "font-medium text-ink underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-cobalt";

function ProjectRow({ project }: { project: Project }) {
  return (
    <article id={project.id} className="grid grid-cols-1 gap-8 border-t border-rule py-14 md:grid-cols-12 md:gap-12 md:py-20">
      <div className="min-w-0 md:col-span-5">
        <ul className="flex flex-wrap gap-2" aria-label="What it proves">
          {project.proves.map((p) => (
            <li key={p} className="rounded-full border border-cobalt/30 bg-cobalt/5 px-3 py-0.5 text-sm font-medium text-cobalt">
              {p}
            </li>
          ))}
        </ul>
        <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
        <p className="mt-2 text-ink-3">{project.tagline}</p>

        <p className="mt-5 text-lg font-semibold leading-snug text-outcome">{project.result}</p>

        <dl className="mt-6 space-y-5 leading-relaxed">
          <div>
            <dt className="font-semibold">Problem</dt>
            <dd className="mt-1 text-ink-2">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold">What I built</dt>
            <dd className="mt-1 text-ink-2">{project.built}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-ink-3">Built with {project.tech.join(", ")}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {link.label}
            </a>
          ))}
          {project.caseStudy === "writebookai" && <WriteBookCaseStudy className={`${linkClass} cursor-pointer`} />}
          {project.caseStudy === "cheque" && <ChequeCaseStudy className={`${linkClass} cursor-pointer`} />}
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
            Three systems I built end to end: one in production on Google Cloud, two fine-tuned models measured against
            baselines.
          </p>
        </div>

        <div className="mt-10">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>

        <div className="border-t border-rule pt-10">
          <h3 className="text-xl font-semibold tracking-tight">Also built</h3>
          <p className="mt-4 max-w-[75ch] leading-relaxed">
            <span className="font-semibold">CryptoClever. </span>
            <span className="text-ink-2">
              A multi-agent crypto trading research platform: scalping, support-and-resistance, trend and news agents,
              with an LLM double-check.
            </span>{" "}
            <a href="https://github.com/Atifelx/CryptoClever" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Code on GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
