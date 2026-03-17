"use client";

import { motion } from "framer-motion";
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
    skills: ["RAG Architecture", "Vector Databases (ChromaDB)", "LLM Orchestration", "Prompt Engineering", "NLP", "OpenAI API", "Anthropic Claude", "Azure OpenAI", "Google Gemini", "LangChain"]
  },
  {
    category: "Languages & Frameworks",
    icon: <Code2 className="w-8 h-8 mb-4 text-blue-400" />,
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "React", "Node.js", "Next.js", "Express"]
  },
  {
    category: "Databases & Infrastructure",
    icon: <Database className="w-8 h-8 mb-4 text-teal-400" />,
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "Redis", "Docker", "WebSockets", "REST APIs", "ETL Pipelines"]
  },
  {
    category: "Enterprise Integration",
    icon: <Network className="w-8 h-8 mb-4 text-amber-400" />,
    skills: ["Microsoft 365", "Microsoft Graph API", "Azure AD", "OAuth2", "JWT", "PowerShell", "WordPress API", "Stripe"]
  },
  {
    category: "Customer Engineering",
    icon: <Users className="w-8 h-8 mb-4 text-emerald-400" />,
    skills: ["Remote deployment", "Client negotiations", "Pre-sales POCs", "SEV-A incident response", "Stakeholder management", "Live customer support"]
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
              whileHover={{ y: -5 }}
              className="glass-card p-8 group transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              {category.icon}
              <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="text-sm font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
