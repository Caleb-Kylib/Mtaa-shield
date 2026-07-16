"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ArrowUpRight, BarChart3, Bell, ChevronDown, CircleDollarSign, ClipboardCheck, FileWarning, LayoutDashboard, LogOut, Menu, MoreHorizontal, Search, Settings, ShieldCheck, Users, X } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard }, { label: "Members", icon: Users },
  { label: "Policies", icon: ShieldCheck }, { label: "Claims", icon: ClipboardCheck, badge: "12" },
  { label: "Payments", icon: CircleDollarSign }, { label: "Reports", icon: BarChart3 },
];
const members = [
  ["MN", "Mwangi Njoroge", "Boda Rider", "Rider Plus", "Active", "KES 250"],
  ["AO", "Akinyi Otieno", "Market Trader", "Biashara Plus", "Active", "KES 400"],
  ["JW", "James Wekesa", "Farmer", "Farm Plus", "Pending", "KES 350"],
  ["FN", "Faith Nduta", "Gig Worker", "Gig Cover", "Active", "KES 300"],
];

function Metric({ label, value, change, icon: Icon, color }: { label: string; value: string; change: string; icon: typeof Users; color: string }) {
  return <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"><div className="flex justify-between"><div><p className="text-sm text-slate-500 font-medium">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p></div><div className={`w-10 h-10 rounded-xl grid place-items-center ${color}`}><Icon size={20} /></div></div><p className="mt-4 text-xs"><span className="font-bold text-emerald-600">{change}</span> <span className="text-slate-400">vs. last month</span></p></div>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Overview");
  useEffect(() => { if (!sessionStorage.getItem("mtaa-admin-session")) router.replace("/admin/login"); }, [router]);
  const logout = () => { sessionStorage.removeItem("mtaa-admin-session"); router.push("/admin/login"); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className={`fixed lg:sticky top-0 z-30 h-screen w-64 shrink-0 bg-slate-950 text-slate-300 p-5 flex flex-col transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="lg:hidden absolute right-4 top-5" onClick={() => setMenuOpen(false)}><X size={20} /></button>
        <Link href="/" className="flex gap-3 items-center text-white font-bold text-lg px-2"><span className="w-9 h-9 bg-emerald-500 rounded-xl grid place-items-center"><ShieldCheck size={20}/></span>Mtaa <span className="text-emerald-400">Shield</span></Link>
        <p className="mt-10 px-3 text-[10px] font-bold tracking-[.15em] uppercase text-slate-500">Management</p>
        <nav className="mt-3 space-y-1">{navItems.map(({ label, icon: Icon, badge }) => <button key={label} onClick={() => { setActive(label); setMenuOpen(false); }} className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${active === label ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/30" : "hover:bg-white/10 hover:text-white"}`}><Icon size={18}/><span>{label}</span>{badge && <span className="ml-auto px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-900 text-[10px] font-bold">{badge}</span>}</button>)}</nav>
        <div className="mt-auto border-t border-white/10 pt-4 space-y-1"><button className="w-full flex items-center gap-3 px-3 py-3 text-sm hover:text-white"><Settings size={18}/>Settings</button><button onClick={logout} className="w-full flex items-center gap-3 px-3 py-3 text-sm hover:text-red-300"><LogOut size={18}/>Sign out</button></div>
      </aside>
      {menuOpen && <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="lg:hidden fixed inset-0 bg-slate-950/50 z-20" />}

      <div className="min-w-0 flex-1">
        <header className="h-20 px-5 md:px-8 bg-white border-b border-slate-200 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3"><button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-slate-600"><Menu /></button><div><h1 className="font-bold text-xl">{active}</h1><p className="hidden sm:block text-xs text-slate-500">Thursday, 16 July 2026</p></div></div>
          <div className="flex items-center gap-3"><div className="hidden md:flex h-10 w-64 items-center gap-2 rounded-xl bg-slate-100 px-3 text-slate-400"><Search size={17}/><input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search members, policies..." /></div><button className="relative p-2.5 rounded-xl hover:bg-slate-100"><Bell size={19}/><span className="absolute right-2 top-2 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-white" /></button><div className="hidden sm:flex items-center gap-2 border-l pl-3"><div className="w-9 h-9 grid place-items-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">JO</div><div className="text-sm"><p className="font-semibold">Joseph Omondi</p><p className="text-xs text-slate-500">Administrator</p></div><ChevronDown size={16} className="text-slate-400"/></div></div>
        </header>
        <main className="p-5 md:p-8 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7"><div><p className="text-sm text-slate-500">Here&apos;s what&apos;s happening across Mtaa Shield today.</p></div><button className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 text-sm font-semibold">+ Create policy</button></div>
          <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><Metric label="Total members" value="24,842" change="+12.5%" icon={Users} color="bg-emerald-100 text-emerald-700"/><Metric label="Active policies" value="18,294" change="+8.2%" icon={ShieldCheck} color="bg-blue-100 text-blue-700"/><Metric label="Premium collected" value="KES 4.86M" change="+14.8%" icon={CircleDollarSign} color="bg-amber-100 text-amber-700"/><Metric label="Open claims" value="126" change="-6.4%" icon={FileWarning} color="bg-rose-100 text-rose-600"/></section>
          <section className="mt-6 grid xl:grid-cols-3 gap-6"><div className="xl:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-6"><div className="flex items-start justify-between"><div><h2 className="font-bold">Premium performance</h2><p className="text-sm text-slate-500 mt-1">Collection across the last 6 months</p></div><select className="text-sm border border-slate-200 rounded-lg py-2 px-3 text-slate-600"><option>Last 6 months</option></select></div><div className="h-60 mt-7 flex items-end gap-3 sm:gap-5 border-b border-l border-slate-100 px-4 pt-3">{[38, 50, 44, 62, 74, 91].map((height, index) => <div className="h-full flex-1 flex flex-col justify-end items-center gap-2" key={height}><div style={{height: `${height}%`}} className={`w-full max-w-12 rounded-t-lg ${index === 5 ? "bg-emerald-500" : "bg-emerald-100"}`} /><span className="text-[10px] text-slate-400">{["Feb","Mar","Apr","May","Jun","Jul"][index]}</span></div>)}</div></div><div className="rounded-2xl bg-slate-950 text-white p-6"><div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold"><Activity size={17}/>Live operations</div><p className="mt-5 text-4xl font-bold">97.8%</p><p className="text-slate-400 text-sm mt-1">Platform health score</p><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between"><span className="text-slate-400">Payments processed</span><b>1,248</b></div><div className="flex justify-between"><span className="text-slate-400">Claims reviewed</span><b>38</b></div><div className="flex justify-between"><span className="text-slate-400">New members</span><b>184</b></div></div><button className="mt-7 w-full border border-white/20 rounded-xl py-2.5 text-sm font-semibold hover:bg-white/10">View live activity</button></div></section>
          <section className="mt-6 grid xl:grid-cols-3 gap-6"><div className="xl:col-span-2 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm"><div className="p-6 flex items-center justify-between"><div><h2 className="font-bold">Recent members</h2><p className="text-sm text-slate-500 mt-1">Latest policy activity</p></div><button className="text-sm text-emerald-700 font-bold">View all</button></div><div className="overflow-x-auto"><table className="w-full text-sm min-w-[650px]"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="font-semibold px-6 py-3">Member</th><th className="font-semibold px-4 py-3">Policy</th><th className="font-semibold px-4 py-3">Status</th><th className="font-semibold px-4 py-3">Premium</th><th className="px-4" /></tr></thead><tbody>{members.map(([initials, name, job, plan, status, premium]) => <tr key={name} className="border-t border-slate-100"><td className="px-6 py-4"><div className="flex items-center gap-3"><span className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 grid place-items-center text-xs font-bold">{initials}</span><div><p className="font-semibold">{name}</p><p className="text-xs text-slate-500">{job}</p></div></div></td><td className="px-4 py-4 text-slate-600">{plan}</td><td className="px-4 py-4"><span className={`text-xs font-bold px-2 py-1 rounded-full ${status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{status}</span></td><td className="px-4 py-4 font-medium">{premium}</td><td className="px-4 py-4"><MoreHorizontal size={18} className="text-slate-400"/></td></tr>)}</tbody></table></div></div><div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6"><div className="flex justify-between"><h2 className="font-bold">Claims queue</h2><span className="text-xs bg-rose-50 text-rose-600 font-bold px-2 py-1 rounded-full">12 waiting</span></div><div className="mt-5 space-y-4">{[["CLM-2048", "Accident cover", "High", "bg-rose-500"], ["CLM-2047", "Hospital cash", "Medium", "bg-amber-500"], ["CLM-2046", "Theft cover", "Low", "bg-emerald-500"]].map(([id, title, urgency, dotClass]) => <button className="w-full text-left flex gap-3 border-b border-slate-100 pb-4 last:border-0" key={id}><span className={`mt-1.5 w-2 h-2 rounded-full ${dotClass}`} /><div className="flex-1"><p className="font-semibold text-sm">{id}</p><p className="text-xs text-slate-500">{title}</p></div><span className="text-xs text-slate-500">{urgency}</span></button>)}</div><button className="mt-5 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-semibold hover:bg-slate-200">Review claims <ArrowUpRight size={15} className="inline ml-1"/></button></div></section>
        </main>
      </div>
    </div>
  );
}
