"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, X, Expand } from "lucide-react";

export default function Hybrid() {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  const projects = [
    {
      title: "4G Powered RC Car via Firebase",
      desc: "Built a 4G-powered RC car driven using a 4G network SIM signal controlled by a Google Firebase database using the ESP8266 protocol. Developed custom firmware to read signals and drive the car, utilizing a driver motor with a latency of just 6 milliseconds.",
      images: ["/4g.JPG", "/4g3.JPG"]
    },
    {
      title: "Custom Portable Retro Game Console",
      desc: "Reverse-engineered and built a tiny portable PlayStation console using a Raspberry Pi Zero. Includes a built-in battery and screen capable of playing all classic PS1 titles natively.",
      images: ["/PS1.JPG"]
    },
    {
      title: "Real-Time Wi-Fi Connectivity Monitor",
      desc: "Built a hardware Wi-Fi connectivity monitor that blinks visual alerts when the connection drops and displays real-time network updates on an integrated screen.",
      images: ["/espN.jpg"]
    },
    {
      title: "Custom Firmware & PCB Architecture",
      desc: "Developed multiple embedded firmware architectures operating strictly on Arduino C++ and Core IDE. Experience utilizing PCB designing software to engineer and construct multiple custom PCB solutions from scratch.",
      images: []
    }
  ];

  return (
    <section id="hybrid" className="py-24 relative overflow-hidden bg-[#111]">
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
            <span className="text-teal-400 mr-2">06.</span> The Unfair Advantage
          </h2>
          <div className="text-purple-400 text-xl font-medium mb-8">
            IoT + Machine Learning + Full-Stack — from silicon to AI, one engineer.
          </div>

          <div className="glass-card p-8 md:p-10 border border-white/10 bg-[#0a0a0a]/80 mb-16 relative overflow-hidden group">
            {/* Animated accent gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-teal-500/20 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-purple-500/20 transition-colors duration-700" />

            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 text-sm font-black tracking-wider uppercase rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30">
                &lt; 2% of Engineers
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Most engineers know <span className="text-gray-500">software</span> or <span className="text-gray-500">hardware</span>.<br />
              I ship products across <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">both</span>.
            </h3>

            <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
              I write firmware for microcontrollers <span className="text-teal-400 font-semibold">and</span> build multi-agent LLM systems. I design custom PCBs <span className="text-teal-400 font-semibold">and</span> ship React SaaS platforms with Stripe billing. I solder ESP8266 boards <span className="text-teal-400 font-semibold">and</span> deploy RAG pipelines on Azure. This isn't a side hobby — it's how I think about engineering: from the sensor to the neural network to the user interface, as one connected system.
            </div>
          </div>

          {/* The Stack That Matters */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-teal-400 pl-4">
              Why This Matters to You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                  <span className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold mr-3 border border-purple-500/30">01</span>
                  Zero-to-One Builder
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed pl-11">
                  Give me a problem and no codebase. I'll architect the system, pick the stack, build the MVP, deploy it, and iterate with users — <span className="text-white">without needing a team of 5 to start.</span>
                </p>
              </div>

              <div className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                  <span className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold mr-3 border border-blue-500/30">02</span>
                  Hardware-Grade Debugging
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed pl-11">
                  When you've debugged <span className="text-white">6ms latency on a motor driver with an oscilloscope</span>, debugging a distributed AI pipeline feels routine. Hardware engineers think in systems — that transfers directly.
                </p>
              </div>

              <div className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                  <span className="w-8 h-8 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold mr-3 border border-teal-500/30">03</span>
                  AI Meets the Physical World
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed pl-11">
                  The next wave of AI isn't just chatbots — it's <span className="text-white">AI agents controlling real-world systems</span>. I've already built both sides: the agent logic and the hardware it talks to.
                </p>
              </div>

              <div className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                  <span className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold mr-3 border border-amber-500/30">04</span>
                  Full Vertical Ownership
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed pl-11">
                  From <span className="text-white">custom PCB design → embedded firmware → cloud backend → LLM pipeline → React frontend → Stripe checkout</span> — I've shipped every layer independently.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Hardware Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-8">
            <Cpu className="text-teal-400 mr-3" size={28} />
            <h3 className="text-2xl font-bold text-white tracking-wide">Legacy Hardware Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-bold text-lg pr-4">{project.title}</h4>
                  
                  {project.images.length > 0 && (
                    <button 
                      onClick={() => setSelectedImages(project.images)}
                      className="text-gray-500 hover:text-teal-400 transition-colors flex-shrink-0 bg-white/5 p-2 rounded-md hover:bg-white/10 flex items-center gap-2 text-xs font-mono"
                    >
                      <span>View Gallery</span>
                      <Expand size={14} />
                    </button>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{project.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedImages(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-5xl bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                <h3 className="text-white font-mono text-sm tracking-widest">PROJECT GALLERY</h3>
                <button 
                  onClick={() => setSelectedImages(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div className={`grid gap-4 ${selectedImages.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {selectedImages.map((img, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img 
                        src={img} 
                        alt="Hardware Project Detail" 
                        className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600/111111/4fd1c5?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
