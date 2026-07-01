"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, AlertCircle, FileText, Activity, CreditCard,
  Bell, Bot, Download, RefreshCw, TrendingUp, Clock,
  CheckCircle2, ArrowRight, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { OCCUPATION_LABELS, OCCUPATION_EMOJIS } from "@/constants";
import type { OccupationType } from "@/types";

const mockPayments = [
  { id: "1", label: "M-Pesa Auto-Renew", date: "Jun 24, 2026", amount: 250, status: "success" },
  { id: "2", label: "M-Pesa Auto-Renew", date: "Jun 17, 2026", amount: 250, status: "success" },
  { id: "3", label: "M-Pesa Auto-Renew", date: "Jun 10, 2026", amount: 250, status: "success" },
];

const quickActions = [
  { icon: Shield, label: "Buy Cover", href: "/packages", color: "bg-emerald-600 text-white" },
  { icon: RefreshCw, label: "Renew Policy", href: "/packages", color: "bg-blue-600 text-white" },
  { icon: AlertCircle, label: "Make Claim", href: "/claims", color: "bg-orange-500 text-white" },
  { icon: Bot, label: "Talk to AI", href: "/ai-assistant", color: "bg-purple-600 text-white" },
  { icon: Download, label: "Download Policy", href: "#", color: "bg-gray-700 text-white" },
];

const aiInsights = [
  "Your Rider Plus plan has renewed successfully 3 times. You qualify for a 5% loyalty discount next month.",
  "Based on your location (Nairobi), consider adding Hospital Cash cover — 67% of boda riders in your area have it.",
  "Your no-claim streak is now 3 months. You save KES 37 automatically on your next renewal.",
];

export default function DashboardPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token, router]);

  if (isLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const occKey = (user?.occupation || "boda-rider") as OccupationType;
  const planName = occKey === "farmer" ? "Farm Plus" : occKey === "market-trader" ? "Biashara Plus" : occKey === "small-business" ? "Business Plus" : "Rider Plus";

  return (
    <div className="bg-gray-50 min-h-screen py-8 pb-20">
      <div className="container max-w-6xl">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <p className="text-gray-500 text-sm mb-1">Welcome back 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name || "User"}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{OCCUPATION_EMOJIS[occKey]}</span>
              <span className="text-gray-600 text-sm">{OCCUPATION_LABELS[occKey]}</span>
              <span className="text-gray-300">·</span>
              <Badge variant="success" className="text-[10px] font-bold">ACTIVE</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <Link href="/ai-assistant">
                <Bot size={15} /> AI Advisor
              </Link>
            </Button>
            <Button size="sm" className="gap-1.5 bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link href="/claims">
                <AlertCircle size={15} /> File a Claim
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Active Policy Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-1 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-2xl p-7 relative overflow-hidden shadow-lg"
          >
            <Shield size={140} className="absolute -right-8 -bottom-8 opacity-10" />
            <div className="inline-flex bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-5 tracking-wider">
              ACTIVE POLICY
            </div>
            <h2 className="text-2xl font-bold mb-1">{planName}</h2>
            <p className="text-white/80 text-sm mb-6">{OCCUPATION_LABELS[occKey]} Cover</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Policy #</span>
                <span className="font-mono font-medium">MS-2026-00412</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Valid Until</span>
                <span className="font-medium">Jul 8, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Coverage</span>
                <span className="font-medium">Up to KES 500,000</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/20 pt-5">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Next Payment</p>
                <p className="font-semibold">Tomorrow</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Amount</p>
                <p className="font-semibold text-lg">KES 250</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Right */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Protection Status */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Protection Status</p>
                  <p className="text-xl font-bold text-gray-900">100% Covered</p>
                </div>
              </div>
              <Progress value={100} className="h-2 bg-green-100 [&>div]:bg-green-500" />
              <p className="text-xs text-gray-400 mt-2">Your cover renews in 1 day</p>
            </motion.div>

            {/* Claims */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FileText size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Claims History</p>
                  <p className="text-xl font-bold text-gray-900">0 Claims</p>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <Zap size={12} className="fill-emerald-500" />
                  5% no-claim discount on next renewal!
                </p>
              </div>
            </motion.div>

            {/* Payments Total */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Paid (2026)</p>
                  <p className="text-xl font-bold text-gray-900">KES 750</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">3 payments via M-Pesa · All successful</p>
            </motion.div>

            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={20} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Payment Streak</p>
                  <p className="text-xl font-bold text-gray-900">3 Months</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-yellow-400 rounded-full" />
                ))}
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-gray-100 rounded-full" />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1.5">9 more months to Gold status</p>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${action.color} transition-opacity hover:opacity-90`}>
                  <action.icon size={15} />
                  {action.label}
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Payments */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Recent Payments</h2>
              <Link href="#" className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                View All <ArrowRight size={11} />
              </Link>
            </div>
            {mockPayments.map((p, idx) => (
              <div key={p.id} className={`flex justify-between items-center px-6 py-4 ${idx < mockPayments.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-xs">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{p.label}</p>
                    <p className="text-xs text-gray-500">{p.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">KES {p.amount}</p>
                  <Badge variant="success" className="text-[10px] mt-0.5">
                    <CheckCircle2 size={9} className="mr-1" /> Paid
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-emerald-100">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">AI Insights</h2>
            </div>
            <div className="p-4 space-y-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className="bg-white rounded-xl p-3.5 border border-gray-100 text-xs text-gray-600 leading-relaxed">
                  {insight}
                </div>
              ))}
              <Link href="/ai-assistant" className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-semibold pt-1">
                Chat with AI Advisor <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
