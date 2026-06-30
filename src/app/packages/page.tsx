"use client";

import { useState } from 'react';
import { Check, Leaf, Bike, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type TabType = 'farmer' | 'boda' | 'trader';
type FreqType = 'week' | 'month' | 'quarter';

const plans = {
  farmer: [
    { name: 'Essential Crop Cover', price: 'KSH 50', period: 'week', features: ['Drought protection', 'Excess rainfall cover', 'AI farming tips'], popular: false },
    { name: 'Farm Plus Cover', price: 'KSH 150', period: 'week', features: ['All Essential features', 'Livestock accident cover', 'Equipment damage', 'Priority claims'], popular: true }
  ],
  boda: [
    { name: 'Rider Basic', price: 'KSH 100', period: 'week', features: ['Personal accident cover', 'Minor scratch repairs', 'Towing assistance'], popular: false },
    { name: 'Rider Plus', price: 'KSH 250', period: 'week', features: ['All Basic features', 'Theft protection', 'Third-party liability', 'Income replacement (up to 7 days)'], popular: true }
  ],
  trader: [
    { name: 'Business Basic', price: 'KSH 75', period: 'week', features: ['Fire and theft (up to 50k)', 'Market eviction legal help'], popular: false },
    { name: 'Business Plus', price: 'KSH 200', period: 'week', features: ['All Basic features', 'Stock spoilage cover', 'Business interruption', 'Health emergency cash'], popular: true }
  ]
};

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('boda');
  const [paymentFreq, setPaymentFreq] = useState<FreqType>('week');
  const { token } = useAuth();
  const router = useRouter();

  const calculatePrice = (basePrice: string, freq: FreqType) => {
    const num = parseInt(basePrice.replace('KSH ', ''));
    if (freq === 'month') return `KSH ${Math.round(num * 4 * 0.95)}`; 
    if (freq === 'quarter') return `KSH ${Math.round(num * 12 * 0.90)}`;
    return basePrice;
  };

  const handlePurchase = () => {
    if (!token) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Plan</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Affordable packages tailored to your daily hustle. Pay easily with M-Pesa.
        </p>
      </div>

      <div className="container -mt-8 relative z-10">
        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <TabButton active={activeTab === 'farmer'} onClick={() => setActiveTab('farmer')} icon={<Leaf size={18} />} label="Farmers" />
          <TabButton active={activeTab === 'boda'} onClick={() => setActiveTab('boda')} icon={<Bike size={18} />} label="Boda Riders" />
          <TabButton active={activeTab === 'trader'} onClick={() => setActiveTab('trader')} icon={<Store size={18} />} label="Market Traders" />
        </div>

        {/* Payment Frequency Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card rounded-full border border-border p-1 shadow-sm">
            <FreqButton active={paymentFreq === 'week'} onClick={() => setPaymentFreq('week')} label="Weekly" />
            <FreqButton active={paymentFreq === 'month'} onClick={() => setPaymentFreq('month')} label="Monthly (-5%)" />
            <FreqButton active={paymentFreq === 'quarter'} onClick={() => setPaymentFreq('quarter')} label="Quarterly (-10%)" />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans[activeTab].map((plan, idx) => (
            <div key={idx} className={`bg-card rounded-2xl p-8 relative flex flex-col ${plan.popular ? 'border-2 border-primary shadow-xl scale-105 z-10' : 'border border-border shadow-sm mt-4 mb-4'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-card-foreground mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-primary">{calculatePrice(plan.price, paymentFreq)}</span>
                <span className="text-muted-foreground font-medium">/{paymentFreq}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5 shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handlePurchase}
                size="lg" 
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full font-bold text-md h-12"
              >
                Buy with M-Pesa
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${active ? 'bg-card text-primary shadow-md' : 'bg-primary/80 text-primary-foreground hover:bg-primary'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FreqButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
    </button>
  );
}
