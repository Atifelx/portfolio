"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-[#111]">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-teal-400 mb-4 tracking-wider text-sm">
            07. What's Next?
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Get In Touch
          </h2>
          <div className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 space-y-6 leading-relaxed text-left">
            <p>
              I'm currently exploring new opportunities to design and deploy AI-driven solutions for enterprise clients. If you have a project in mind, a question, or simply want to connect, feel free to reach out.
            </p>
            <p>
              📧 Email: <a href="mailto:aatif2003@gmail.com" className="text-white hover:text-teal-400 transition-colors font-medium">aatif2003@gmail.com</a>
            </p>
            <p>
              I'm comfortable working both <span className="text-white font-medium">independently and in collaborative team environments</span>, and I'm flexible with timelines to accommodate project needs. I actively seek <span className="text-white font-medium">challenging projects that push technical boundaries</span>, with a growing focus on <span className="text-white font-medium">Web3 technologies and AI agent automation for industry-scale applications</span>.
            </p>
            <p>
              If you'd like to evaluate my capabilities before committing, I'm open to <span className="text-white font-medium">test projects with defined timelines</span>. Deliverables speak louder than words—once you see the quality and reliability of my work, we can explore long-term collaboration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:aatif2003@gmail.com"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-white/10 backdrop-blur border border-white/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]"
            >
              <Mail size={24} className="mr-3 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <span>Say Hello</span>
            </a>
            
            <a
              href="tel:+919769550173"
              className="group inline-flex items-center justify-center px-10 py-5 font-bold text-gray-300 rounded-lg transition-all duration-300 hover:text-white hover:bg-white/5"
            >
              <MessageSquare size={24} className="mr-3 text-teal-400" />
              <span>+91 97695 50173</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
