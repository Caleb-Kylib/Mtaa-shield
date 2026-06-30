"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic, Shield } from 'lucide-react';

type Message = { role: 'user' | 'assistant', text: string };

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Jambo! I am the Mtaa Shield AI Assistant. I can help you choose an insurance plan in English, Swahili, or Sheng. What kind of work do you do?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      let aiText = "That's great. Based on what you told me, I recommend looking at our Basic packages. Would you like me to break down what's covered?";
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('boda') || lowerInput.includes('nduthi')) {
        aiText = "Ah, a Boda rider! For you, the Rider Basic package at KSH 100/week is best to start. It covers personal accidents and minor scratches. Shall we proceed to payment via M-Pesa?";
      } else if (lowerInput.includes('swahili')) {
        aiText = "Sawa! Naweza kukusaidia kwa Kiswahili. Wewe hufanya kazi gani?";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    }, 1000);
  };

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-4rem)] flex flex-col py-8">
      <div className="container max-w-3xl flex-1 flex flex-col">
        
        <div className="text-center mb-8">
          <div className="inline-flex bg-card p-4 rounded-full shadow-sm mb-4 border border-border text-primary">
            <Bot size={36} />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Mtaa AI Guide</h1>
          <p className="text-muted-foreground">Text or send a voice note to get personalized advice.</p>
        </div>

        <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border flex flex-col overflow-hidden">
          
          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Shield size={20} />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card border-t border-border">
            <form onSubmit={handleSend} className="flex gap-2">
              <button type="button" className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0">
                <Mic size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 px-6 rounded-full border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
              />
              <button type="submit" className="w-12 h-12 flex items-center justify-center bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors shrink-0">
                <Send size={18} className="ml-1" />
              </button>
            </form>
            <div className="text-center mt-3 text-xs text-muted-foreground">
              Or dial <strong className="text-foreground">*123*45#</strong> on your phone to use USSD.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
