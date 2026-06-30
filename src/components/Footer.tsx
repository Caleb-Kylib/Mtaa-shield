import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <Shield size={28} className="text-accent" />
            <span>Mtaa Shield</span>
          </Link>
          <p className="opacity-80 text-sm leading-relaxed">
            AI-powered microinsurance for Africa's informal workforce. Simple, affordable, and accessible.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-5">Products</h4>
          <ul className="space-y-3 opacity-80 text-sm">
            <li><Link href="/packages?type=farmer" className="hover:text-accent transition-colors">Farmers Cover</Link></li>
            <li><Link href="/packages?type=boda" className="hover:text-accent transition-colors">Boda Boda Cover</Link></li>
            <li><Link href="/packages?type=trader" className="hover:text-accent transition-colors">Market Traders Cover</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-5">Company</h4>
          <ul className="space-y-3 opacity-80 text-sm">
            <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Claims</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-5">Legal</h4>
          <ul className="space-y-3 opacity-80 text-sm">
            <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-70 text-sm">
        <p>&copy; {new Date().getFullYear()} Mtaa Shield. All rights reserved.</p>
        <p className="font-medium tracking-wide">Built for the Hustle.</p>
      </div>
    </footer>
  );
}
