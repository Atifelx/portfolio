"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Strength() {
  return (
    <section id="strength" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 font-mono">
            <span className="text-teal-400 mr-2">04.</span> Core Strength
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="mb-4">
                <span className="px-3 py-1.5 text-xs font-black tracking-widest uppercase rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-400 border border-teal-500/30">
                  Forward Deployed Engineer
                </span>
              </div>
              <p className="text-white text-xl md:text-2xl font-bold leading-snug">
                I don't just write code — I ship entire products solo: from <span className="text-teal-400">RAG pipelines</span> and <span className="text-teal-400">multi-agent AI</span> to <span className="text-teal-400">custom hardware</span>, deployed and revenue-ready.
              </p>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Proof: <span className="text-white font-semibold">CryptoClever</span> (6-month live trading agents), <span className="text-white font-semibold">WriteBookAI</span> (AI book platform with paying users), <span className="text-white font-semibold">Clever RAG</span> (agentic chatbot with Pinecone + Tavily), and <span className="text-white font-semibold">4G RC car with 6ms latency firmware</span> — all built and shipped independently.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Industry leaders vouch for it — here's what{" "}
                <a
                  href="https://www.linkedin.com/in/chiranjiv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline text-teal-400 hover:text-teal-300 transition-colors font-medium border-b border-teal-400/30 hover:border-teal-400 pb-0.5"
                >
                  Dr. Chiranjiv Roy (OnCon Global Top 50, ex-Nissan/Mercedes)
                  <ExternalLink size={14} className="ml-1 relative top-[2px]" />
                </a>{" "}and my direct manager at Etisalat had to say:
              </p>
            </div>
            
            <div className="relative group rounded-xl overflow-hidden glass-card p-2 md:p-4 border border-white/10">
              <div className="relative w-full aspect-auto rounded-lg overflow-hidden bg-white/5 border border-white/5">
                <img 
                  src="/ch1.png" 
                  alt="LinkedIn Recommendations from Dr. Chiranjiv Roy and Bilal Hameed"
                  className="w-full h-auto object-cover opacity-80 filter grayscale-[20%] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600/111111/4fd1c5?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
