"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Calendar, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-teal-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-teal-400 mb-4 tracking-wider text-lg"
          >
            Hi, my name is
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-2 text-white"
          >
            Atif Shaikh.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-gradient leading-tight"
          >
            I build AI systems for the enterprise.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed"
          >
            I’m a <span className="text-white font-medium">Forward-Deployed Software Engineer</span> specializing in translating complex business problems into <span className="text-white font-medium">scalable, production-grade AI solutions</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 flex-wrap"
          >
            {/* Highlighted Booking Button */}
            <a
              href="https://calendar.app.google/VUyweT99vyAhinNV9"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-teal-400 rounded-xl overflow-hidden transition-all duration-300 hover:bg-teal-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
            >
              <Calendar size={22} className="mr-2" />
              <span>Book a Meeting</span>
              <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </a>

            <a
              href="mailto:aatif2003@gmail.com"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-white/5 backdrop-blur border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              <Mail size={22} className="mr-2 text-teal-400" />
              <span>Email Me</span>
            </a>

            <a
              href="#projects"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/5 border border-white/5"
            >
              <span className="mr-2">View Projects</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/atif.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-gray-400 hover:text-teal-400 transition-all duration-300"
            >
              <Download size={20} className="mr-2" />
              <span>Resume</span>
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
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-teal-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
