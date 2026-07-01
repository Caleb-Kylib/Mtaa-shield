import Link from "next/link";
import { Shield, Phone, Mail, MessageCircle, Hash } from "lucide-react";
import { APP_NAME, APP_TAGLINE, USSD_CODE, SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/constants";

const productLinks = [
  { label: "Farmers Cover", href: "/packages?occ=farmer" },
  { label: "Boda Riders Cover", href: "/packages?occ=boda-rider" },
  { label: "Market Traders Cover", href: "/packages?occ=market-trader" },
  { label: "Construction Workers", href: "/packages?occ=construction-worker" },
  { label: "Gig Workers Cover", href: "/packages?occ=gig-worker" },
  { label: "Small Business Cover", href: "/packages?occ=small-business" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Claims", href: "/claims" },
  { label: "AI Advisor", href: "/ai-assistant" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "IRA Disclosure", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Grid */}
      <div className="container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Col */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-white mb-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span>{APP_NAME}</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
            {APP_TAGLINE}. AI-powered microinsurance built for every hustle in Africa.
          </p>

          {/* Contact */}
          <div className="space-y-2.5 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle size={15} />
              WhatsApp Support
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Mail size={15} />
              {SUPPORT_EMAIL}
            </a>
            <span className="flex items-center gap-2 text-gray-400">
              <Hash size={15} />
              USSD: {USSD_CODE}
            </span>
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
            Products
          </h4>
          <ul className="space-y-2.5 text-sm">
            {productLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
            Legal
          </h4>
          <ul className="space-y-2.5 text-sm">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Trust Badges */}
          <div className="mt-8 space-y-2">
            {["IRA Registered", "M-Pesa Partner"].map((badge) => (
              <div
                key={badge}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full mr-2"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="font-medium tracking-widest text-gray-400 uppercase text-[10px]">
            {APP_TAGLINE}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
