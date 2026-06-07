"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const projectsData = [
  {
    title: "Healthcare AI Automation",
    status: "Production",
    links: {},
    image: "/n8n.png",
    description: "A full-scale automation system for healthcare enterprise customers using LLMs, Agentic RAG, and intelligent n8n workflows. The system monitors health scores daily and triggers automated alerts if scores fall below defined thresholds.",
    tech: ["n8n", "LLM", "Agentic RAG", "AI Agents", "Python"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "CryptoClever",
    status: "Under Development",
    links: { "Web": "http://20.9.95.66/" },
    image: "/landingimage/cryptoclever.png",
    description: "Trading Engine signal. Use open AI langchain - news tools and deep analysis to give signals.",
    tech: ["TypeScript", "Python", "Binance API", "Azure", "LangChain"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    title: "WritebookAI",
    status: "Live Production",
    links: { "Web": "http://writebookai.com" },
    image: "/landingimage/writebookAI.png",
    description: "Write complete chapter and book from user prompt while giving 90% human style writing draft - build tool for amazon KDP. Use Gemini API for text generation and text humanizations. Inbuilt editor like Notion.",
    tech: ["React", "Node.js", "PostgreSQL", "Gemini", "Stripe"],
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Blago AI",
    status: "Production",
    links: { "App Landing": "https://seo-ai-eppw.vercel.app/", "Dashboard": "https://seo-ai-eppw.vercel.app/tester-login" },
    image: "/landingimage/blagoAi.png",
    description: "Write human style undetectable content and post on WordPress within app.",
    tech: ["Google Gemini", "React", "WordPress API"],
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  {
    title: "Clevechat",
    status: "Production",
    links: { "Demo": "https://agent-live-vpbp.vercel.app/" },
    image: "/landingimage/cleaverchat.png",
    description: "RAG base chat which user can talk with uploaded documents.",
    tech: ["Python", "LangChain", "Vector Databases", "LLM APIs"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "CvstudioORg",
    status: "Open Source",
    links: { "Web": "https://cvstudio.org" },
    image: "/landingimage/cvstudio.png",
    description: "Open source free CV Maker.",
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
                    <span className="px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tech, tIdx) => (
                      <span key={tIdx} className="px-4 py-2 text-sm font-mono text-gray-400 bg-white/5 rounded-lg border border-white/10 hover:border-teal-500/30 transition-colors">
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
                        className="group inline-flex items-center gap-2 px-8 py-4 font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
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
