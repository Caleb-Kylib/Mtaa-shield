"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot, Mic, Globe, Hash, MessageCircle, CreditCard,
  Calendar, CheckCircle2, Star, ArrowRight, Shield,
  Zap, Clock, Phone, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { occupations } from "@/data/occupations";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { HOW_IT_WORKS_STEPS, TRUST_BADGES } from "@/constants";

const features = [
  { icon: Bot, title: "AI Insurance Advisor", desc: "Personalised plan based on your job and income — no jargon." },
  { icon: Mic, title: "Voice Support", desc: "Speak to our assistant in your language — no typing needed." },
  { icon: Globe, title: "Local Languages", desc: "Swahili, Sheng, Kikuyu, Luo, and more." },
  { icon: Hash, title: "USSD Powered", desc: "Dial *384*10# — no smartphone or data required." },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Manage your policy on WhatsApp anytime." },
  { icon: CreditCard, title: "M-Pesa Ready", desc: "Pay and receive payouts straight through M-Pesa." },
  { icon: Calendar, title: "Weekly Premiums", desc: "Pay as little as KES 50/week on your schedule." },
  { icon: Zap, title: "Fast Claims", desc: "Claims processed and paid within 48 hours." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  }),
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#f0f9f4] via-white to-[#f0f5ff] py-20 lg:py-28 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <Badge variant="outline" className="inline-flex gap-1.5 border-emerald-200 text-emerald-700 bg-emerald-50 py-1 px-3">
              <Zap size={12} className="fill-emerald-500 text-emerald-500" />
              AI-Powered · Affordable · African
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Insurance that
              <span className="block text-emerald-600"> speaks your language.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Affordable AI-powered insurance built for every hustle in Africa. Pay with M-Pesa.
              Claims in 48 hours. No bank account needed.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <Button size="lg" className="px-8 font-semibold rounded-full shadow-lg shadow-emerald-200" asChild>
                <Link href="/register">Get Covered</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 font-semibold rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" asChild>
                <Link href="/ai-assistant">
                  <Bot size={18} className="mr-2" />
                  Talk to AI
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["bg-blue-500", "bg-green-600", "bg-orange-500", "bg-purple-500"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{["JO","MN","WK","DM"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs text-gray-500">50,000+ covered across Kenya</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative w-full max-w-md lg:max-w-none"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 aspect-[4/3]">
              <Image
                src="/images/mtaa.png"
                alt="Mtaa Shield — protecting informal workers across Africa"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">100% Protected</p>
                    <p className="text-xs text-gray-500">Active since today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 py-4 bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 items-center text-gray-500 text-sm font-medium">
            {TRUST_BADGES.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 size={13} className="text-emerald-500" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose Your Hustle ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white" id="occupations">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50 mb-4">Choose Your Hustle</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How do you earn your income?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tell us your work. Our AI will instantly recommend the perfect insurance plan for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {occupations.map((occ, i) => (
              <motion.div
                key={occ.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link href={`/packages?occ=${occ.id}`} className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={occ.image}
                      alt={occ.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${occ.bgColor} ${occ.color}`}>
                        {occ.emoji} {occ.label}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-lg">{occ.label}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{occ.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">From <span className="text-emerald-600 font-bold text-sm">KES {occ.startingFrom}/wk</span></span>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${occ.color} group-hover:gap-2 transition-all`}>
                        View Plans <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Mtaa Shield?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built from the ground up for Africa's informal workforce — no jargon, no paperwork.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-100 transition-colors">
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Get Covered in 2 Minutes</h2>
            <p className="text-gray-500 max-w-lg mx-auto">No paperwork, no queues. Sign up, pay, and you&apos;re protected instantly.</p>
          </div>
          <div className="relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
              {HOW_IT_WORKS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-200 mb-4 z-10">
                    {step.num}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{step.title}</p>
                  <p className="text-gray-500 text-xs">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Preview ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-emerald-950 to-emerald-800 text-white overflow-hidden" id="ai-preview">
        <div className="container flex flex-col lg:flex-row items-center gap-14">
          {/* Left text */}
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <Badge className="bg-emerald-700/50 text-emerald-200 border-emerald-600">AI Assistant</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
              Your Personal Insurance Advisor,<br />
              <span className="text-emerald-300">always available.</span>
            </h2>
            <p className="text-emerald-100/80 leading-relaxed max-w-md mx-auto lg:mx-0">
              Not sure what cover you need? Ask in English, Swahili, or Sheng. Our AI recommends the perfect plan based on your job, income, and location.
            </p>
            <ul className="space-y-2.5 text-sm">
              {["Multilingual — Swahili, English, Sheng", "Understands informal work & income", "Available 24/7, even offline via USSD"].map((f) => (
                <li key={f} className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span className="text-emerald-100">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap justify-center lg:justify-start pt-2">
              <Button size="lg" className="bg-white text-emerald-800 font-semibold hover:bg-white/90 rounded-full px-7" asChild>
                <Link href="/ai-assistant">Start Chatting</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-7" asChild>
                <Link href="/packages">Browse Plans</Link>
              </Button>
            </div>
          </div>

          {/* Chat Mockup */}
          <div className="flex-1 w-full max-w-sm mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="bg-emerald-700/80 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mtaa AI Advisor</p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    Online
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {["bg-white/20","bg-white/30","bg-white/20"].map((c,i)=>(
                    <div key={i} className={`w-2 h-2 rounded-full ${c}`}/>
                  ))}
                </div>
              </div>
              <div className="p-5 space-y-4 min-h-[220px] bg-white/5">
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/15 rounded-2xl rounded-tl-none p-3 text-sm text-white max-w-[80%] backdrop-blur-sm">
                    Jambo! Unafanya kazi gani? Nitakupendekeza bima inayofaa.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-emerald-500/80 text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[75%]">
                    Mimi ni dereva wa boda boda, Nairobi.
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/15 rounded-2xl rounded-tl-none p-3 text-sm text-white max-w-[80%] backdrop-blur-sm">
                    Vizuri! <strong>Rider Plus</strong> inakulinda kwa ajali, wizi, na third-party. Inaanza <strong>KES 250/wiki</strong>. Tuanze?
                  </div>
                </div>
                {/* Suggested prompts */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Yes, proceed", "Show me plans", "What's covered?"].map((s) => (
                    <span key={s} className="text-xs bg-white/15 text-white/80 px-2.5 py-1 rounded-full cursor-pointer hover:bg-white/25 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-white/10">
                <div className="bg-white/15 rounded-full flex items-center px-4 py-2.5 gap-2">
                  <Mic size={16} className="text-white/60" />
                  <input disabled className="flex-1 text-sm outline-none text-white/50 bg-transparent placeholder:text-white/40" placeholder="Type or speak..." />
                  <button className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                    <ArrowRight size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Voice of the Community</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Real stories from real people who chose to shield their hustle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden"
              >
                <div className="text-emerald-100 text-8xl font-serif absolute -top-2 -left-1 leading-none select-none">&ldquo;</div>
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role} · {t.occupation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Got questions? We have answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-sm"
                >
                  {faq.question}
                  <ChevronDown
                    size={16}
                    className={`text-emerald-600 transition-transform duration-200 shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to shield your future?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Join over 50,000 informal workers across Kenya who trust Mtaa Shield to protect their livelihoods.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-700 font-bold hover:bg-white/90 px-8 rounded-full shadow-xl" asChild>
              <Link href="/register">Get Covered Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white font-bold hover:bg-white/10 px-8 rounded-full" asChild>
              <Link href="/ai-assistant">
                <Bot size={18} className="mr-2" />
                Talk to AI
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
