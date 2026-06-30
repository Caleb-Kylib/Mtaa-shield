import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Mtaa Shield | AI-Powered Microinsurance',
  description: 'Affordable, AI-powered microinsurance for Africa\'s informal workforce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <AuthProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
