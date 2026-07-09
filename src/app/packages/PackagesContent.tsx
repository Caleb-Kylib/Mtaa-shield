"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { occupations } from "@/data/occupations";
import { insurancePackages, calculatePrice } from "@/data/packages";
import type { OccupationType, PaymentFrequency, InsurancePackage } from "@/types";

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-600", blue: "bg-blue-600",
  orange: "bg-orange-600", yellow: "bg-yellow-600",
  purple: "bg-purple-600", rose: "bg-rose-600",
};
const ringMap: Record<string, string> = {
  emerald: "ring-emerald-500", blue: "ring-blue-500",
  orange: "ring-orange-500", yellow: "ring-yellow-500",
  purple: "ring-purple-500", rose: "ring-rose-500",
};
const textMap: Record<string, string> = {
  emerald: "text-emerald-600", blue: "text-blue-600",
  orange: "text-orange-600", yellow: "text-yellow-600",
  purple: "text-purple-600", rose: "text-rose-600",
};

export default function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuth();

  const initialOcc = (searchParams.get("occ") as OccupationType) || "farmer";
  const [activeOcc, setActiveOcc] = useState<OccupationType>(initialOcc);
  const [frequency, setFrequency] = useState<PaymentFrequency>("weekly");
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<InsurancePackage | null>(null);

  useEffect(() => {
    const occ = searchParams.get("occ") as OccupationType;
    if (occ) setActiveOcc(occ);
  }, [searchParams]);

  const packages = insurancePackages.filter((p) => p.occupation === activeOcc);
  const activeOccData = occupations.find((o) => o.id === activeOcc);

  const handleBuy = (pkgId: string) => {
    if (!token) {
      router.push(`/login?redirect=/checkout?planId=${pkgId}&freq=${frequency}`);
    } else {
      router.push(`/checkout?planId=${pkgId}&freq=${frequency}`);
    }
  };

  const freqLabels: Record<PaymentFrequency, string> = {
    weekly: "Weekly", monthly: "Monthly (save 5%)", quarterly: "Quarterly (save 10%)",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
          <p className="text-white/80 text-lg max-w-xl">Straightforward insurance tailored to your hustle. No hidden fees. Pay seamlessly with M-Pesa.</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10">
        {/* Occupation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-10 flex flex-wrap gap-2">
          {occupations.map((occ) => (
            <button key={occ.id} onClick={() => setActiveOcc(occ.id as OccupationType)}
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
          <div className="inline-flex bg-white shadow-sm border border-gray-100 rounded-full p-1 gap-1">
            {(["weekly", "monthly", "quarterly"] as PaymentFrequency[]).map((f) => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  frequency === f ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {freqLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {packages.map((pkg, i) => {
            const price = calculatePrice(pkg, frequency);
            const color = pkg.color;
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl bg-white overflow-hidden border-2 flex flex-col shadow-sm transition-shadow hover:shadow-xl ${
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
                
                <div className="bg-gray-50/50 px-6 pt-5 pb-4 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${textMap[color]}`}>KES {price.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">/{frequency.replace("ly","")}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Coverage up to {pkg.coverageAmount}</p>
                </div>

                <div className="bg-white px-6 py-5 flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white px-6 pb-6 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => setSelectedPlanDetails(pkg)}
                      className="w-full font-bold rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Learn More
                    </Button>
                    <Button onClick={() => handleBuy(pkg.id)}
                      className={`w-full font-bold rounded-xl ${pkg.popular ? `${colorMap[color]} hover:opacity-90 text-white` : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                    >
                      Buy Cover
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI CTA */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center shadow-xl">
          <Bot size={36} className="mx-auto mb-4 opacity-80 text-emerald-400" />
          <h3 className="text-xl font-bold mb-2">Not sure which plan is right for you?</h3>
          <p className="text-gray-300 text-sm mb-5">Talk to our AI advisor — it will recommend the perfect plan based on your needs.</p>
          <Button className="bg-emerald-600 text-white font-bold hover:bg-emerald-500 rounded-full px-8 border-none" asChild>
            <Link href="/ai-assistant"><Bot size={16} className="mr-2" />Talk to AI Advisor</Link>
          </Button>
        </div>
      </div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {selectedPlanDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className={`${colorMap[selectedPlanDetails.color]} p-6 relative`}>
                <button 
                  onClick={() => setSelectedPlanDetails(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedPlanDetails.name}</h2>
                <p className="text-white/80 text-sm">{selectedPlanDetails.tagline}</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What's included</h4>
                  <ul className="space-y-3">
                    {selectedPlanDetails.features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700">
                        <Check size={16} className={textMap[selectedPlanDetails.color]} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Coverage Limits</h4>
                  <p className="text-sm font-semibold text-gray-900">{selectedPlanDetails.coverageAmount}</p>
                </div>
                <Button 
                  onClick={() => {
                    handleBuy(selectedPlanDetails.id);
                  }}
                  className={`w-full font-bold rounded-xl ${colorMap[selectedPlanDetails.color]} hover:opacity-90 text-white`}
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
