import React from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Section (Visual) - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        {/* Emerald gradient overlay simulated with background color and decorative circles */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#053b28] opacity-90 z-10" />
        
        {/* Placeholder for an actual illustration image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595861964344-996be4b46c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-30 z-0" />
        
        <div className="relative z-20 flex flex-col justify-between h-full w-full p-12 text-white">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <Shield size={32} className="text-accent" />
              <span>Mtaa Shield</span>
            </Link>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Protecting<br />
              <span className="text-accent">Every Hustle.</span>
            </h1>
            <p className="text-lg opacity-90 mb-12">
              Affordable microinsurance powered by AI, designed specifically for Africa's informal workforce.
            </p>
            
            <div className="flex gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                AI Powered
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                Weekly Premiums
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                M-Pesa Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
        <div className="w-full max-w-[480px]">
          {/* Mobile Header (only visible on small screens) */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Shield size={32} className="text-primary" />
            <span className="text-2xl font-bold text-primary">Mtaa Shield</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
