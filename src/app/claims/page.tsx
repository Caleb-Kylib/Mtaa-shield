"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Upload, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OccupationType } from "@/types";
import { OCCUPATION_LABELS, OCCUPATION_EMOJIS } from "@/constants";

const claimTypes: Record<OccupationType, { label: string; icon: string; desc: string }[]> = {
  farmer: [
    { label: "Crop Damage", icon: "🌱", desc: "Drought, excess rain, or disease affecting your crops" },
    { label: "Livestock Loss", icon: "🐄", desc: "Injury, illness, or theft of livestock" },
    { label: "Equipment Damage", icon: "🚜", desc: "Damage to farming tools or machinery" },
    { label: "Animal Disease / Illness", icon: "🦠", desc: "Notifiable diseases such as FMD, CBPP, CCPP, anthrax, or tick-borne illness causing animal death" },
    { label: "Predator or Wildlife Attack", icon: "🦁", desc: "Animal killed or maimed by lions, hyenas, leopards, or other wildlife" },
    { label: "Accidental Injury or Death", icon: "🩺", desc: "Animal fatally injured in a fall, fence entanglement, vehicle collision, or farm accident" },
    { label: "Animal Theft / Rustling", icon: "🔓", desc: "One or more animals stolen from your farm or while in transit" },
    { label: "Drought or Starvation", icon: "☀️", desc: "Animal deaths directly caused by prolonged drought or pasture failure" },
    { label: "Flood or Storm Damage", icon: "🌊", desc: "Animals lost or killed due to flooding, flash floods, or severe storms" },
    { label: "Transit Accident", icon: "🚚", desc: "Animal injured or died during transportation to market, auction, or a veterinary facility" },
    { label: "Difficult Birth (Dystocia)", icon: "🐣", desc: "Loss of a high-value breeding animal due to complications during labour" },
    { label: "Poisoning", icon: "☠️", desc: "Animal died after consuming toxic plants, contaminated water, or malicious poisoning" },
  ],
  "boda-rider": [
    { label: "Accident Claim", icon: "🏍️", desc: "Injuries sustained in a road accident" },
    { label: "Bike Theft", icon: "🔒", desc: "Your motorcycle was stolen" },
    { label: "Passenger Injury", icon: "🩺", desc: "A passenger was injured during a ride" },
  ],
  "market-trader": [
    { label: "Fire Damage", icon: "🔥", desc: "Your stall or stock was destroyed in a fire" },
    { label: "Theft", icon: "👜", desc: "Stock or cash was stolen from your stall" },
    { label: "Flood Damage", icon: "🌊", desc: "Your goods were damaged by flooding" },
  ],
  "construction-worker": [
    { label: "Work Injury", icon: "🦺", desc: "You were injured on a construction site" },
    { label: "Disability Claim", icon: "♿", desc: "Total or partial disability from a work accident" },
    { label: "Tool Theft", icon: "🔧", desc: "Your work tools were stolen from a job site" },
  ],
  "gig-worker": [
    { label: "Device Damage", icon: "📱", desc: "Your phone or laptop was damaged or lost" },
    { label: "Equipment Theft", icon: "💻", desc: "Your work equipment was stolen" },
    { label: "Income Loss", icon: "💸", desc: "You couldn't work due to illness or injury" },
  ],
  "small-business": [
    { label: "Fire / Property Damage", icon: "🏪", desc: "Your business premises or stock was damaged" },
    { label: "Equipment Breakdown", icon: "⚙️", desc: "Critical business equipment failed" },
    { label: "Business Interruption", icon: "🚫", desc: "You couldn't operate your business" },
  ],
};

const steps = [
  { icon: CheckCircle2, label: "Select claim type" },
  { icon: Upload, label: "Upload evidence" },
  { icon: Clock, label: "Processing (48h)" },
  { icon: Shield, label: "Payment via M-Pesa" },
];

export default function ClaimsPage() {
  const [selectedOcc, setSelectedOcc] = useState<OccupationType>("boda-rider");
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedClaim) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full mx-4 shadow-xl border border-gray-100"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h2>
          <p className="text-gray-500 text-sm mb-2">Your claim reference is</p>
          <p className="font-mono font-bold text-emerald-600 text-lg mb-6">#CLM-2026-00892</p>
          <p className="text-gray-600 text-sm mb-8">
            Our team will review your claim within <strong>48 hours</strong>. You will receive an SMS and WhatsApp update on the progress.
          </p>
          <Button className="w-full rounded-xl" onClick={() => setSubmitted(false)}>
            File Another Claim
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 pb-24">
      <div className="container max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 mb-4">Claims Center</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File a Claim</h1>
          <p className="text-gray-500">Simple, fast, and fair. Most claims are paid within 48 hours.</p>
        </div>

        {/* Process steps */}
        <div className="flex items-center justify-center gap-2 mb-10 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                  <step.icon size={14} />
                </div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium leading-tight max-w-[60px]">{step.label}</p>
              </div>
              {i < steps.length - 1 && <div className="w-6 h-px bg-gray-200 mb-4 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Step 1: Select Occupation */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">1. What is your occupation?</h3>
            <p className="text-gray-500 text-sm mb-4">This helps us show the right claim types for you.</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(OCCUPATION_LABELS) as OccupationType[]).map((occ) => (
                <button
                  key={occ}
                  onClick={() => { setSelectedOcc(occ); setSelectedClaim(null); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedOcc === occ
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{OCCUPATION_EMOJIS[occ]}</span>
                  <span className="hidden sm:block">{OCCUPATION_LABELS[occ]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Claim Type */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">2. What are you claiming for?</h3>
            <p className="text-gray-500 text-sm mb-4">Select the type of incident that occurred.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {claimTypes[selectedOcc].map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedClaim(c.label)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selectedClaim === c.label
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{c.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Animal claim documentation notice */}
          {selectedOcc === "farmer" && selectedClaim && [
            "Animal Disease / Illness", "Predator or Wildlife Attack", "Accidental Injury or Death",
            "Animal Theft / Rustling", "Drought or Starvation", "Flood or Storm Damage",
            "Transit Accident", "Difficult Birth (Dystocia)", "Poisoning"
          ].includes(selectedClaim) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mb-0 -mt-2 bg-teal-50 border border-teal-200 rounded-xl p-4"
            >
              <p className="text-teal-800 font-semibold text-sm mb-2">📋 Documents needed for animal loss claim</p>
              <ul className="space-y-1 text-teal-700 text-xs leading-relaxed">
                <li>• <strong>Veterinary report</strong> or death certificate signed by a licensed vet</li>
                <li>• <strong>Photos / video</strong> of the deceased or injured animal(s)</li>
                <li>• <strong>Ear tag, brand, or tattoo number</strong> of each animal claimed</li>
                <li>• <strong>Purchase receipt or valuation</strong> showing the animal&apos;s worth</li>
                {selectedClaim === "Animal Theft / Rustling" && (
                  <li>• <strong>Police abstract</strong> (OB number) filed within 24 hours of discovery</li>
                )}
                {selectedClaim === "Animal Disease / Illness" && (
                  <li>• <strong>Government vet or KVB notification</strong> confirming notifiable disease</li>
                )}
                {selectedClaim === "Transit Accident" && (
                  <li>• <strong>Transporter&apos;s waybill</strong> and driver details</li>
                )}
              </ul>
            </motion.div>
          )}

          {/* Step 3: Evidence Upload */}
          {selectedClaim && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 border-b border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-1">3. Upload evidence</h3>
              <p className="text-gray-500 text-sm mb-4">Photos, videos, or documents related to your claim.</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Tap to take a photo or upload files</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF — max 10 MB</p>
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <div className="p-6">
            <Button
              onClick={handleSubmit}
              disabled={!selectedClaim}
              className="w-full rounded-xl py-6 font-bold text-base bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              <AlertCircle size={18} className="mr-2" />
              Submit Claim
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Claims are reviewed within 48 hours · M-Pesa payout on approval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
