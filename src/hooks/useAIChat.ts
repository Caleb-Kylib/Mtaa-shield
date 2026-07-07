"use client";

import { useState, useCallback } from "react";
import { aiService, type ChatResponse } from "@/services/ai.service";
import type { ChatMessage } from "@/types";

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: "Jambo! I am the Mtaa Shield AI Advisor. I can help you find the perfect insurance plan in English, Swahili, or Sheng.\n\nHow do you earn your income?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState<ChatResponse["suggestedPackage"]>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string, language = "English") => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    try {
      // Build history for context (last 6 messages)
      const history = messages.slice(-6).map((m) => ({ role: m.role, text: m.text }));
      const response = await aiService.chat({ message: trimmed, language, history });

      setLastSuggestion(response.suggestedPackage);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: response.text,
          timestamp: new Date(response.timestamp),
        },
      ]);
    } catch {
      // Fallback to client-side response if API fails
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "Sorry, I had trouble connecting. Please try again or dial *384*10# to reach us via USSD.",
          timestamp: new Date(),
        },
      ]);
      setError("Connection failed");
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const reset = useCallback(() => {
    setMessages([{
      id: "1",
      role: "assistant",
      text: "Jambo! How do you earn your income? Tell me about your work and I'll find you the best plan.",
      timestamp: new Date(),
    }]);
    setLastSuggestion(null);
  }, []);

  return { messages, isTyping, lastSuggestion, error, sendMessage, reset };
}
