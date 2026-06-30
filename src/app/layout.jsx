import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mtaa Shield | AI-Powered Microinsurance',
  description: 'Affordable, AI-powered microinsurance for Africa\'s informal workforce.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col" style={{ minHeight: '100vh' }}>
          <Navigation />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
