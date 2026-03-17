"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const projectsData = [
  {
    title: "WriteBookAI",
    status: "Live Production",
    links: { "Web": "http://writebookai.com" },
    description: "Built to overcome writer's block, this platform generates 95%+ human-quality output that can be directly published on Amazon Kindle. It uses the Gemini API for production-grade, multiple orchestrations to create a complete book from a user prompt, specifically designed for Amazon Kindle authors.",
    users: "50+ active non-fiction authors",
    tech: ["React", "Node.js", "PostgreSQL", "Gemini", "Stripe"],
    gradient: "from-purple-500/20 to-blue-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Blago AI",
    status: "Production",
    links: { "App Landing": "https://seo-ai-eppw.vercel.app/", "Dashboard": "https://seo-ai-eppw.vercel.app/tester-login" },
    description: "Writes SEO-friendly articles based on user-provided keywords and topics. It generates human-style content using an inbuilt humanizer and SEO algorithm while targeting main keywords. Users can edit the generated content and directly publish it to WordPress from within the application.",
    tech: ["Google Gemini", "React", "WordPress API"],
    gradient: "from-teal-500/20 to-emerald-500/20",
    border: "group-hover:border-teal-500/50"
  },
  {
    title: "CVStudio.org",
    status: "Open Source",
    links: { "Web": "https://cvstudio.org" },
    description: "A 100% free and open-source platform built to help candidates get their resumes shortlisted. It uses the most approachable ATS format online, without relying on AI. Users can paste content from an AI, instantly modify it, and export to PDF or DOCX.",
    tech: ["Next.js", "TailwindCSS"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-orange-500/50"
  },
  {
    title: "Clever Chat",
    status: "Production",
    links: { "Demo": "#" },
    description: "A RAG chatbot that allows users to upload PDF and DOCX files to a database and ask questions about the documents. If an answer isn't in the database, the agent uses live search to find it. Demonstrates skills in LangChain, RAG, vector databases, Embedding APIs, LLMs, OpenRouter, and multi-agent orchestrations.",
    tech: ["Python", "LangChain", "Vector Databases", "LLM APIs"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "CryptoClever",
    status: "Under Development",
    links: { "Web": "http://4.213.225.24:3000/" },
    description: "A trading signal platform for crypto utilizing a Fibonacci algorithm (originally Python, translated to TypeScript) and the Binance Free API for real-time live signal chart movements. It calculates candles algorithmically to suggest next movements, while RAG is used to backtest past candles. Forex pairs are upcoming. Deployed to Azure using GitHub Actions CI/CD pipelines.",
    tech: ["TypeScript", "Python", "Binance API", "Azure", "GitHub Actions"],
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "group-hover:border-rose-500/50"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-teal-400 mr-2">03.</span> Select Projects
          </h2>
          <p className="text-gray-400 text-lg mb-2">Real-world applications built for production.</p>
          <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">
            * These projects are for the demonstration of skills and capabilities. Many other projects have been excluded from this portfolio due to NDA agreements with previous clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={clsx(
                "group relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                project.border
              )}
            >
              {/* Card Gradient Background */}
              <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100", project.gradient)} />
              
              <div className="relative p-8 h-full flex flex-col z-10 glass-card mx-2 my-2 bg-[#0a0a0a]/90 h-[calc(100%-16px)]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium rounded-full bg-white/10 text-gray-300">
                      {project.status}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex space-x-3 text-gray-400 items-center">
                    {Object.entries(project.links).map(([key, url]) => {
                      const isWebLink = key.toLowerCase() !== 'github';
                      
                      return (
                        <div key={key} className="relative group/link flex items-center">
                          {isWebLink && (
                            <div className="absolute right-full mr-3 opacity-0 group-hover/link:opacity-100 transition-all duration-300 translate-x-4 group-hover/link:translate-x-0 pointer-events-none z-20">
                              <span className="text-teal-400 font-mono text-xs whitespace-nowrap bg-teal-900/40 px-3 py-1.5 rounded-md border border-teal-400/30 backdrop-blur-md flex items-center shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                                <span className="font-semibold text-white mr-2">{key}</span> 
                                <span className="opacity-50 mr-2">|</span> 
                                Test it live
                              </span>
                            </div>
                          )}
                          
                          <a 
                            href={url as string} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={clsx(
                              "transition-all duration-300 relative z-10 p-2 rounded-lg flex items-center justify-center",
                              isWebLink 
                                ? "text-teal-400 hover:bg-teal-400/20 group-hover/link:shadow-[0_0_15px_rgba(45,212,191,0.2)]" 
                                : "hover:text-white hover:bg-white/10"
                            )}
                            aria-label={key}
                          >
                            {key.toLowerCase() === 'github' ? <Github size={20} /> : <ArrowUpRight size={24} className={isWebLink ? "drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" : ""} />}
                            
                            {isWebLink && (
                              <span className="absolute top-1 right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                              </span>
                            )}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {project.users && (
                  <p className="text-sm text-purple-400 mb-6 font-medium">
                    {project.users}
                  </p>
                )}

                <ul className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10 font-mono text-xs text-gray-400">
                  {project.tech.map((tech, tIdx) => (
                    <li key={tIdx} className="mr-3 mb-2 whitespace-nowrap">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
