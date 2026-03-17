"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experienceData = [
  {
    title: "Software Engineer",
    company: "Enterprise AI Solutions | LTIMindtree",
    date: "Dec 2024 – Present",
    points: [
      "Work remotely with European enterprise clients deploying AI solutions",
      "Deployed Azure OpenAI + Microsoft Graph API automation; eliminated 60% manual processing for 200+ daily users",
      "Built production RAG chatbot reducing inventory analysis from 2+ hours to under 30 seconds with 85% accuracy",
      "Collaborate with sales on pre-sales technical evaluations"
    ]
  },
  {
    title: "Software Engineer",
    company: "Enterprise M365 | Sherweb",
    date: "Nov 2021 – Nov 2023 | Remote",
    points: [
      "Provided technical support to enterprise customers on M365 platform maintaining 99.5% uptime SLA",
      "SEV-A incident response expert; restored services within 2-hour SLA",
      "Built monitoring tool reducing detection time by 45%"
    ]
  },
  {
    title: "Developer (Freelance)",
    company: "Upwork",
    date: "Dec 2019 – Aug 2020 | $20K+ earned | Remote",
    points: [
      "Delivered M365 support for 15+ enterprise clients",
      "Built e-commerce solutions (React, WordPress/WooCommerce)",
      "Developed SEO-optimized landing pages improving conversion rates",
      "$20K+ earned delivering successful projects"
    ]
  },
  {
    title: "Technical Operations & Client Coordination",
    company: "Etisalat",
    date: "Nov 2013 – Oct 2019 | Dubai, UAE",
    points: [
      "Managed client coordination across 3 engineering teams for telecommunications infrastructure",
      "Coordinated incident response managing triage and escalation workflows",
      "Primary liaison between technical teams and enterprise clients"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[#111]">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-teal-400 mr-2">02.</span> Experience
          </h2>
          <p className="text-gray-400 text-lg">A decade of engineering, client coordination, and delivering impact.</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-16">
          {experienceData.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-teal-400 rounded-full -left-[41px] md:-left-[41px] top-1 shadow-[0_0_10px_rgba(45,212,191,0.6)]" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors inline-flex items-center">
                    {job.title} 
                  </h3>
                  <div className="text-lg text-purple-400 font-medium flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    {job.company}
                  </div>
                </div>
                <div className="flex items-center text-gray-400 mt-2 md:mt-0 font-mono text-sm">
                  <Calendar size={14} className="mr-2" />
                  {job.date}
                </div>
              </div>

              <ul className="space-y-3 text-gray-300">
                {job.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1.5 leading-none">▹</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
