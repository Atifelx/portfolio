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
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                My greatest strength lies in <span className="text-white font-semibold">end-to-end solution architecture</span>. Given any complex requirement, I can design, build, and deploy production-ready applications utilizing industry best practices.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                My independent work spans building conversational AI for the fashion industry to developing scalable MVPs that have helped startups successfully secure funding. 
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                I've also had the privilege of collaborating directly with industry leaders such as{" "}
                <a 
                  href="https://www.linkedin.com/in/chiranjiv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline text-teal-400 hover:text-teal-300 transition-colors font-medium border-b border-teal-400/30 hover:border-teal-400 pb-0.5"
                >
                  Dr. Chiranjiv Roy 
                  <ExternalLink size={14} className="ml-1 relative top-[2px]" />
                </a>.
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
