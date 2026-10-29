"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Calendar,
  Loader2,
  Bot,
  Mail,
  FileText,
  ChevronRight,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  { label: "Key Projects", text: "What are Atif's most impressive projects?" },
  { label: "Tech Stack", text: "What technical skills does Atif have?" },
  { label: "Availability", text: "Is Atif open to remote work or relocation?" },
  { label: "Paste a JD", text: "" },
];

function renderMarkdown(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`(.+?)`/g, '<code class="bg-surface px-1.5 py-0.5 rounded text-ink text-xs">$1</code>');

  html = html.replace(
    /(https?:\/\/[^\s<)]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cobalt underline hover:text-cobalt-deep break-all">$1</a>'
  );

  const lines = html.split("\n");
  let result = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)/);

    if (bulletMatch) {
      if (!inList) {
        result += '<ul class="space-y-1 my-2">';
        inList = true;
      }
      result += `<li class="flex items-start gap-2"><span class="text-ink-3 mt-0.5 flex-shrink-0">•</span><span>${bulletMatch[1]}</span></li>`;
    } else {
      if (inList) {
        result += "</ul>";
        inList = false;
      }
      if (trimmed === "") {
        result += "<br/>";
      } else if (trimmed.startsWith("###")) {
        result += `<p class="font-bold text-ink mt-3 mb-1 text-sm">${trimmed.replace(/^###\s*/, "")}</p>`;
      } else if (trimmed.startsWith("##")) {
        result += `<p class="font-bold text-ink mt-3 mb-1">${trimmed.replace(/^##\s*/, "")}</p>`;
      } else {
        result += `<p class="mb-1">${trimmed}</p>`;
      }
    }
  }
  if (inList) result += "</ul>";

  return result;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({
    recruiterName: "",
    company: "",
    role: "",
    email: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const welcomeMessage: Message = useMemo(() => ({
    role: "assistant",
    content:
      "Hey! I'm **Atif Agent** 👋\n\nI can help you evaluate Atif for your role. Here's what I can do:\n\n- Walk you through his **projects & technical depth**\n- Match his skills against your **Job Description**\n- Answer questions about his **availability**\n- Help you **send interest directly** to Atif\n\nWhat would you like to know?",
  }), []);

  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      if (!hasAutoOpened) setShowPulse(true);
    }, 4 * 60_000);

    const autoOpenTimer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
        setShowPulse(false);
        setMessages([welcomeMessage]);
      }
    }, 5 * 60_000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(autoOpenTimer);
    };
  }, [hasAutoOpened, welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showEmailForm]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowPulse(false);
    if (!hasAutoOpened) {
      setHasAutoOpened(true);
      setMessages([welcomeMessage]);
    }
  };

  const executeTools = (reply: string) => {
    // Parse and execute tool tags from AI response
    const toolPattern = /\[TOOL:([\w_]+)(?::(.+?))?\]/g;
    let match;

    while ((match = toolPattern.exec(reply)) !== null) {
      const action = match[1];
      const dataStr = match[2];

      switch (action) {
        case "OPEN_EMAIL_FORM":
          setTimeout(() => setShowEmailForm(true), 500);
          break;

        case "SEND_EMAIL":
          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);
              const formData = {
                recruiterName: data.name || "",
                company: data.company || "",
                role: data.role || "",
                email: data.email || "",
                message: data.message || "",
              };
              setEmailForm(formData);
              if (formData.recruiterName && formData.company && formData.role) {
                // Auto-send if we have all required fields
                setTimeout(() => autoSendEmail(formData), 800);
              } else {
                // Pre-fill and open form for user to complete
                setTimeout(() => setShowEmailForm(true), 500);
              }
            } catch {
              setTimeout(() => setShowEmailForm(true), 500);
            }
          }
          break;

        case "OPEN_JD_INPUT":
          setTimeout(() => {
            setInput("Here's my JD, can you evaluate if Atif is a good fit?\n\n");
            inputRef.current?.focus();
          }, 500);
          break;

        case "BOOK_CALL":
          setTimeout(() => {
            window.open(
              "https://calendar.app.google/VUyweT99vyAhinNV9",
              "_blank"
            );
          }, 500);
          break;
      }
    }

    // Return reply with tool tags stripped
    return reply.replace(/\[TOOL:[\w_]+(?::.+?)?\]/g, "").trim();
  };

  const autoSendEmail = async (formData: typeof emailForm) => {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "05a93e30-e1cc-4b24-8907-85cf152f62cc",
          subject: `Recruiter Interest: ${formData.recruiterName} at ${formData.company} — ${formData.role}`,
          from_name: "Atif Agent (Portfolio Chatbot)",
          name: formData.recruiterName,
          company: formData.company,
          role: formData.role,
          email: formData.email || "Not provided",
          message: formData.message || "No additional message",
          botcheck: false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
        setShowEmailForm(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `✅ **Email sent to Atif!** He'll receive your interest for the **${formData.role}** role at **${formData.company}** shortly.\n\nAtif typically responds within 24 hours. You can also book a call: https://calendar.app.google/VUyweT99vyAhinNV9`,
          },
        ]);
      } else {
        throw new Error("Send failed");
      }
    } catch {
      setShowEmailForm(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've pre-filled the form with your details — please review and hit **Send to Atif**.",
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
          messages: newMessages
            .filter((m) => m !== welcomeMessage || newMessages.indexOf(m) === 0)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const rawReply = data.reply || data.error || "Sorry, something went wrong.";

      // Parse tool calls and strip tags from display text
      const cleanReply = executeTools(rawReply);

      setMessages((prev) => [...prev, { role: "assistant", content: cleanReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Couldn't connect right now. You can reach Atif directly at **aatif2003@gmail.com**",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    const { recruiterName, company, role, email, message } = emailForm;
    if (!recruiterName || !company || !role) return;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "05a93e30-e1cc-4b24-8907-85cf152f62cc",
          subject: `Recruiter Interest: ${recruiterName} at ${company} — ${role}`,
          from_name: "Atif Agent (Portfolio Chatbot)",
          name: recruiterName,
          company,
          role,
          email: email || "Not provided",
          message: message || "No additional message",
          botcheck: false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
        setShowEmailForm(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `✅ **Email sent to Atif!** He'll receive your interest for the **${role}** role at **${company}** shortly.\n\nAtif typically responds within 24 hours. You can also book a call: https://calendar.app.google/VUyweT99vyAhinNV9`,
          },
        ]);
      } else {
        throw new Error("Send failed");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Couldn't send the email right now. You can reach Atif directly at **aatif2003@gmail.com**",
        },
      ]);
      setShowEmailForm(false);
    }
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
            aria-label="Ask Atif Agent about Atif's work"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cobalt text-white flex items-center justify-center shadow-lg hover:bg-cobalt-deep transition-colors"
          >
            {showPulse && (
              <>
                <span className="absolute w-full h-full rounded-full bg-cobalt animate-ping opacity-30" />
                <span aria-hidden className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-paper text-[9px] font-bold text-white flex items-center justify-center">
                  1
                </span>
              </>
            )}
            <Bot size={26} />
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
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-48px)] flex flex-col rounded-2xl overflow-hidden border border-rule bg-paper shadow-2xl"
          >
            {/* Header */}
            <div className="bg-paper px-5 py-4 flex items-center justify-between border-b border-rule flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cobalt/10 flex items-center justify-center">
                  <Bot size={20} className="text-cobalt" />
                </div>
                <div>
                  <div className="text-ink font-bold text-sm">Atif Agent</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-outcome rounded-full" />
                    <span className="text-ink-3 text-xs">
                      AI-powered career assistant
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-ink-3 hover:text-ink transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cobalt text-white rounded-br-md [&_a]:text-white"
                        : "bg-paper text-ink-2 border border-rule rounded-bl-md [&_strong]:text-ink"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(msg.content),
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
                  <div className="bg-paper border border-rule px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2
                      size={14}
                      className="animate-spin text-cobalt"
                    />
                    <span className="text-ink-3 text-xs">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Email Form */}
              <AnimatePresence>
                {showEmailForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-paper border border-rule rounded-2xl p-4 space-y-3"
                  >
                    <p className="text-ink font-bold text-sm flex items-center gap-2">
                      <Mail size={14} />
                      Send Interest to Atif
                    </p>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={emailForm.recruiterName}
                      onChange={(e) =>
                        setEmailForm((p) => ({
                          ...p,
                          recruiterName: e.target.value,
                        }))
                      }
                      className="w-full bg-paper border border-rule rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt"
                    />
                    <input
                      type="text"
                      placeholder="Company *"
                      value={emailForm.company}
                      onChange={(e) =>
                        setEmailForm((p) => ({
                          ...p,
                          company: e.target.value,
                        }))
                      }
                      className="w-full bg-paper border border-rule rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt"
                    />
                    <input
                      type="text"
                      placeholder="Role You're Hiring For *"
                      value={emailForm.role}
                      onChange={(e) =>
                        setEmailForm((p) => ({ ...p, role: e.target.value }))
                      }
                      className="w-full bg-paper border border-rule rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt"
                    />
                    <input
                      type="email"
                      placeholder="Your Email (optional)"
                      value={emailForm.email}
                      onChange={(e) =>
                        setEmailForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full bg-paper border border-rule rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt"
                    />
                    <textarea
                      ref={textareaRef}
                      placeholder="Quick message (optional)"
                      value={emailForm.message}
                      onChange={(e) =>
                        setEmailForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      rows={2}
                      className="w-full bg-paper border border-rule rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSendEmail}
                        disabled={
                          !emailForm.recruiterName ||
                          !emailForm.company ||
                          !emailForm.role
                        }
                        className="flex-1 bg-cobalt text-white font-bold text-sm py-2.5 rounded-lg hover:bg-cobalt-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Send size={14} />
                        Send to Atif
                      </button>
                      <button
                        onClick={() => setShowEmailForm(false)}
                        className="px-4 py-2.5 bg-surface text-ink-2 text-sm rounded-lg hover:bg-rule transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (show at start) */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 pb-2 bg-surface flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_QUESTIONS.map((q, idx) =>
                  q.text ? (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q.text)}
                      className="text-xs px-3 py-1.5 rounded-full bg-paper text-ink-2 border border-rule hover:text-cobalt hover:border-cobalt transition-colors flex items-center gap-1"
                    >
                      <ChevronRight size={10} />
                      {q.label}
                    </button>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(
                          "Here's my JD, can you evaluate if Atif is a good fit?\n\n"
                        );
                        inputRef.current?.focus();
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-cobalt/10 text-cobalt border border-cobalt/20 hover:bg-cobalt/15 transition-colors flex items-center gap-1"
                    >
                      <FileText size={10} />
                      {q.label}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Input + Action Buttons */}
            <div className="bg-paper border-t border-rule p-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) sendMessage(input);
                  }}
                  placeholder="Ask about Atif's work..."
                  aria-label="Message Atif Agent"
                  className="min-w-0 flex-1 bg-surface border border-rule rounded-xl px-4 py-2.5 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-cobalt transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-xl bg-cobalt text-white flex items-center justify-center hover:bg-cobalt-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-center gap-4">
                {!emailSent && (
                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-cobalt transition-colors"
                  >
                    <Mail size={12} />
                    <span>Send Interest</span>
                  </button>
                )}
                <a
                  href="https://calendar.app.google/VUyweT99vyAhinNV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-cobalt transition-colors"
                >
                  <Calendar size={12} />
                  <span>Book a Call</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
