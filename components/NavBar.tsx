"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Strength", href: "#strength" },
  { name: "Achievements", href: "#achievements" },
  { name: "Hybrid Tech", href: "#hybrid" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "projects", "experience", "strength", "achievements", "hybrid", "contact"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="text-2xl font-black tracking-tighter text-white"
        >
          AS<span className="text-teal-400">.</span>
        </a>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={clsx(
                  "font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                  activeSection === link.href.substring(1)
                    ? "text-teal-400 font-bold"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Book Meeting CTA */}
          <a
            href="https://calendar.app.google/VUyweT99vyAhinNV9"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 font-bold text-xs uppercase tracking-widest text-black bg-teal-400 rounded-full hover:bg-teal-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
          >
            <Calendar size={14} />
            <span>Book Meeting</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-2xl absolute top-full left-0 right-0 py-8 flex flex-col items-center space-y-6 shadow-2xl border-t border-white/10"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={clsx(
                "font-mono text-lg uppercase tracking-widest transition-colors",
                activeSection === link.href.substring(1)
                  ? "text-teal-400 font-bold"
                  : "text-gray-300"
              )}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://calendar.app.google/VUyweT99vyAhinNV9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-widest text-black bg-teal-400 rounded-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Calendar size={18} />
            <span>Book Meeting</span>
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
