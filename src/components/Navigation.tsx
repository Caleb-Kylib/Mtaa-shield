"use client";

import Link from 'next/link';
import { Shield, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Products', href: '/packages' },
  { label: 'Claims', href: '/dashboard' },
  { label: 'About', href: '#' },
];

export default function Navigation() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-xl shrink-0">
          <Shield size={26} className="text-primary" />
          <span>Mtaa Shield</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary">
                <UserIcon size={16} />
                {user.name}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500 hover:text-red-500">
                <LogOut size={16} className="mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-gray-700 font-medium" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="font-semibold px-5 rounded-full" asChild>
                <Link href="/register">Get Covered</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-primary py-2 border-b border-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4">
            {user ? (
              <Button variant="outline" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>
                Sign Out
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Covered</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
