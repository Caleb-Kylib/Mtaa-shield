"use client";

import { Shield, AlertCircle, FileText, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/login');
    }
  }, [isLoading, token, router]);

  if (isLoading || !token) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-muted/30 min-h-screen py-12 pb-24">
      <div className="container max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back, {user?.name || 'User'}</h1>
            <p className="text-muted-foreground">Here's the status of your Mtaa Shield protection.</p>
          </div>
          <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
            <AlertCircle size={18} />
            File a Claim
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Active Policy */}
          <div className="lg:col-span-1 bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden shadow-md">
            <Shield size={160} className="absolute -right-10 -bottom-10 opacity-10" />
            <div className="inline-flex bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wide">
              ACTIVE POLICY
            </div>
            <h2 className="text-2xl font-bold mb-1">{user?.occupation === 'Farmer' ? 'Farm Plus' : user?.occupation === 'Market Trader' ? 'Business Plus' : 'Rider Plus'}</h2>
            <p className="opacity-90 mb-10">{user?.occupation || 'Boda Boda'} Cover</p>
            
            <div className="flex justify-between items-center border-t border-white/20 pt-6">
              <div>
                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">Next Payment</p>
                <p className="font-semibold text-lg">Tomorrow</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">Amount</p>
                <p className="font-semibold text-lg">KSH 250</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Protection Status</h3>
                  <p className="text-2xl font-bold text-foreground">100% Covered</p>
                </div>
              </div>
              <div className="bg-muted w-full h-2.5 rounded-full overflow-hidden">
                <div className="bg-green-500 w-full h-full rounded-full" />
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-accent/10 text-accent p-3 rounded-full">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Claims History</h3>
                  <p className="text-2xl font-bold text-foreground">0 Claims</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">You're eligible for a 5% no-claim discount next quarter!</p>
            </div>
          </div>

        </div>

        {/* Recent Transactions */}
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Payments</h2>
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          {[1, 2, 3].map((item, idx) => (
            <div key={idx} className={`flex justify-between items-center p-6 ${idx !== 2 ? 'border-b border-border' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground">
                  M
                </div>
                <div>
                  <p className="font-bold text-foreground">M-Pesa Auto-Renew</p>
                  <p className="text-sm text-muted-foreground">Jun {24 - (idx * 7)}, 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">- KSH 250</p>
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Successful</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
