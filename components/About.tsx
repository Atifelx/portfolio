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
    icon: <BrainCircuit className="w-9 h-9 mb-4 text-purple-400" />,
    skills: ["LLMs", "LangGraph", "LangChain", "RAG Architecture", "Vector Databases", "Model Fine-tuning", "Prompt Engineering", "OpenAI / Anthropic / Gemini"],
    color: "from-purple-500/20 to-purple-500/0",
    glowColor: "rgba(168, 85, 247, 0.4)",
    bgHover: "group-hover:bg-purple-500/10",
    borderHover: "group-hover:border-purple-500/30"
  },
  {
    category: "Languages & Frameworks",
    icon: <Code2 className="w-9 h-9 mb-4 text-blue-400" />,
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "React", "Node.js", "Next.js", "Express"],
    color: "from-blue-500/20 to-blue-500/0",
    glowColor: "rgba(59, 130, 246, 0.4)",
    bgHover: "group-hover:bg-blue-500/10",
    borderHover: "group-hover:border-blue-500/30"
  },
  {
    category: "Databases & Infrastructure",
    icon: <Database className="w-9 h-9 mb-4 text-teal-400" />,
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "Redis", "Docker", "WebSockets", "REST APIs", "ETL Pipelines"],
    color: "from-teal-500/20 to-teal-500/0",
    glowColor: "rgba(20, 184, 166, 0.4)",
    bgHover: "group-hover:bg-teal-500/10",
    borderHover: "group-hover:border-teal-500/30"
  },
  {
    category: "Enterprise Integration",
    icon: <Network className="w-9 h-9 mb-4 text-amber-400" />,
    skills: ["Microsoft 365", "Microsoft Graph API", "Azure AD", "OAuth2", "JWT", "PowerShell", "WordPress API", "Stripe"],
    color: "from-amber-500/20 to-amber-500/0",
    glowColor: "rgba(245, 158, 11, 0.4)",
    bgHover: "group-hover:bg-amber-500/10",
    borderHover: "group-hover:border-amber-500/30"
  },
  {
    category: "Forward-Deployed Engineering",
    icon: <Users className="w-9 h-9 mb-4 text-emerald-400" />,
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
    glowColor: "rgba(16, 185, 129, 0.4)",
    bgHover: "group-hover:bg-emerald-500/10",
    borderHover: "group-hover:border-emerald-500/30"
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

  const cardVariants = {
    initial: {},
    hover: {
      y: -5,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const skillVariants = (glowColor: string): any => ({
    initial: { boxShadow: "0 0 0px rgba(0,0,0,0)", scale: 1 },
    hover: {
      boxShadow: [
        `0 0 0px ${glowColor}`, 
        `0 0 30px ${glowColor}`, 
        `0 0 0px ${glowColor}`
      ],
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">
            <span className="text-teal-400 mr-4 font-mono text-3xl md:text-4xl">01.</span> Technical Arsenal
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl max-w-4xl leading-relaxed mx-auto md:mx-0">
            Bridging the gap between cutting-edge AI technology and enterprise requirements with a comprehensive engineering stack.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="group relative p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer"
            >
              {/* Background Glow */}
              <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", category.color)} />
              
              <div className="relative z-10">
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                  {category.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-8 tracking-tight transition-colors group-hover:text-white leading-tight">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx} 
                      variants={skillVariants(category.glowColor)}
                      className={clsx(
                        "text-sm font-semibold px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-gray-300 transition-all duration-300",
                        category.bgHover,
                        category.borderHover,
                        "hover:text-white"
                      )}
                    >
                      {skill}
                    </motion.span>
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
