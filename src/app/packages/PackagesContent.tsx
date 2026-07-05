"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { occupations } from "@/data/occupations";
import { insurancePackages, calculatePrice } from "@/data/packages";
import { addOns } from "@/data/addons";
import type { OccupationType, PaymentFrequency } from "@/types";

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-600", blue: "bg-blue-600",
  orange: "bg-orange-600", yellow: "bg-yellow-600",
  purple: "bg-purple-600", rose: "bg-rose-600",
  teal: "bg-teal-600",
};
const ringMap: Record<string, string> = {
  emerald: "ring-emerald-500", blue: "ring-blue-500",
  orange: "ring-orange-500", yellow: "ring-yellow-500",
  purple: "ring-purple-500", rose: "ring-rose-500",
  teal: "ring-teal-500",
};
const textMap: Record<string, string> = {
  emerald: "text-emerald-600", blue: "text-blue-600",
  orange: "text-orange-600", yellow: "text-yellow-600",
  purple: "text-purple-600", rose: "text-rose-600",
  teal: "text-teal-600",
};

export default function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuth();

  const initialOcc = (searchParams.get("occ") as OccupationType) || "farmer";
  const [activeOcc, setActiveOcc] = useState<OccupationType>(initialOcc);
  const [frequency, setFrequency] = useState<PaymentFrequency>("weekly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  useEffect(() => {
    const occ = searchParams.get("occ") as OccupationType;
    if (occ) setActiveOcc(occ);
  }, [searchParams]);

  const packages = insurancePackages.filter((p) => p.occupation === activeOcc);
  const activeOccData = occupations.find((o) => o.id === activeOcc);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const handleBuy = () => !token ? router.push("/login") : router.push("/dashboard");

  const freqLabels: Record<PaymentFrequency, string> = {
    weekly: "Weekly", monthly: "Monthly (save 5%)", quarterly: "Quarterly (save 10%)",
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-950 to-gray-800 text-white py-16 overflow-hidden">
        {activeOccData && (
          <div className="absolute inset-0 opacity-20">
            <Image src={activeOccData.image} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="container relative z-10">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">Insurance Plans</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Find Your Perfect Plan</h1>
          <p className="text-white/80 text-lg max-w-xl">AI-recommended insurance tailored to your hustle. Pay with M-Pesa. Cancel anytime.</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10">
        {/* Occupation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-10 flex flex-wrap gap-2">
          {occupations.map((occ) => (
            <button key={occ.id} onClick={() => setActiveOcc(occ.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeOcc === occ.id ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{occ.emoji}</span>
              <span className="hidden sm:block">{occ.label}</span>
            </button>
          ))}
        </div>

        {/* Frequency Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
            {(["weekly", "monthly", "quarterly"] as PaymentFrequency[]).map((f) => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  frequency === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {freqLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Package Cards */}
        <div className={`grid grid-cols-1 gap-8 max-w-5xl mx-auto mb-16 ${packages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-4xl"}`}>
          {packages.map((pkg, i) => {
            const price = calculatePrice(pkg, frequency);
            const color = pkg.color;
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden border-2 flex flex-col shadow-sm ${
                  pkg.popular ? `ring-2 ${ringMap[color]} border-transparent shadow-xl` : "border-gray-100 mt-4"
                }`}
              >
                {pkg.popular && (
                  <div className={`absolute top-0 left-0 right-0 ${colorMap[color]} text-white text-xs font-bold uppercase tracking-widest py-1.5 text-center`}>
                    Most Popular
                  </div>
                )}
                <div className={`${colorMap[color]} ${pkg.popular ? "pt-8 pb-6" : "py-6"} px-6 text-white`}>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">{activeOccData?.emoji} {activeOccData?.label}</p>
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-white/80 text-sm">{pkg.tagline}</p>
                </div>
                <div className="bg-white px-6 pt-5 pb-4 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${textMap[color]}`}>KES {price.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">/{frequency.replace("ly","")}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Coverage up to {pkg.coverageAmount}</p>
                </div>
                <div className="bg-white px-6 py-5 flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white px-6 pb-6">
                  <Button onClick={handleBuy} size="lg"
                    className={`w-full font-bold rounded-xl ${pkg.popular ? `${colorMap[color]} hover:opacity-90 text-white` : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                  >
                    Buy with M-Pesa
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-2">Cancel anytime · No hidden fees</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Optional Add-ons</h2>
          <p className="text-gray-500 text-sm mb-6">Enhance your cover with additional protection.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon) => {
              const selected = selectedAddOns.includes(addon.id);
              return (
                <button key={addon.id} onClick={() => toggleAddOn(addon.id)}
                  className={`text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
                    selected ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{addon.icon}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selected ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                    }`}>
                      {selected && <Check size={10} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{addon.name}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{addon.description}</p>
                  <p className="text-emerald-600 font-bold text-sm">+ KES {addon.weeklyPrice}/wk</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI CTA */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
          <Bot size={36} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Not sure which plan is right for you?</h3>
          <p className="text-white/80 text-sm mb-5">Talk to our AI advisor — it will recommend the perfect plan in seconds.</p>
          <Button className="bg-white text-emerald-700 font-bold hover:bg-white/90 rounded-full px-8" asChild>
            <Link href="/ai-assistant"><Bot size={16} className="mr-2" />Talk to AI Advisor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
