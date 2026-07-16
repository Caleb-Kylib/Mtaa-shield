"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) return setError("Enter your work email and password.");
    sessionStorage.setItem("mtaa-admin-session", "active");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white grid lg:grid-cols-2">
      <section className="hidden lg:flex relative overflow-hidden p-14 flex-col justify-between bg-emerald-700">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 15% 15%, #fbbf24 0, transparent 25%), radial-gradient(circle at 85% 75%, #34d399 0, transparent 28%)" }} />
        <Link href="/" className="relative flex items-center gap-3 font-bold text-xl"><span className="w-10 h-10 rounded-xl bg-white/15 grid place-items-center"><ShieldCheck size={23} /></span>Mtaa Shield</Link>
        <div className="relative max-w-md">
          <p className="text-amber-300 font-semibold text-sm tracking-wide uppercase mb-4">Operations centre</p>
          <h1 className="text-5xl font-bold tracking-tight leading-tight">Protection, managed with confidence.</h1>
          <p className="mt-6 text-emerald-50/85 text-lg leading-relaxed">Monitor policies, resolve claims and keep every member covered from one secure workspace.</p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-sm"><div><p className="text-2xl font-bold">24.8k</p><p className="text-emerald-100">Members</p></div><div><p className="text-2xl font-bold">98.4%</p><p className="text-emerald-100">Paid claims</p></div><div><p className="text-2xl font-bold">4.9/5</p><p className="text-emerald-100">Member rating</p></div></div>
        </div>
        <p className="relative text-xs text-emerald-100">© 2026 Mtaa Shield. Internal access only.</p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden text-emerald-700 font-bold flex items-center gap-2 mb-12"><ShieldCheck /> Mtaa Shield</Link>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 grid place-items-center mb-7"><LockKeyhole size={23} /></div>
          <p className="text-emerald-700 text-sm font-bold uppercase tracking-wider">Admin portal</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-slate-500">Sign in with your Mtaa Shield work account.</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            {error && <p className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600">{error}</p>}
            <label className="block text-sm font-semibold text-slate-700">Work email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@mtaashield.co.ke" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" /></label>
            <label className="block text-sm font-semibold text-slate-700">Password<div className="relative mt-2"><input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-slate-400">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
            <div className="flex justify-between text-sm"><label className="flex gap-2 text-slate-600"><input type="checkbox" className="accent-emerald-600" /> Keep me signed in</label><button type="button" className="font-semibold text-emerald-700">Forgot password?</button></div>
            <button className="h-12 w-full rounded-xl bg-emerald-700 text-white font-bold flex justify-center items-center gap-2 hover:bg-emerald-800 transition-colors">Sign in to dashboard <ArrowRight size={18} /></button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">Need access? <a href="mailto:security@mtaashield.co.ke" className="font-semibold text-emerald-700">Contact an administrator</a></p>
        </div>
      </section>
    </div>
  );
}
