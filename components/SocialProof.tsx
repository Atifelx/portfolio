"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Globe,
  Star,
  Award,
  Clock,
  Zap,
} from "lucide-react";

const stats = [
  {
    number: "175+",
    label: "Authors on WriteBookAI",
    detail: "Live SaaS — organic traffic, listed in Google & AI search engines",
    icon: <Users size={20} />,
    color: "text-teal-400",
    borderColor: "border-teal-500/20",
    bgColor: "bg-teal-500/5",
  },
  {
    number: "24/7",
    label: "CryptoClever Agents Trading",
    detail: "4 autonomous LangGraph agents running live on Azure VM",
    icon: <Zap size={20} />,
    color: "text-purple-400",
    borderColor: "border-purple-500/20",
    bgColor: "bg-purple-500/5",
  },
  {
    number: "$20K+",
    label: "Earned on Upwork",
    detail: "15+ enterprise clients, 2,400+ hours, 85% Job Success",
    icon: <TrendingUp size={20} />,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
  },
  {
    number: "200+",
    label: "Enterprise Users Served",
    detail: "Azure OpenAI deployment at LTIMindtree — 60% manual work eliminated",
    icon: <Globe size={20} />,
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/5",
  },
  {
    number: "60%",
    label: "Signal Accuracy",
    detail: "CryptoClever multi-agent system — live-tested over 6 months",
    icon: <TrendingUp size={20} />,
    color: "text-amber-400",
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
  },
  {
    number: "-45%",
    label: "Incident Detection Time",
    detail: "Built monitoring tools at Sherweb — SEV-A incident response",
    icon: <Clock size={20} />,
    color: "text-rose-400",
    borderColor: "border-rose-500/20",
    bgColor: "bg-rose-500/5",
  },
];

const recognitions = [
  {
    title: "Etisalat Excellence Award",
    year: "2019",
    desc: "Monthly Excellence Award for outstanding customer-centric performance during 6-year tenure in Dubai",
    image: "/award.jpg",
  },
  {
    title: "Top Rated Upwork Developer",
    year: "2020",
    desc: "85% Job Success score — delivered enterprise Microsoft 365 solutions for global clients",
    image: "/upwork.png",
  },
];

export default function SocialProof() {
  return (
    <section id="proof" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tight text-white leading-tight">
            <span className="text-teal-400 mr-4 font-mono text-3xl md:text-4xl">
              05.
            </span>
            Results, Not Resumes
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            Numbers from live products and real clients — not course
            certificates.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group relative p-6 md:p-7 rounded-2xl border bg-[#0a0a0a] ${stat.borderColor} hover:border-white/15 transition-all duration-300`}
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bgColor} ${stat.color} mb-4`}
              >
                {stat.icon}
              </div>
              <div
                className={`text-3xl md:text-4xl font-black ${stat.color} mb-1 tracking-tight`}
              >
                {stat.number}
              </div>
              <div className="text-white font-bold text-sm mb-2">
                {stat.label}
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recognitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Award size={20} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Recognition</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recognitions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group flex gap-5 p-6 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] hover:border-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={14} className="text-amber-400 flex-shrink-0" />
                    <h4 className="text-white font-bold text-sm truncate">
                      {item.title}
                    </h4>
                    <span className="text-gray-600 text-xs flex-shrink-0">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
