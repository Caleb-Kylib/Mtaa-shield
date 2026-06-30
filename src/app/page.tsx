"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Bot, Mic, Globe, Hash, MessageCircle, CreditCard,
  Calendar, ChevronDown, ChevronRight, Star, CheckCircle2,
  Leaf, Bike, Store, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  { icon: <Bot size={22} />, title: 'AI Advisor', desc: 'Get a personalised insurance recommendation based on your job and income.' },
  { icon: <Mic size={22} />, title: 'Voice Support', desc: 'Speak to our assistant in your language — no typing required.' },
  { icon: <Globe size={22} />, title: 'Local Languages', desc: 'We support Swahili, Sheng, Kikuyu, Luo, and more.' },
  { icon: <Hash size={22} />, title: 'USSD Powered', desc: 'Dial *384*10# on any phone — no data needed.' },
  { icon: <MessageCircle size={22} />, title: 'WhatsApp Support', desc: 'Chat with us on WhatsApp to manage your policy anytime.' },
  { icon: <CreditCard size={22} />, title: 'M-Pesa Ready', desc: 'Pay premiums and receive payouts straight from M-Pesa.' },
  { icon: <Calendar size={22} />, title: 'Weekly Premiums', desc: 'Pay as little as KES 50/week — on your payday schedule.' },
  {
    icon: <span className="font-bold text-primary text-sm">KES</span>,
    title: 'Affordable Plans',
    desc: 'Plans start from KES 50/week. Insurance that fits your pocket.'
  },
];

const plans = [
  {
    type: 'farmer',
    label: 'For Farmers',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    plans: [
      { name: 'Essential Crop Cover', price: 'KES 50', period: '/week' },
      { name: 'Farm Plus Cover', price: 'KES 150', period: '/week' },
    ],
  },
  {
    type: 'boda',
    label: 'For Boda Riders',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
    plans: [
      { name: 'Rider Basic', price: 'KES 100', period: '/week' },
      { name: 'Rider Plus', price: 'KES 250', period: '/week' },
    ],
  },
  {
    type: 'trader',
    label: 'For Market Traders',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    plans: [
      { name: 'Business Basic', price: 'KES 75', period: '/week' },
      { name: 'Business Plus', price: 'KES 200', period: '/week' },
    ],
  },
];

const steps = [
  { num: '1', icon: <CheckCircle2 size={22} />, title: 'Create an account', desc: 'Sign up in 60 seconds' },
  { num: '2', icon: <Bot size={22} />, title: 'AI recommends a plan', desc: 'Based on your occupation' },
  { num: '3', icon: <CreditCard size={22} />, title: 'Pay with M-Pesa', desc: 'From KES 50/week' },
  { num: '4', icon: <CheckCircle2 size={22} />, title: 'Receive Policy', desc: 'Instant digital policy' },
  { num: '5', icon: <Globe size={22} />, title: 'Stay Protected', desc: 'Claims in 48 hrs' },
];

const testimonials = [
  {
    name: 'James Omondi',
    role: 'Boda Boda Rider, Kisumu',
    avatar: 'JO',
    quote: 'Sikuwahi fikiria ninaweza afford insurance. Mtaa Shield ilifanya iwe rahisi sana — nalipa KES 100 kila wiki tu na niko covered!',
  },
  {
    name: 'Mama Njeri',
    role: 'Market Trader, Nairobi',
    avatar: 'MN',
    quote: 'When my stall caught fire, Mtaa Shield paid me within 2 days. I was able to restock and was back in business within a week. Asante sana!',
  },
];

const faqs = [
  { q: 'What if I miss a payment?', a: 'We give you a 7-day grace period before your cover lapses. You will receive an SMS reminder before any action is taken.' },
  { q: 'Can I cancel Mtaa Shield Insurance?', a: 'Yes, you can cancel anytime by texting STOP to our USSD code or contacting our support team on WhatsApp.' },
  { q: 'How quickly can I file a claim?', a: 'You can file a claim via the app, WhatsApp, or by dialing *384*10#. Claims are processed within 48 hours.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#f0f7f3] py-16 overflow-hidden">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 space-y-6">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Affordable · Flexible · AI-Powered
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Insurance that speaks{' '}
              <span className="text-primary">your language.</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
              Mtaa Shield protects farmers, boda riders, and market traders with
              AI-powered microinsurance. Simple setup. Weekly payments. Fully via M-Pesa.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="px-8 font-semibold" asChild>
                <Link href="/register">Get Covered</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 font-semibold border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link href="/ai-assistant">Talk to Us</Link>
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1 relative flex justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75" />
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ring-1 ring-primary/20">
              <Image
                src="/images/mtaa.png"
                alt="Farmer and boda rider protected by Mtaa Shield"
                width={500}
                height={500}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 py-5 bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400 text-sm font-medium">
            {['Mobile CCI', 'IRA Registered', 'M-Pesa Partner', 'USSD Ready', 'SSL Secured'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-primary" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f9fafb]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Designed for Your Reality</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We built Mtaa Shield from the ground up for the informal workforce — no jargon, no paperwork, no bank account required.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-200">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protection Plans ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Protection Plans for Every Hustle</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pick your profession and find the right cover at the right price.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p) => (
              <div key={p.type} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white font-bold text-lg">{p.label}</span>
                </div>
                <div className="p-5 bg-white">
                  {p.plans.map((pl, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-3 ${idx === 0 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-gray-700 text-sm font-medium">{pl.name}</span>
                      <span className="text-primary font-bold text-sm">{pl.price}<span className="text-gray-400 font-normal">{pl.period}</span></span>
                    </div>
                  ))}
                  <Link
                    href={`/packages?type=${p.type}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    Browse Your Plan <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f0f7f3]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Covered in 2 Minutes</h2>
            <p className="text-gray-500 max-w-lg mx-auto">No paperwork, no queues. Sign up, pay, and you're protected — instantly.</p>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-center gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center text-center px-4 max-w-[160px] mx-auto">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md mb-3">
                    {step.num}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-primary/30 mt-[-30px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Chat ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container flex flex-col md:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 space-y-5">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">AI Assistant</span>
            <h2 className="text-3xl font-bold text-gray-900">Your Personal Insurance Advisor</h2>
            <p className="text-gray-500 leading-relaxed">
              Not sure what cover you need? Ask our AI assistant in English, Swahili, or Sheng. It will recommend the perfect plan based on your job, income, and location.
            </p>
            <ul className="space-y-3">
              {['Multilingual support', 'Understands informal jobs', 'Available 24/7'].map(f => (
                <li key={f} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="font-semibold" asChild>
              <Link href="/ai-assistant">Start Chatting</Link>
            </Button>
          </div>

          {/* Chat mockup */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-[#f9fafb] rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Chat header */}
              <div className="bg-primary px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mtaa Assistant</p>
                  <p className="text-white/70 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online</p>
                </div>
              </div>
              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[240px]">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 text-sm text-gray-700 shadow-sm max-w-[80%]">
                    Jambo! Mimi ni assistant wako. Unafanya kazi gani? Nitakupendekeza bima inayofaa.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                    Mimi ni dereva wa boda boda Nairobi.
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 text-sm text-gray-700 shadow-sm max-w-[80%]">
                    Vizuri! <strong>Rider Plus</strong> inakulinda kwa ajali, wizi, na third-party liability. Inaanza KES 250/wiki tu. Tuanze?
                  </div>
                </div>
              </div>
              {/* Input */}
              <div className="px-4 pb-4">
                <div className="bg-white border border-gray-200 rounded-full flex items-center px-4 py-2 gap-2">
                  <input disabled className="flex-1 text-sm outline-none text-gray-400 bg-transparent" placeholder="Type your message..." />
                  <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f9fafb]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Voice of the Community</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Real stories from real people who chose to shield their hustle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative">
                <div className="text-primary/20 text-7xl font-serif absolute top-4 left-6 leading-none select-none">"</div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-sm"
                >
                  {faq.q}
                  <ChevronDown size={16} className={`text-primary transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-extrabold mb-4">Ready to shield your future?</h2>
          <p className="text-white/80 text-lg mb-10">
            Join over 50,000 informal workers across Kenya who trust Mtaa Shield to protect their livelihoods.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary font-bold hover:bg-white/90 px-8" asChild>
              <Link href="/register">Get Free Quote Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white font-bold hover:bg-white/10 px-8" asChild>
              <Link href="/ai-assistant">Explore Plans</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
