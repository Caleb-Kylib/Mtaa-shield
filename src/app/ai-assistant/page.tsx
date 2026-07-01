"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Globe, Sparkles, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "@/types";
import { USSD_CODE } from "@/constants";

const SUGGESTED_PROMPTS = [
  "I am a boda boda rider in Nairobi",
  "Mimi ni mkulima wa mahindi Nakuru",
  "I sell vegetables in the market",
  "I do construction work",
  "I am a freelance designer",
  "Ninahitaji bima ya biashara",
];

const LANGUAGES = ["English", "Swahili", "Sheng"];

const MOCK_RESPONSES: Record<string, string> = {
  boda: "Rider Plus inakulinda kwa ajali, wizi, na third-party liability. Inaanza KES 250/wiki tu. Shall we proceed to payment via M-Pesa?",
  farmer: "For farmers, I recommend Farm Plus at KES 150/week. It covers crop failure, livestock accidents, and equipment damage. Would you like to compare it with Essential Farm Cover?",
  market: "For market traders, Biashara Plus at KES 200/week covers fire, theft, stock spoilage and business interruption. Want me to break down what's covered?",
  construction: "Fundi Plus at KES 220/week is perfect — it covers on-site injuries, disability, and tool theft up to KES 80,000. Shall I walk you through the claim process?",
  gig: "Gig Plus at KES 180/week covers your devices, equipment theft, and income protection. As a freelancer, this gives you a safety net. Interested?",
  business: "Business Plus at KES 300/week gives you comprehensive business protection — fire, equipment, stock, and interruption cover. Want to see a full breakdown?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("boda") || lower.includes("nduthi") || lower.includes("rider"))
    return MOCK_RESPONSES.boda;
  if (lower.includes("farmer") || lower.includes("mkulima") || lower.includes("mahindi") || lower.includes("shamba"))
    return MOCK_RESPONSES.farmer;
  if (lower.includes("market") || lower.includes("trader") || lower.includes("mboga") || lower.includes("biashara ya mtaani"))
    return MOCK_RESPONSES.market;
  if (lower.includes("construction") || lower.includes("fundi") || lower.includes("build"))
    return MOCK_RESPONSES.construction;
  if (lower.includes("gig") || lower.includes("freelance") || lower.includes("designer") || lower.includes("online"))
    return MOCK_RESPONSES.gig;
  if (lower.includes("business") || lower.includes("biashara") || lower.includes("shop"))
    return MOCK_RESPONSES.business;
  if (lower.includes("swahili") || lower.includes("kiswahili"))
    return "Sawa! Naweza kukusaidia kwa Kiswahili. Wewe hufanya kazi gani? Mwambie niipendekeze bima inayofaa.";
  return "Asante! Based on what you've told me, I'd like to ask a few more questions to find you the best plan. What is your approximate monthly income from your work?";
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: "Jambo! I am the Mtaa Shield AI Advisor. I can help you find the perfect insurance plan in English, Swahili, or Sheng.\n\nHow do you earn your income?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    const aiText = getAIResponse(trimmed);

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "assistant", text: aiText, timestamp: new Date() },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] flex flex-col py-8">
      <div className="container max-w-3xl flex-1 flex flex-col">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 mb-3">
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mtaa AI Advisor</h1>
          <p className="text-gray-500 text-sm">Smart insurance guidance in your language</p>
          {/* Language selector */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Globe size={14} className="text-gray-400" />
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  language === l ? "bg-emerald-600 text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-emerald-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 min-h-[400px] max-h-[500px]">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === "user" ? "bg-gray-200 text-gray-600" : "bg-emerald-600 text-white"
                  }`}>
                    {msg.role === "user" ? <User size={16} /> : <Shield size={16} />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] leading-relaxed text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <Shield size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400 mb-2 font-medium">Quick responses:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Mic size={18} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message or speak..."
                className="flex-1 px-5 py-2.5 rounded-full border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-11 h-11 flex items-center justify-center bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
            <p className="text-center mt-2.5 text-xs text-gray-400">
              Or dial <strong className="text-gray-600">{USSD_CODE}</strong> on any phone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
