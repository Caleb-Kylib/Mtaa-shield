"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingAIButton from "@/components/shared/FloatingAIButton";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <main className="min-h-screen">{children}</main>;

  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingAIButton />
    </>
  );
}
