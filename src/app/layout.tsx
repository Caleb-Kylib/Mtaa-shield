import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AdminChrome from "@/components/AdminChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mtaa Shield | AI-Powered Microinsurance",
  description:
    "Affordable AI-powered microinsurance for Africa's informal workforce. Farmers, boda riders, market traders, gig workers and more. Pay with M-Pesa.",
  keywords: ["microinsurance", "Kenya", "M-Pesa", "boda rider insurance", "farmer insurance", "AI insurance"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <AuthProvider>
          <AdminChrome>{children}</AdminChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
