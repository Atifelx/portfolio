"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Video, ExternalLink } from "lucide-react";

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
          <div className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-16 space-y-6 leading-relaxed text-left">
            <p>
              I'm currently exploring new opportunities to design and deploy AI-driven solutions for enterprise clients. If you have a project in mind, a question, or simply want to connect, feel free to reach out.
            </p>
            <p>
              📧 Email: <a href="mailto:aatif2003@gmail.com" className="text-white hover:text-teal-400 transition-colors font-medium">aatif2003@gmail.com</a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Email Option */}
            <div className="flex flex-col gap-3 group">
              <a
                href="mailto:aatif2003@gmail.com"
                className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-teal-400/50 hover:-translate-y-1"
              >
                <Mail size={32} className="text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-white font-bold mb-1">Email Me</span>
                <span className="text-gray-500 text-xs font-mono">App Client</span>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aatif2003@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-500 hover:text-teal-400 transition-colors font-mono flex items-center justify-center gap-1 uppercase tracking-widest"
              >
                Open in Gmail <ExternalLink size={10} />
              </a>
            </div>

            {/* Booking Option */}
            <a
              href="mailto:aatif2003@gmail.com?subject=Google%20Meet%20Discovery%20Call%20Request&body=Hi%20Atif,%0A%0AI'd%20like%20to%20schedule%20a%20Google%20Meet%20call%20to%20discuss%20a%20potential%20project.%20Please%20let%20me%20know%20your%20availability.%0A%0ABest%20regards,"
              className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50 hover:-translate-y-1 group"
            >
              <Video size={32} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-white font-bold mb-1">Book a Meet</span>
              <span className="text-gray-500 text-xs font-mono text-center">Via Email (No Signup)</span>
            </a>

            {/* Quick Chat Option */}
            <a
              href="tel:+919769550173"
              className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-blue-400/50 hover:-translate-y-1 group"
            >
              <MessageSquare size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-white font-bold mb-1">Quick Chat</span>
              <span className="text-gray-500 text-xs font-mono">+91 97695 50173</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
