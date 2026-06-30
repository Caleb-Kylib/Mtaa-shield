"use client";

import Link from 'next/link';
import { Shield, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Shield size={28} />
          <span>Mtaa Shield</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/packages" className="font-medium text-muted-foreground hover:text-foreground transition-colors">Packages</Link>
          <Link href="/ai-assistant" className="font-medium text-muted-foreground hover:text-foreground transition-colors">AI Assistant</Link>
          {user && (
            <Link href="/dashboard" className="font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          )}
        </nav>
        
        <div className="flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary">
                <UserIcon size={18} />
                {user.name}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
                <LogOut size={18} className="mr-2 sm:hidden" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
