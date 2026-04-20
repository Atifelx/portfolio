"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { 
  BrainCircuit, 
  Code2, 
  Database, 
  Network, 
  Users 
} from "lucide-react";

export const skillsData = [
  {
    category: "AI/ML Production",
    icon: <BrainCircuit className="w-8 h-8 mb-4 text-purple-400" />,
    skills: ["LLMs", "LangGraph", "LangChain", "RAG Architecture", "Vector Databases", "Model Fine-tuning", "Prompt Engineering", "OpenAI / Anthropic / Gemini"],
    color: "from-purple-500/20 to-purple-500/0",
    border: "group-hover:border-purple-500/50"
  },
  {
    category: "Languages & Frameworks",
    icon: <Code2 className="w-8 h-8 mb-4 text-blue-400" />,
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "React", "Node.js", "Next.js", "Express"],
    color: "from-blue-500/20 to-blue-500/0",
    border: "group-hover:border-blue-500/50"
  },
  {
    category: "Databases & Infrastructure",
    icon: <Database className="w-8 h-8 mb-4 text-teal-400" />,
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "Redis", "Docker", "WebSockets", "REST APIs", "ETL Pipelines"],
    color: "from-teal-500/20 to-teal-500/0",
    border: "group-hover:border-teal-500/50"
  },
  {
    category: "Enterprise Integration",
    icon: <Network className="w-8 h-8 mb-4 text-amber-400" />,
    skills: ["Microsoft 365", "Microsoft Graph API", "Azure AD", "OAuth2", "JWT", "PowerShell", "WordPress API", "Stripe"],
    color: "from-amber-500/20 to-amber-500/0",
    border: "group-hover:border-amber-500/50"
  },
  {
    category: "Forward-Deployed Engineering",
    icon: <Users className="w-8 h-8 mb-4 text-emerald-400" />,
    skills: [
      "Translating Ambiguous Problems",
      "Rapid Prototyping (POCs)",
      "Client-Side Embedding",
      "Production Debugging",
      "Stakeholder Management",
      "Technical Strategy",
      "Remote Deployment"
    ],
    color: "from-emerald-500/20 to-emerald-500/0",
    border: "group-hover:border-emerald-500/50"
  }
];

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
            <span className="text-teal-400 mr-2">01.</span> About & Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Bridging the gap between cutting-edge AI technology and enterprise requirements. Here is my technical arsenal.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={item}
              whileHover={{ y: -8 }}
              className={clsx(
                "group relative p-8 rounded-2xl bg-[#111] border border-white/5 transition-all duration-500 hover:shadow-2xl overflow-hidden",
                category.border
              )}
            >
              {/* Background Glow */}
              <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", category.color)} />
              
              <div className="relative z-10">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-6 tracking-wide group-hover:text-teal-400 transition-colors">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[11px] uppercase tracking-wider font-mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
