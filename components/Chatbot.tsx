"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What are Atif's key projects?",
  "What skills does Atif have?",
  "How can I book a meeting?",
  "What's his salary expectation?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setShowPulse(true);
        setTimeout(() => {
          setIsOpen(true);
          setHasAutoOpened(true);
          setShowPulse(false);
          setMessages([
            {
              role: "assistant",
              content:
                "Hey! I'm Atif Agent 👋 I know everything about Atif's projects, skills, and experience. What would you like to know — his tech stack, live projects, or want to set up a call?",
            },
          ]);
        }, 3000);
      }
    }, 120000);

    const pulseTimer = setTimeout(() => {
      if (!hasAutoOpened) setShowPulse(true);
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, [hasAutoOpened]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowPulse(false);
    if (!hasAutoOpened) {
      setHasAutoOpened(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Hey! I'm Atif Agent 👋 I know everything about Atif's projects, skills, and experience. What would you like to know — his tech stack, live projects, or want to set up a call?",
        },
      ]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops, couldn't connect. Try again or email Atif directly at aatif2003@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content.replace(
      /(https:\/\/[^\s)]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-teal-400 underline hover:text-teal-300">$1</a>'
    );
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-teal-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:bg-teal-400 hover:scale-110 transition-all duration-300"
          >
            {showPulse && (
              <>
                <span className="absolute w-full h-full rounded-full bg-teal-400 animate-ping opacity-40" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black text-[9px] font-bold text-white flex items-center justify-center">
                  1
                </span>
              </>
            )}
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-48px)] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a0a0a] to-[#111] px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Bot size={20} className="text-teal-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Atif Agent</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-teal-500/20 text-teal-50 border border-teal-500/20 rounded-br-md"
                        : "bg-white/5 text-gray-200 border border-white/5 rounded-bl-md"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                    <Loader2 size={16} className="animate-spin text-teal-400" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (show only at start) */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 pb-2 bg-[#0a0a0a] flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/20 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-[#111] border-t border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage(input);
                  }}
                  placeholder="Ask about Atif's work..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/40 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-teal-500 text-black flex items-center justify-center hover:bg-teal-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="https://calendar.app.google/VUyweT99vyAhinNV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-400 transition-colors"
                >
                  <Calendar size={12} />
                  <span>Or book a meeting directly</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
