import Link from 'next/link';
import { Shield, Smartphone, Bot, CreditCard, Leaf, Bike, Store } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '6rem 0', overflow: 'hidden' }}>
        <div className="container flex flex-col md:flex-row items-center gap-8">
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(246, 153, 39, 0.1)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: '600', marginBottom: '1.5rem' }}>
              <Shield size={18} />
              <span>Insurance for the Informal Workforce</span>
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              Insurance as Simple as <span style={{ color: 'var(--accent)' }}>Buying Airtime.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '90%' }}>
              Protect your farm, business, or hustle with AI-guided microinsurance. Flexible payments via M-Pesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', textAlign: 'center', transition: 'background 0.2s', display: 'inline-block' }}>
                View Packages
              </Link>
              <Link href="/ai-assistant" style={{ backgroundColor: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', textAlign: 'center', transition: 'all 0.2s', display: 'inline-block' }}>
                Talk to AI Assistant
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ width: '100%', paddingBottom: '100%', backgroundColor: 'var(--primary)', borderRadius: '50%', opacity: '0.1', position: 'absolute', top: '10%', right: '-10%', zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Bot size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: 'var(--primary)' }}>Mtaa Assistant</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Online</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', borderRadiusTopLeft: '0', alignSelf: 'flex-start', maxWidth: '85%' }}>
                  Jambo! I'm your Mtaa Shield assistant. What do you do for a living? I can recommend the perfect cover.
                </div>
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', borderRadiusTopRight: '0', alignSelf: 'flex-end', maxWidth: '85%' }}>
                  I'm a Boda Boda rider in Nairobi.
                </div>
                <div style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', borderRadiusTopLeft: '0', alignSelf: 'flex-start', maxWidth: '85%' }}>
                  Great! Our <strong>Rider Basic</strong> plan covers personal accidents and minor damages for just KSH 100/week. Should we set it up?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>Why Choose Mtaa Shield?</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Built specifically for the needs of the informal sector, breaking down traditional barriers to insurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot size={32} />}
              title="AI-Powered Guidance"
              description="Not sure what you need? Our AI assistant explains policies simply and recommends the best fit for your budget."
            />
            <FeatureCard 
              icon={<Smartphone size={32} />}
              title="USSD & SMS Support"
              description="No smartphone? No problem. Manage your policy and claims entirely offline through USSD and SMS."
            />
            <FeatureCard 
              icon={<CreditCard size={32} />}
              title="Flexible Payments"
              description="Pay premiums weekly, monthly, or quarterly directly from your M-Pesa. No bank account required."
            />
          </div>
        </div>
      </section>

      {/* Occupations Section */}
      <section style={{ backgroundColor: 'var(--background)', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>Tailored For You</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Choose your hustle to see curated packages built for your specific risks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OccupationCard 
              icon={<Leaf size={40} />}
              title="Farmers"
              description="Crop cover and farm asset protection against weather risks."
              href="/packages?type=farmer"
            />
            <OccupationCard 
              icon={<Bike size={40} />}
              title="Boda Riders"
              description="Accident cover and motorcycle repair assistance."
              href="/packages?type=boda"
            />
            <OccupationCard 
              icon={<Store size={40} />}
              title="Market Traders"
              description="Stock protection and business interruption cover."
              href="/packages?type=trader"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Ready to Get Protected?</h2>
          <p style={{ fontSize: '1.25rem', opacity: '0.9', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of workers securing their future with Mtaa Shield. It takes less than 3 minutes.
          </p>
          <Link href="/packages" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 2.5rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1.125rem', display: 'inline-block' }}>
            Explore Packages
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'inline-flex', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </div>
  );
}

function OccupationCard({ icon, title, description, href }) {
  return (
    <Link href={href} style={{ display: 'block', backgroundColor: 'white', padding: '2.5rem 2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <div style={{ display: 'inline-flex', backgroundColor: 'rgba(246, 153, 39, 0.1)', color: 'var(--accent)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </Link>
  );
}
