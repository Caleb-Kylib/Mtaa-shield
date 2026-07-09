"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Smartphone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPackageById } from "@/data/packages";

export default function PaymentStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dots, setDots] = useState("");
  
  const planId = searchParams.get("planId");
  const freq = searchParams.get("freq");

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simulate payment backend polling
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to success after 6 seconds
      router.push(`/payment-success?planId=${planId}&freq=${freq}`);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [router, planId, freq]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="relative mx-auto w-32 h-32 mb-8">
          {/* Pulsing background */}
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75" />
          
          <div className="relative bg-emerald-50 w-full h-full rounded-full border-4 border-emerald-100 flex items-center justify-center shadow-inner">
            <Smartphone className="text-emerald-600 animate-bounce" size={48} strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Waiting for M-Pesa{dots}
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          We've sent an M-Pesa payment request to your phone. Please check your screen and enter your M-Pesa PIN to complete the payment.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 py-3 px-6 rounded-full mx-auto w-max mb-10">
          <Loader2 size={16} className="animate-spin" />
          Checking payment status
        </div>

        <Button variant="outline" className="rounded-xl w-full border-gray-200 text-gray-600 font-bold" onClick={() => window.location.reload()}>
          <RefreshCw size={16} className="mr-2" />
          Refresh Status
        </Button>
      </motion.div>
    </div>
  );
}
