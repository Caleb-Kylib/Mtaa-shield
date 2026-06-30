import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8" style={{ marginBottom: '3rem' }}>
        <div style={{ gridColumn: 'span 1' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.25rem', marginBottom: '1rem' }}>
            <Shield size={28} color="var(--accent)" />
            <span>Mtaa Shield</span>
          </Link>
          <p style={{ opacity: 0.8, fontSize: '0.875rem', lineHeight: '1.6' }}>
            AI-powered microinsurance for Africa's informal workforce. Simple, affordable, and accessible.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.25rem', fontSize: '1rem' }}>Products</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.875rem', listStyle: 'none' }}>
            <li><Link href="/packages?type=farmer">Farmers Cover</Link></li>
            <li><Link href="/packages?type=boda">Boda Boda Cover</Link></li>
            <li><Link href="/packages?type=trader">Market Traders Cover</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.25rem', fontSize: '1rem' }}>Company</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.875rem', listStyle: 'none' }}>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Claims</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.25rem', fontSize: '1rem' }}>Legal</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.875rem', listStyle: 'none' }}>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7, fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} Mtaa Shield. All rights reserved.</p>
        <p>Built for the Hustle.</p>
      </div>
    </footer>
  );
}
