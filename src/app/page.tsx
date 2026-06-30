import Link from 'next/link';
import { Shield, Smartphone, Bot, CreditCard, Leaf, Bike, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 overflow-hidden">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-semibold">
              <Shield size={18} />
              <span>Insurance for the Informal Workforce</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight">
              Insurance as Simple as <span className="text-accent">Buying Airtime.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Protect your farm, business, or hustle with AI-guided microinsurance. Flexible payments via M-Pesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/packages">View Packages</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ai-assistant">Talk to AI Assistant</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
            <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-border">
              <div className="flex items-center gap-4 border-b border-border pb-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Bot size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-lg">Mtaa Assistant</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Online
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-muted p-4 rounded-2xl rounded-tl-none self-start max-w-[85%] text-sm">
                  Jambo! I'm your Mtaa Shield assistant. What do you do for a living? I can recommend the perfect cover.
                </div>
                <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none self-end max-w-[85%] text-sm">
                  I'm a Boda Boda rider in Nairobi.
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-none self-start max-w-[85%] text-sm">
                  Great! Our <strong>Rider Basic</strong> plan covers personal accidents and minor damages for just KSH 100/week. Should we set it up?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Mtaa Shield?</h2>
            <p className="text-lg text-muted-foreground">
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
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tailored For You</h2>
            <p className="text-lg text-muted-foreground">
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
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Protected?</h2>
          <p className="text-xl opacity-90 mb-10">
            Join thousands of workers securing their future with Mtaa Shield. It takes less than 3 minutes.
          </p>
          <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-8" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="inline-flex bg-primary/10 text-primary p-4 rounded-xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-card-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function OccupationCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
  return (
    <Link href={href} className="block bg-card p-10 rounded-2xl shadow-sm border border-border text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
      <div className="inline-flex bg-accent/10 text-accent p-6 rounded-full mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-card-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}
