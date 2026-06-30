import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navigation() {
  return (
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '1.25rem' }}>
          <Shield size={28} />
          <span>Mtaa Shield</span>
        </Link>
        
        <nav style={{ display: 'none', md: 'flex', gap: '2rem', alignItems: 'center' }} className="md-flex-nav">
          <Link href="/packages" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Packages</Link>
          <Link href="/ai-assistant" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>AI Assistant</Link>
          <Link href="/dashboard" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Dashboard</Link>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: '500', fontSize: '0.875rem' }}>
            My Account
          </Link>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .md-flex-nav { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
