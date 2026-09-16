"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Zap } from "lucide-react";
import clsx from "clsx";

const projectsData = [
  {
    title: "CryptoClever",
    status: "Live — Agents Trading 24/7",
    featured: true,
    links: { "Live Dashboard": "http://20.198.93.159:3000/" },
    image: "/landingimage/cryptoclever.png",
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
    image: "/landingimage/writebookAI.png",
    description: "An AI ghostwriting platform that extracts an author's unique 'voice DNA' — tone, rhythm, vocabulary patterns, and sentence structure — then writes full chapters that sound like the author wrote them. Built as a direct competitor to leading AI writing tools but with a key differentiator: it doesn't just generate text, it becomes a writing partner that discusses ideas, develops plot arcs, and maintains character consistency across chapters. Multi-LLM orchestration routes tasks to OpenAI, Claude, or Gemini based on the writing task. 170+ active authors using it for Amazon KDP publishing. Built-in Notion-style editor with real-time collaboration.",
    tech: ["React", "Node.js", "PostgreSQL", "OpenAI", "Claude", "Gemini", "Multi-LLM Orchestration", "Stripe", "Voice DNA Engine"],
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
    title: "Clevechat",
    status: "Production",
    links: { "Demo": "https://agent-live-vpbp.vercel.app/" },
    image: "/landingimage/cleaverchat.png",
    description: "RAG-based conversational AI that lets users upload any document and have a natural conversation with its contents. Handles PDFs, Word docs, and text files with semantic chunking and vector search for accurate retrieval.",
    tech: ["Python", "LangChain", "Vector Databases", "LLM APIs", "RAG"],
    gradient: "from-blue-500/20 to-cyan-500/20",
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

export default function Projects() {
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
            <span className="text-teal-400 mr-2 font-mono text-2xl md:text-3xl">02.</span> Build <span className="text-gradient">Impactful</span> Projects
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
            These curated engineering case studies demonstrate technical depth, architectural proficiency, and the ability to design and ship production-grade AI solutions for complex enterprise environments.
          </p>
        </motion.div>

        <div className="space-y-40">
          {projectsData.map((project, idx) => (
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

                  {/* Architecture Breakdown for CryptoClever */}
                  {(project as any).architecture && (
                    <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-sm font-mono font-bold text-teal-400 uppercase tracking-widest mb-4">Agent Architecture</h4>
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
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
    </section>
  );
}
