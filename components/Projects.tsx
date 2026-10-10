"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Zap, ChevronDown } from "lucide-react";
import clsx from "clsx";
import ImageCarousel from "./ImageCarousel";
import FineTuneDemo from "./FineTuneDemo";

const projectsData = [
  {
    title: "TriageLens",
    status: "Machine Learning Project",
    featured: true,
    fineTuneDemo: true,
    links: { "GitHub": "https://github.com/Atifelx/AI_Triage" },
    image: "/AITRIAGE/1.png",
    slides: [
      { src: "/AITRIAGE/1.png", title: "Live ticket queue" },
      { src: "/AITRIAGE/2.png", title: "Manual triage" },
      { src: "/AITRIAGE/3.png", title: "Evaluation dashboard" },
    ],
    description: "Every IT service desk faces the same bottleneck: an engineer must read each incident and judge its urgency before it can be routed — slow, inconsistent, and costly when a critical outage waits in the queue. TriageLens reads the incident and instantly suggests a P1–P4 severity, so engineers confirm instead of triaging from scratch. Rather than paying for a large LLM API, I solved it with one of the smallest open models available: Google's Gemma 3 270M plus a 2.8 MB LoRA adapter. Prompting alone scored 7%; after two fine-tuning rounds, a severity-focused adapter scored 100% on a held-out synthetic test set. Real-world tickets written in other styles are harder, so the next step is training on a larger, more varied set of real incidents. It runs locally on CPU in ~0.4 s per ticket.",
    tech: ["Gemma 3 270M", "LoRA / PEFT", "PyTorch", "Hugging Face", "FastAPI", "Next.js"],
    gradient: "from-teal-500/20 to-purple-500/20",
    architectureTitle: "Why Gemma 3 270M",
    architecture: [
      "Smallest model that fit — a 4-label task doesn't need a large model's world knowledge",
      "Instruction-tuned — valid JSON 99% of the time before any training",
      "Runs on CPU at ~0.41 s per ticket — no GPU server, no paid API",
      "LoRA trains just 0.27% of weights — a 2.8 MB, swappable adapter"
    ]
  },
  {
    title: "CryptoClever",
    status: "Live — Agents Trading 24/7",
    featured: true,
    links: { "Live Dashboard": "http://20.198.93.159:3000/" },
    image: "/landingimage/cryptoclever.png",
    slides: [{ src: "/landingimage/cryptoclever.png", title: "CryptoClever — live dashboard" }],
    slidesAspect: "2878 / 1434",
    description: "A fully autonomous multi-agent trading system where 4 LangGraph agents make independent trading decisions on Binance — no human in the loop. Two signal agents (Scalp + Long) run 24/7 on an Azure VM analyzing live market data, while 2 algo-trading agents execute real trades using their own decision logic. Each signal passes through 14 parameter checks — including live news sentiment via API, RSI/MACD/Bollinger technical indicators, and volume analysis — before firing. Agents coordinate via shared ChromaDB memory and communicate state over WebSockets. Currently hitting ~60% signal accuracy in live testing.",
    tech: ["LangGraph", "Multi-Agent", "Python", "Binance API", "Azure VM", "ChromaDB", "WebSockets", "OpenAI", "Live News API"],
    gradient: "from-rose-500/20 to-pink-500/20",
    architecture: [
      "Signal Agent (Scalp) — scans 1m/5m candles, fires short-term entries",
      "Signal Agent (Long) — analyzes 1h/4h trends for swing positions",
      "Algo Agent 1 — executes market orders on Binance with stop-loss logic",
      "Algo Agent 2 — manages position sizing and portfolio risk",
      "Shared Memory — ChromaDB stores agent decisions for cross-agent reasoning"
    ]
  },
  {
    title: "WriteBookAI",
    status: "Live Production — 170+ Authors",
    featured: true,
    links: { "Try It": "http://writebookai.com" },
    image: "/writebookaiN.png",
    slides: [{ src: "/writebookaiN.png", title: "WriteBookAI — authority books in your voice" }],
    slidesAspect: "2532 / 1546",
    description: "A high-ticket AI ghostwriting platform that turns an expert's proven method into an authority book that sounds like them. AI agents run a 9-stage, ghostwriter-style process — guided interviews that uncover the author's thinking, then organizing their frameworks, stories and source material — while a Writing DNA engine recognizes 13+ voice patterns from how they already write and speak. The output is an editable manuscript and a book-led client campaign, built for coaches, consultants, course creators and B2B founders. Multi-LLM orchestration routes each stage to OpenAI, Claude or Gemini.",
    tech: ["AI Agents", "Writing DNA Engine", "Multi-LLM Orchestration", "OpenAI", "Claude", "Gemini", "React", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Healthcare AI Automation",
    status: "Enterprise Production",
    featured: true,
    links: {},
    image: "/n8n.png",
    description: "Enterprise healthcare automation built for a real client — uses LLMs with Agentic RAG and n8n workflow orchestration to monitor patient health scores daily. When scores fall below clinical thresholds, the system triggers automated alerts to care teams with contextual recommendations pulled from the patient's medical history via RAG. End-to-end: data ingestion, LLM reasoning, alert routing, and clinician dashboards.",
    tech: ["n8n", "LLM", "Agentic RAG", "AI Agents", "Python", "Healthcare"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Blago AI",
    status: "Production",
    links: { "App Landing": "https://seo-ai-eppw.vercel.app/", "Dashboard": "https://seo-ai-eppw.vercel.app/tester-login" },
    image: "/landingimage/blagoAi.png",
    description: "AI-powered SEO content platform that generates human-style, undetectable content and publishes directly to WordPress — all within the app. Built for content teams who need to scale organic traffic without sounding robotic.",
    tech: ["Google Gemini", "React", "WordPress API", "SEO Optimization"],
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  {
    title: "Clever RAG",
    status: "Live Demo",
    links: { "Try the Demo": "https://agent-live-vpbp.vercel.app/" },
    image: "/RAG.png",
    slides: [{ src: "/RAG.png", title: "Clever RAG — chat with your documents" }],
    slidesAspect: "2604 / 1490",
    description: "A retrieval-augmented generation (RAG) assistant that turns any document library into something you can talk to. Upload whole books, manuals or reports, and Clever RAG indexes them into a vector database; then ask questions in plain language and get answers grounded in the actual text, with the source document cited under every reply — so users can verify the answer instead of trusting a guess. In the demo, two full-length books (Think and Grow Rich and The 48 Laws of Power) are ingested, and asking for the 4th law of power returns Law 4, \"Always say less than necessary\", retrieved from the right book. Questions outside the uploaded documents can be answered from the live web.",
    tech: ["Python", "LangChain", "Vector Database", "Embeddings", "LLM APIs", "RAG"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    architectureTitle: "How It Works",
    architecture: [
      "Ingest — upload PDF, TXT or DOCX files up to 50 MB, including full-length books",
      "Chunk & embed — text is split into semantic chunks and stored as vectors",
      "Retrieve — each question is matched to the most relevant passages across all documents",
      "Answer — the LLM responds from the retrieved context and cites its source",
      "Sessions — chat history is kept per session; the knowledge base can be reset anytime"
    ]
  },
  {
    title: "CvstudioOrg",
    status: "Open Source",
    links: { "Web": "https://cvstudio.org" },
    image: "/landingimage/cvstudio.png",
    description: "Open-source, free resume builder with modern templates and real-time preview.",
    tech: ["Next.js", "TailwindCSS"],
    gradient: "from-orange-500/20 to-amber-500/20",
  }
];

const exploreTitles = ["Healthcare AI Automation", "Blago AI", "CvstudioOrg"];
const featuredProjects = projectsData.filter(p => !exploreTitles.includes(p.title));
const exploreProjects = projectsData.filter(p => exploreTitles.includes(p.title));

function ProjectCard({ project, idx }: { project: typeof projectsData[0]; idx: number }) {
  return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={clsx(
                "flex flex-col gap-12 items-center",
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    {(project as any).featured && (
                      <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                        <Zap size={12} className="fill-amber-400" />
                        Featured
                      </span>
                    )}
                    <span className={clsx(
                      "px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded-full border",
                      project.status.includes("Live")
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                    )}>
                      {project.status.includes("Live") && (
                        <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                      )}
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                    {project.description}
                  </p>

                  {(project as any).fineTuneDemo && <FineTuneDemo />}

                  {/* Architecture Breakdown for CryptoClever */}
                  {(project as any).architecture && (
                    <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-sm font-mono font-bold text-teal-400 uppercase tracking-widest mb-4">{(project as any).architectureTitle ?? "Agent Architecture"}</h4>
                      <div className="space-y-3">
                        {(project as any).architecture.map((line: string, aIdx: number) => (
                          <div key={aIdx} className="flex items-start gap-3">
                            <span className="mt-1 w-6 h-6 rounded-md bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/20 flex items-center justify-center text-xs font-bold text-rose-400 flex-shrink-0">
                              {aIdx + 1}
                            </span>
                            <span className="text-sm text-gray-300 leading-relaxed">{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tech, tIdx) => (
                      <span key={tIdx} className={clsx(
                        "px-4 py-2 text-sm font-mono rounded-lg border transition-colors",
                        (project as any).featured
                          ? "text-gray-300 bg-white/[0.07] border-white/15 hover:border-teal-500/40 hover:text-teal-300"
                          : "text-gray-400 bg-white/5 border-white/10 hover:border-teal-500/30"
                      )}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {Object.entries(project.links).map(([key, url]) => (
                      <a
                        key={key}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                          "group inline-flex items-center gap-2 px-8 py-4 font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1",
                          (project as any).featured
                            ? "text-black bg-teal-400 hover:bg-teal-300 hover:shadow-[0_10px_40px_-10px_rgba(45,212,191,0.5)]"
                            : "text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                        )}
                      >
                        <span>{key}</span>
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group/img"
                >
                  <div className={clsx(
                    "absolute -inset-4 rounded-[2rem] bg-gradient-to-br opacity-0 group-hover/img:opacity-100 blur-2xl transition-opacity duration-700",
                    project.gradient
                  )} />
                  {(project as any).slides ? (
                    <ImageCarousel slides={(project as any).slides} alt={project.title} aspectRatio={(project as any).slidesAspect} />
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
  );
}

export default function Projects() {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            <span className="text-teal-400 mr-2 font-mono text-2xl md:text-3xl">01.</span> Build <span className="text-gradient">Impactful</span> Projects
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
            These curated engineering case studies demonstrate technical depth, architectural proficiency, and the ability to design and ship production-grade AI solutions for complex enterprise environments.
          </p>
        </motion.div>

        <div className="space-y-40">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

        {/* Explore More */}
        <div className="mt-32 text-center">
          <button
            onClick={() => setShowExplore(!showExplore)}
            className={clsx(
              "group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300",
              showExplore
                ? "bg-teal-400/10 text-teal-400 border border-teal-400/30"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <span>{showExplore ? "Hide Projects" : "Explore More Projects"}</span>
            <ChevronDown
              size={22}
              className={clsx(
                "transition-transform duration-300",
                showExplore && "rotate-180"
              )}
            />
          </button>
        </div>

        <AnimatePresence>
          {showExplore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-40 pt-32">
                {exploreProjects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} idx={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
    </section>
  );
}
