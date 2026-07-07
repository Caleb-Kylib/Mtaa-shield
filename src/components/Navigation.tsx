"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, LogOut, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/constants";
import { notificationsService } from "@/services/notifications.service";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Poll notifications when user is logged in
  useEffect(() => {
    if (!user) { setUnreadCount(0); return; }
    const load = () =>
      notificationsService.list()
        .then((r) => setUnreadCount(r.unreadCount))
        .catch(() => {/* silent */});
    load();
    const interval = setInterval(load, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, [user]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-xl shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <span className="hidden sm:block">Mtaa Shield</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {/* Notifications bell */}
              <Link
                href="/dashboard"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} className="text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              {/* User avatar + name */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary px-3 py-2 rounded-md hover:bg-primary/5 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50"
              >
                <LogOut size={15} className="mr-1.5" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="font-medium" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="font-semibold px-5 rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm"
                asChild
              >
                <Link href="/register">Get Covered</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-between"
                >
                  <span>Dashboard</span>
                  {unreadCount > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 mt-2">
                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => { logout(); setMobileOpen(false); }}
                  >
                    <LogOut size={15} className="mr-1.5" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                    </Button>
                    <Button size="sm" className="w-full font-semibold" asChild>
                      <Link href="/register" onClick={() => setMobileOpen(false)}>Get Covered</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
