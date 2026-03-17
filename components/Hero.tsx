"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-teal-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-teal-400 mb-4 tracking-wider"
          >
            Hi, my name is
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 text-white"
          >
            Atif Shaikh.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gradient"
          >
            I build AI for the enterprise.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            I'm a <span className="text-white font-medium">Forward Deployed Engineer</span> based in Mumbai. With 10 years of experience spanning software development and client coordination, I specialize in deploying intelligent, scalable AI solutions remotely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-white/10 backdrop-blur border border-white/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            >
              <span className="mr-2">View Projects</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:aatif2003@gmail.com"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 rounded-lg transition-all duration-300 hover:text-white hover:bg-white/5"
            >
              <span className="mr-2">Contact Me</span>
            </a>
            <a
              href="/atf.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-teal-400 border border-teal-400/30 rounded-lg transition-all duration-300 hover:bg-teal-400/10 hover:border-teal-400"
            >
              <Download size={20} className="mr-2" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-gray-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
