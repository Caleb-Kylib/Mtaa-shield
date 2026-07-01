import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, CheckCircle2 } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/constants";

const features = [
  "AI-powered recommendations",
  "Weekly premiums from KES 50",
  "M-Pesa payments & payouts",
  "Claims in 48 hours",
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left: Visual Panel */}
      <div className="hidden lg:flex w-[45%] relative bg-emerald-950 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/farmer.jpg"
            alt="Informal workers protected by Mtaa Shield"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/80 to-emerald-800/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12 text-white">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <span>{APP_NAME}</span>
            </Link>
          </div>

          {/* Hero text */}
          <div className="max-w-sm">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">
              Protecting<br />
              <span className="text-emerald-400">Every Hustle.</span>
            </h1>
            <p className="text-emerald-100/80 text-base mb-8 leading-relaxed">
              Affordable microinsurance powered by AI, designed for Africa's informal workforce.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-emerald-100">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {["AI Powered", "Weekly Premiums", "M-Pesa Ready"].map((b) => (
                <span key={b} className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 border border-white/10">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-emerald-400/60 text-xs font-medium tracking-widest uppercase">
            {APP_TAGLINE}
          </p>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 bg-white overflow-y-auto">
        <div className="w-full max-w-[480px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
