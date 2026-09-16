"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  BrainCircuit,
  Code2,
  Database,
  Network,
  Users,
  Cpu,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Skill {
  name: string;
  detail?: string;
  hot?: boolean;
}

interface SkillCategory {
  category: string;
  headline: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
  accent: string;
  borderAccent: string;
  glowColor: string;
}

export const skillsData: SkillCategory[] = [
  {
    category: "AI & LLM Engineering",
    headline: "Production AI systems — not notebooks",
    icon: <BrainCircuit className="w-7 h-7" />,
    skills: [
      { name: "Multi-Agent Systems", detail: "LangGraph orchestration, 4-agent architectures", hot: true },
      { name: "Agentic AI", detail: "Autonomous agents with tool use and shared memory", hot: true },
      { name: "RAG Architecture", detail: "Vector search → LLM pipelines, 13K+ document scale" },
      { name: "LangGraph / LangChain", detail: "Agent graphs, state machines, tool routing" },
      { name: "Prompt Engineering", detail: "System prompts, few-shot, chain-of-thought" },
      { name: "OpenAI / Claude / Gemini", detail: "Multi-LLM orchestration, model routing" },
      { name: "Vector Databases", detail: "ChromaDB, embeddings, semantic search" },
    ],
    color: "purple",
    accent: "text-purple-400",
    borderAccent: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    category: "Machine Learning & Training",
    headline: "From transformer theory to deployed models",
    icon: <Sparkles className="w-7 h-7" />,
    skills: [
      { name: "Transformer Architecture", detail: "Attention mechanisms, encoder-decoder, positional encoding", hot: true },
      { name: "LLM Fine-Tuning", detail: "LoRA, QLoRA, PEFT — parameter-efficient training", hot: true },
      { name: "Open-Weight Training", detail: "Training and deploying open-source models" },
      { name: "ML Model Development", detail: "Building and deploying tiny models for edge/production" },
      { name: "NLP", detail: "Text classification, entity extraction, sentiment analysis" },
      { name: "Model Evaluation", detail: "Benchmarking, A/B testing, accuracy metrics" },
    ],
    color: "rose",
    accent: "text-rose-400",
    borderAccent: "border-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  {
    category: "Full-Stack Development",
    headline: "End-to-end product delivery",
    icon: <Code2 className="w-7 h-7" />,
    skills: [
      { name: "Python", detail: "AI/ML backends, automation, scripting" },
      { name: "TypeScript / JavaScript", detail: "React, Node.js, Next.js — full-stack" },
      { name: "React / Next.js", detail: "SaaS UIs, SSR, real-time dashboards", hot: true },
      { name: "Node.js / Express", detail: "REST APIs, WebSocket servers, middleware" },
      { name: "SQL", detail: "PostgreSQL, complex queries, migrations" },
      { name: "HTML / CSS / Tailwind", detail: "Responsive UI, design systems" },
    ],
    color: "blue",
    accent: "text-blue-400",
    borderAccent: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    category: "Infrastructure & DevOps",
    headline: "Ship it, scale it, monitor it",
    icon: <Database className="w-7 h-7" />,
    skills: [
      { name: "PostgreSQL / MongoDB", detail: "Relational + document stores at scale" },
      { name: "ChromaDB / Redis", detail: "Vector DB + caching layer" },
      { name: "Docker", detail: "Containerized deployments, compose orchestration" },
      { name: "Azure VM / Cloud", detail: "VM provisioning, Azure OpenAI, Key Vault" },
      { name: "n8n / Automation", detail: "Workflow automation, webhook pipelines" },
      { name: "WebSockets / REST", detail: "Real-time + standard API patterns" },
      { name: "CI/CD", detail: "GitHub Actions, Vercel, automated deploys" },
    ],
    color: "teal",
    accent: "text-teal-400",
    borderAccent: "border-teal-500/30",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    category: "IoT & Embedded Systems",
    headline: "Software meets the physical world",
    icon: <Cpu className="w-7 h-7" />,
    skills: [
      { name: "Custom PCB Design", detail: "Schematic → layout → fabrication", hot: true },
      { name: "Arduino / ESP8266", detail: "C++ firmware, sensor integration, WiFi modules" },
      { name: "Raspberry Pi", detail: "Edge computing, camera systems, GPIO control" },
      { name: "Sensor-to-Cloud", detail: "MQTT pipelines, real-time telemetry" },
      { name: "Hardware Debugging", detail: "Oscilloscope, logic analyzer, signal tracing" },
    ],
    color: "orange",
    accent: "text-orange-400",
    borderAccent: "border-orange-500/30",
    glowColor: "rgba(249, 115, 22, 0.15)",
  },
  {
    category: "Enterprise & Client-Facing",
    headline: "Translate business problems into shipped products",
    icon: <Users className="w-7 h-7" />,
    skills: [
      { name: "Forward-Deployed Engineering", detail: "Embed with clients, ship from day one", hot: true },
      { name: "Microsoft 365 / Graph API", detail: "Enterprise integration, Azure AD, OAuth2" },
      { name: "Stakeholder Management", detail: "Technical strategy, sprint planning, demos" },
      { name: "Rapid Prototyping", detail: "POC → production in days, not months" },
      { name: "Stripe / Payments", detail: "Subscription billing, checkout flows" },
      { name: "Remote Deployment", detail: "Cross-timezone collaboration, async communication" },
    ],
    color: "emerald",
    accent: "text-emerald-400",
    borderAccent: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; pillBg: string; pillBorder: string; hotBg: string; hotBorder: string }> = {
  purple: { bg: "bg-purple-500/5", border: "border-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20", pillBg: "bg-purple-500/8", pillBorder: "border-purple-500/15", hotBg: "bg-purple-500/15", hotBorder: "border-purple-400/40" },
  rose: { bg: "bg-rose-500/5", border: "border-rose-500/10", text: "text-rose-400", glow: "shadow-rose-500/20", pillBg: "bg-rose-500/8", pillBorder: "border-rose-500/15", hotBg: "bg-rose-500/15", hotBorder: "border-rose-400/40" },
  blue: { bg: "bg-blue-500/5", border: "border-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20", pillBg: "bg-blue-500/8", pillBorder: "border-blue-500/15", hotBg: "bg-blue-500/15", hotBorder: "border-blue-400/40" },
  teal: { bg: "bg-teal-500/5", border: "border-teal-500/10", text: "text-teal-400", glow: "shadow-teal-500/20", pillBg: "bg-teal-500/8", pillBorder: "border-teal-500/15", hotBg: "bg-teal-500/15", hotBorder: "border-teal-400/40" },
  orange: { bg: "bg-orange-500/5", border: "border-orange-500/10", text: "text-orange-400", glow: "shadow-orange-500/20", pillBg: "bg-orange-500/8", pillBorder: "border-orange-500/15", hotBg: "bg-orange-500/15", hotBorder: "border-orange-400/40" },
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/10", text: "text-emerald-400", glow: "shadow-emerald-500/20", pillBg: "bg-emerald-500/8", pillBorder: "border-emerald-500/15", hotBg: "bg-emerald-500/15", hotBorder: "border-emerald-400/40" },
};

function SkillCard({ category, idx }: { category: SkillCategory; idx: number }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const colors = colorMap[category.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className={clsx(
        "group relative rounded-2xl border backdrop-blur-sm transition-all duration-500",
        "bg-[#0a0a0a] border-white/[0.06]",
        "hover:border-white/10 hover:shadow-2xl",
      )}
    >
      {/* Top accent line */}
      <div
        className={clsx(
          "absolute top-0 left-6 right-6 h-px transition-opacity duration-500",
          "opacity-0 group-hover:opacity-100",
        )}
        style={{ background: `linear-gradient(90deg, transparent, ${category.glowColor.replace("0.15", "0.6")}, transparent)` }}
      />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-2">
          <div className={clsx("p-2.5 rounded-xl border transition-all duration-300", colors.bg, colors.border, "group-hover:" + colors.glow)}>
            <span className={colors.text}>{category.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
              {category.category}
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-snug">{category.headline}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5 space-y-1.5">
          {category.skills.map((skill, sIdx) => (
            <div key={sIdx}>
              <button
                onClick={() => setExpanded(expanded === sIdx ? null : sIdx)}
                className={clsx(
                  "w-full text-left px-3.5 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 group/skill",
                  expanded === sIdx
                    ? clsx(skill.hot ? colors.hotBg : colors.pillBg, skill.hot ? colors.hotBorder : colors.pillBorder)
                    : clsx("bg-white/[0.02] border-white/[0.04]", "hover:bg-white/[0.04] hover:border-white/[0.08]"),
                )}
              >
                {skill.hot && (
                  <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", colors.text.replace("text-", "bg-"))} />
                )}
                <span className={clsx(
                  "text-sm font-medium flex-1",
                  expanded === sIdx ? "text-white" : "text-gray-300 group-hover/skill:text-white",
                )}>
                  {skill.name}
                </span>
                {skill.detail && (
                  <ChevronRight
                    size={14}
                    className={clsx(
                      "text-gray-600 transition-transform duration-200 flex-shrink-0",
                      expanded === sIdx && "rotate-90 " + colors.text
                    )}
                  />
                )}
              </button>

              <AnimatePresence>
                {expanded === sIdx && skill.detail && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className={clsx("text-xs leading-relaxed px-3.5 py-2 ml-2 border-l-2", colors.text.replace("text-", "border-"), "text-gray-400")}>
                      {skill.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tight text-white leading-tight">
                <span className="text-teal-400 mr-4 font-mono text-3xl md:text-4xl">04.</span>
                Technical Arsenal
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                From transformer fine-tuning to custom PCB design — {totalSkills} production-tested skills across 6 domains. Click any skill to see what Atif actually does with it.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8 flex-shrink-0">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">6</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Domains</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-teal-400">{totalSkills}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">3</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Stacks</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((category, idx) => (
            <SkillCard key={idx} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
