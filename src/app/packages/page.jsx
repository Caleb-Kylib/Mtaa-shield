'use client';
import { useState } from 'react';
import { Check, Shield, Leaf, Bike, Store } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('boda');
  const [paymentFreq, setPaymentFreq] = useState('week'); // week, month, quarter

  const calculatePrice = (basePrice, freq) => {
    const num = parseInt(basePrice.replace('KSH ', ''));
    if (freq === 'month') return `KSH ${num * 4 * 0.95}`; // 5% discount
    if (freq === 'quarter') return `KSH ${num * 12 * 0.90}`; // 10% discount
    return basePrice;
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <div className="page-header" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Find Your Perfect Plan</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Affordable packages tailored to your daily hustle. Pay easily with M-Pesa.
        </p>
      </div>

      <div className="container" style={{ marginTop: '-2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <TabButton active={activeTab === 'farmer'} onClick={() => setActiveTab('farmer')} icon={<Leaf size={18} />} label="Farmers" />
          <TabButton active={activeTab === 'boda'} onClick={() => setActiveTab('boda')} icon={<Bike size={18} />} label="Boda Riders" />
          <TabButton active={activeTab === 'trader'} onClick={() => setActiveTab('trader')} icon={<Store size={18} />} label="Market Traders" />
        </div>

        {/* Payment Frequency Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'white', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', padding: '0.25rem' }}>
            <FreqButton active={paymentFreq === 'week'} onClick={() => setPaymentFreq('week')} label="Weekly" />
            <FreqButton active={paymentFreq === 'month'} onClick={() => setPaymentFreq('month')} label="Monthly (Save 5%)" />
            <FreqButton active={paymentFreq === 'quarter'} onClick={() => setPaymentFreq('quarter')} label="Quarterly (Save 10%)" />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {plans[activeTab].map((plan, idx) => (
            <div key={idx} style={{ 
              backgroundColor: 'white', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2.5rem 2rem', 
              border: plan.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
              boxShadow: plan.popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
              position: 'relative'
            }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Most Popular
                </div>
              )}
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{calculatePrice(plan.price, paymentFreq)}</span>
                <span style={{ color: 'var(--text-secondary)' }}>/{paymentFreq}</span>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', padding: '0.25rem', marginTop: '0.125rem' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)', 
                fontWeight: '600', 
                fontSize: '1rem',
                backgroundColor: plan.popular ? 'var(--primary)' : 'white',
                color: plan.popular ? 'white' : 'var(--primary)',
                border: plan.popular ? 'none' : '1px solid var(--primary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Buy with M-Pesa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        backgroundColor: active ? 'white' : 'transparent',
        color: active ? 'var(--primary)' : 'rgba(255,255,255,0.8)',
        border: 'none',
        boxShadow: active ? 'var(--shadow-md)' : 'none',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FreqButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1.25rem',
        borderRadius: 'var(--radius-full)',
        fontWeight: '600',
        fontSize: '0.875rem',
        backgroundColor: active ? 'var(--primary-light)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-secondary)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {label}
    </button>
  );
}
