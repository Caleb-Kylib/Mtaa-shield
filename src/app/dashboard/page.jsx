import { Shield, AlertCircle, FileText, ChevronRight, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 4rem)', padding: '2rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Welcome back, Kamau</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Here's the status of your Mtaa Shield protection.</p>
          </div>
          <button style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            File a Claim
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Active Policy */}
          <div style={{ gridColumn: 'span 1', backgroundColor: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <Shield size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }} />
            <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              ACTIVE POLICY
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Rider Plus</h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Boda Boda Cover</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Next Payment</p>
                <p style={{ fontWeight: '600' }}>Tomorrow</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Amount</p>
                <p style={{ fontWeight: '600' }}>KSH 250</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.75rem', borderRadius: '50%' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Protection Status</h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>100% Covered</p>
                </div>
              </div>
              <div style={{ backgroundColor: 'var(--background)', width: '100%', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--success)', width: '100%', height: '100%' }}></div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(246, 153, 39, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '50%' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Claims History</h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>0 Claims</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>You're eligible for a 5% no-claim discount next quarter!</p>
            </div>
          </div>

        </div>

        {/* Recent Transactions */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>Recent Payments</h2>
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {[1, 2, 3].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: idx !== 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--background)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  M
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>M-Pesa Auto-Renew</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Jun {24 - (idx * 7)}, 2026</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>- KSH 250</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>Successful</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
