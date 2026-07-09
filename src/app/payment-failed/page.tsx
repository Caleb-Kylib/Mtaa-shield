"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden text-center"
      >
        <div className="p-8 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6"
          >
            <XCircle className="text-red-500" size={48} />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-500 text-sm">
            We couldn't process your M-Pesa payment. This could be due to:
          </p>
        </div>

        <div className="px-8 pb-8">
          <ul className="text-left text-sm text-gray-600 bg-gray-50 p-4 rounded-xl mb-6 space-y-2 border border-gray-100">
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-400">
              You cancelled the M-Pesa prompt.
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-400">
              Insufficient funds in your M-Pesa account.
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-400">
              M-Pesa system timeout.
            </li>
          </ul>

          <div className="space-y-3">
            <Button 
              onClick={() => router.back()}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl py-6"
            >
              <RefreshCw size={16} className="mr-2" /> Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/packages")}
              className="w-full font-bold rounded-xl py-6 border-gray-200 text-gray-700"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Plans
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
