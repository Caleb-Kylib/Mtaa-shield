"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPackageById } from "@/data/packages";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const planId = searchParams.get("planId");
  const pkg = getPackageById(planId || "");

  const today = new Date();
  const nextPayment = new Date(today);
  nextPayment.setMonth(today.getMonth() + 1); // Mock 1 month
  const policyNumber = `POL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // Simulate updating context/local storage with new policy
  useEffect(() => {
    if (pkg) {
      localStorage.setItem("mtaa_new_policy", JSON.stringify({
        id: pkg.id,
        name: pkg.name,
        policyNumber,
        startDate: today.toISOString(),
        nextPayment: nextPayment.toISOString(),
        status: "active"
      }));
    }
  }, [pkg]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-emerald-500 p-8 text-center relative overflow-hidden">
          {/* Confetti effect simulation */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 relative z-10"
          >
            <CheckCircle className="text-emerald-500" size={48} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white relative z-10">Payment Successful!</h1>
          <p className="text-emerald-50 mt-1 relative z-10">Your insurance is now active.</p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Plan</span>
              <span className="text-sm font-bold text-gray-900 flex items-center">
                <ShieldCheck size={16} className="text-emerald-500 mr-1" />
                {pkg?.name || "Insurance Plan"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Policy Number</span>
              <span className="text-sm font-semibold font-mono text-gray-900">{policyNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Coverage Start</span>
              <span className="text-sm font-semibold text-gray-900">{today.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Next Payment</span>
              <span className="text-sm font-semibold text-gray-900">{nextPayment.toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500 mb-6">
            We've sent a confirmation SMS and WhatsApp message to your phone with your policy documents.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/dashboard")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-6"
            >
              Go to Dashboard <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="w-full font-bold rounded-xl py-6 border-gray-200 text-gray-700"
            >
              <FileText size={16} className="mr-2" /> View Policy Document
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
