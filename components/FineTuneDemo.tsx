"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrainCircuit, FileText } from "lucide-react";
import clsx from "clsx";

const CYCLE_MS = 2600;

const examples = [
  { ticket: "Outlook down across 3 sites, no workaround", severity: "P1", label: "Critical", color: "bg-red-500/15 text-red-300 border-red-500/30" },
  { ticket: "SharePoint access denied for the HR team", severity: "P2", label: "High", color: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  { ticket: "One finance laptop can't connect to VPN", severity: "P3", label: "Medium", color: "bg-yellow-500/15 text-yellow-200 border-yellow-500/30" },
  { ticket: "User asks how to change a Teams setting", severity: "P4", label: "Low", color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
];

function Flow({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative hidden sm:block w-10 h-px bg-white/10 flex-shrink-0 overflow-visible">
      {!reduceMotion && (
        <motion.span
          className="absolute -top-[3px] w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_2px_rgba(45,212,191,0.6)]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

export default function FineTuneDemo() {
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setI((n) => (n + 1) % examples.length), CYCLE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const ex = examples[i];

  return (
    <div className="relative mb-8 rounded-2xl p-px overflow-hidden max-w-xl bg-gradient-to-br from-teal-400/70 via-purple-500/50 to-transparent sm:bg-none">
      {/* Rotating gradient border (static gradient on mobile to save GPU) */}
      <motion.div
        aria-hidden
        className="hidden sm:block absolute inset-[-150%]"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, #2dd4bf 70deg, #a855f7 140deg, transparent 200deg)" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative rounded-[15px] bg-[#0b0b0b] p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Fine-tuned model · live inference
          </span>
          <span className="text-xs font-mono text-gray-500">7% → 100% · synthetic test</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Input ticket */}
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 overflow-hidden">
            <FileText size={14} className="text-gray-500 flex-shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={ex.ticket}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-300 truncate"
              >
                {ex.ticket}
              </motion.span>
            </AnimatePresence>
          </div>

          <Flow />

          {/* Model */}
          <motion.div
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-br from-teal-500/15 to-purple-500/15 border border-teal-400/30 flex-shrink-0"
            animate={reduceMotion ? undefined : { boxShadow: ["0 0 0px rgba(45,212,191,0)", "0 0 24px rgba(45,212,191,0.35)", "0 0 0px rgba(45,212,191,0)"] }}
            transition={{ duration: CYCLE_MS / 1000, repeat: Infinity, ease: "easeInOut" }}
          >
            <BrainCircuit size={16} className="text-teal-300" />
            <div className="leading-tight">
              <div className="text-xs font-bold text-white">Gemma 3 270M</div>
              <div className="text-[10px] font-mono text-purple-300">+ LoRA adapter</div>
            </div>
          </motion.div>

          <Flow delay={0.6} />

          {/* Output */}
          <div className="flex-shrink-0 font-mono text-xs">
            <AnimatePresence mode="wait">
              <motion.span
                key={ex.severity}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.5 }}
                className={clsx("inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border font-bold", ex.color)}
              >
                {`{"severity":"${ex.severity}"}`}
                <span className="font-sans font-semibold opacity-80">{ex.label}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
