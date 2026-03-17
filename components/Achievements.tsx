"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Medal, Image as ImageIcon } from "lucide-react";

const certifications = [
  "ITIL® Foundation Certificate in IT Service Management - 2015",
  "Embedded Systems Certified Engineer — Prolific Pvt. Ltd. (Mumbai) - 2010",
  "Microsoft 365 Fundamentals - MD-101 (Mar 2023)",
  "Microsoft 365 Fundamentals - MS-900 (Feb 2023)"
];

const achievements = [
  {
    title: "Etisalat's \"Ambitious Monthly Excellence Award\" (Jan 2019)",
    desc: "Received for outstanding customer-centric performance, overachievement, and going the extra mile in service delivery.",
    image: "/award.jpg"
  },
  {
    title: "Top Rated Upwork Developer",
    desc: "Delivered 8 projects, 2,400+ hours logged, and $20K+ earned with an 85% Job Success score supporting global clients with Microsoft 365.",
    image: "/upwork.png"
  }
];

export default function Achievements() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden text-center md:text-left">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono text-left">
            <span className="text-teal-400 mr-2">05.</span> Achievements & Certifications
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl text-left">
            Recognitions for delivering excellence and maintaining top-tier technical proficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          
          {/* Certifications Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <Award className="text-teal-400 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-white tracking-wide">Certifications</h3>
            </div>
            
            <ul className="space-y-4 relative border-l border-white/10 ml-3 pl-6">
              {certifications.map((cert, idx) => (
                <li key={idx} className="relative">
                  <div className="absolute w-2 h-2 bg-teal-400/50 rounded-full -left-[29px] top-2 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{cert}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center mb-6">
              <Medal className="text-purple-400 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-white tracking-wide">Awards & Milestones</h3>
            </div>
            
            <div className="space-y-6">
              {achievements.map((item, idx) => {
                const isHovered = hoveredImage === item.image;
                
                return (
                  <div 
                    key={idx} 
                    className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-crosshair group relative overflow-hidden"
                    onMouseEnter={() => setHoveredImage(item.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <h4 className="text-white font-bold text-lg pr-4">{item.title}</h4>
                      <ImageIcon className="text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" size={20} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                    
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full rounded-lg overflow-hidden border border-white/10 relative z-0"
                        >
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
