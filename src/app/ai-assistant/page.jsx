'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic, Shield } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Jambo! I am the Mtaa Shield AI Assistant. I can help you choose an insurance plan in English, Swahili, or Sheng. What kind of work do you do?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      let aiText = "That's great. Based on what you told me, I recommend looking at our Basic packages. Would you like me to break down what's covered?";
      if (input.toLowerCase().includes('boda') || input.toLowerCase().includes('nduthi')) {
        aiText = "Ah, a Boda rider! For you, the Rider Basic package at KSH 100/week is best to start. It covers personal accidents and minor scratches. Shall we proceed to payment via M-Pesa?";
      } else if (input.toLowerCase().includes('swahili')) {
        aiText = "Sawa! Naweza kukusaidia kwa Kiswahili. Wewe hufanya kazi gani?";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-md)', marginBottom: '1rem' }}>
            <Bot size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>Mtaa AI Guide</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Text or send a voice note to get personalized advice.</p>
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border)' }}>
          
          {/* Chat Area */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                gap: '1rem',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  backgroundColor: msg.role === 'user' ? 'var(--primary-light)' : 'var(--background)',
                  color: msg.role === 'user' ? 'var(--primary)' : 'var(--text-primary)',
                  padding: '0.75rem', 
                  borderRadius: '50%',
                  height: '40px', width: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={20} /> : <Shield size={20} />}
                </div>
                <div style={{ 
                  backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'var(--background)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)',
                  borderTopRightRadius: msg.role === 'user' ? '0' : 'var(--radius-md)',
                  borderTopLeftRadius: msg.role === 'assistant' ? '0' : 'var(--radius-md)',
                  maxWidth: '75%',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" style={{ 
                backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', 
                width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s'
              }}>
                <Mic size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..." 
                style={{ 
                  flex: 1, padding: '0 1.5rem', borderRadius: 'var(--radius-full)', 
                  border: '1px solid var(--border)', outline: 'none', fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
              <button type="submit" style={{ 
                backgroundColor: 'var(--primary)', border: 'none', borderRadius: 'var(--radius-full)', 
                width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', transition: 'background 0.2s'
              }}>
                <Send size={18} style={{ marginLeft: '4px' }} />
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Or dial <strong>*123*45#</strong> on your phone to use USSD.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
