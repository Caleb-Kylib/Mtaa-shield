import type { InsurancePackage } from '@/types';

export const insurancePackages: InsurancePackage[] = [
  // ── Farmers ────────────────────────────────────────────────────────────────
  {
    id: 'farm-essential',
    name: 'Farm Essential',
    occupation: 'farmer',
    tier: 'basic',
    tagline: 'Core protection for every smallholder',
    weeklyPrice: 50,
    monthlyPrice: 190,
    quarterlyPrice: 540,
    coverageAmount: 'Up to KES 50,000',
    features: [
      'Crop protection',
      'Weather-related losses',
      'Personal accident',
    ],
    popular: false,
    color: 'emerald',
  },
  {
    id: 'farm-plus',
    name: 'Farm Plus',
    occupation: 'farmer',
    tier: 'plus',
    tagline: 'Complete farm protection with income cover',
    weeklyPrice: 150,
    monthlyPrice: 570,
    quarterlyPrice: 1620,
    coverageAmount: 'Up to KES 200,000',
    features: [
      'Crop protection',
      'Livestock protection',
      'Farm equipment',
      'Hospital cash benefit',
    ],
    popular: true,
    color: 'emerald',
  },

  // ── Boda Riders ────────────────────────────────────────────────────────────
  {
    id: 'rider-basic',
    name: 'Rider Basic',
    occupation: 'boda-rider',
    tier: 'basic',
    tagline: 'Essential road protection for daily riders',
    weeklyPrice: 100,
    monthlyPrice: 380,
    quarterlyPrice: 1080,
    coverageAmount: 'Up to KES 100,000',
    features: [
      'Personal accident',
      'Medical expenses',
    ],
    popular: false,
    color: 'blue',
  },
  {
    id: 'rider-plus',
    name: 'Rider Plus',
    occupation: 'boda-rider',
    tier: 'plus',
    tagline: 'Full protection for you, your bike, and passengers',
    weeklyPrice: 250,
    monthlyPrice: 950,
    quarterlyPrice: 2700,
    coverageAmount: 'Up to KES 500,000',
    features: [
      'Personal accident',
      'Motorcycle theft',
      'Third-party liability',
      'Funeral benefit',
    ],
    popular: true,
    color: 'blue',
  },

  // ── Market Traders ─────────────────────────────────────────────────────────
  {
    id: 'biashara-basic',
    name: 'Biashara Basic',
    occupation: 'market-trader',
    tier: 'basic',
    tagline: 'Protect your stock and stall from day one',
    weeklyPrice: 75,
    monthlyPrice: 285,
    quarterlyPrice: 810,
    coverageAmount: 'Up to KES 50,000',
    features: [
      'Stock protection',
      'Fire',
      'Theft',
    ],
    popular: false,
    color: 'orange',
  },
  {
    id: 'biashara-plus',
    name: 'Biashara Plus',
    occupation: 'market-trader',
    tier: 'plus',
    tagline: 'Full business protection for growing traders',
    weeklyPrice: 200,
    monthlyPrice: 760,
    quarterlyPrice: 2160,
    coverageAmount: 'Up to KES 300,000',
    features: [
      'Stock protection',
      'Business interruption',
      'Personal accident',
      'Hospital cash',
    ],
    popular: true,
    color: 'orange',
  },

  // ── Small Vendors ──────────────────────────────────────────────────────────
  {
    id: 'vendor-basic',
    name: 'Vendor Basic',
    occupation: 'vendor',
    tier: 'basic',
    tagline: 'Essential cover for your small shop',
    weeklyPrice: 60,
    monthlyPrice: 228,
    quarterlyPrice: 648,
    coverageAmount: 'Up to KES 80,000',
    features: [
      'Stock protection',
      'Theft',
      'Fire',
    ],
    popular: false,
    color: 'rose',
  },
  {
    id: 'vendor-plus',
    name: 'Vendor Plus',
    occupation: 'vendor',
    tier: 'plus',
    tagline: 'Complete protection for your kiosk',
    weeklyPrice: 160,
    monthlyPrice: 608,
    quarterlyPrice: 1728,
    coverageAmount: 'Up to KES 250,000',
    features: [
      'Stock protection',
      'Business interruption',
      'Personal accident',
      'Hospital cash',
    ],
    popular: true,
    color: 'rose',
  },

  // ── Construction Workers ───────────────────────────────────────────────────
  {
    id: 'fundi-basic',
    name: 'Fundi Basic',
    occupation: 'construction-worker',
    tier: 'basic',
    tagline: 'Stay protected on every job site',
    weeklyPrice: 80,
    monthlyPrice: 304,
    quarterlyPrice: 864,
    coverageAmount: 'Up to KES 100,000',
    features: [
      'Personal accident',
      'Medical expenses',
    ],
    popular: false,
    color: 'yellow',
  },
  {
    id: 'fundi-plus',
    name: 'Fundi Plus',
    occupation: 'construction-worker',
    tier: 'plus',
    tagline: 'Comprehensive cover for serious fundis',
    weeklyPrice: 180,
    monthlyPrice: 684,
    quarterlyPrice: 1944,
    coverageAmount: 'Up to KES 300,000',
    features: [
      'Permanent disability',
      'Hospital cash',
      'Funeral benefit',
      'Personal accident',
    ],
    popular: true,
    color: 'yellow',
  },

  // ── Gig Workers ────────────────────────────────────────────────────────────
  {
    id: 'gig-basic',
    name: 'Gig Basic',
    occupation: 'gig-worker',
    tier: 'basic',
    tagline: 'Device and income cover for freelancers',
    weeklyPrice: 60,
    monthlyPrice: 228,
    quarterlyPrice: 648,
    coverageAmount: 'Up to KES 80,000',
    features: [
      'Personal accident',
      'Income protection during temporary disability',
    ],
    popular: false,
    color: 'purple',
  },
  {
    id: 'gig-plus',
    name: 'Gig Plus',
    occupation: 'gig-worker',
    tier: 'plus',
    tagline: 'Full freelancer protection for digital workers',
    weeklyPrice: 160,
    monthlyPrice: 608,
    quarterlyPrice: 1728,
    coverageAmount: 'Up to KES 250,000',
    features: [
      'Personal accident',
      'Income protection',
      'Hospital cash',
      'Device protection',
    ],
    popular: true,
    color: 'purple',
  },
];

export const getPackagesByOccupation = (occupation: string) =>
  insurancePackages.filter((p) => p.occupation === occupation);

export const getPackageById = (id: string) =>
  insurancePackages.find((p) => p.id === id);

export const calculatePrice = (
  pkg: InsurancePackage,
  frequency: 'weekly' | 'monthly' | 'quarterly'
): number => {
  if (frequency === 'monthly') return pkg.monthlyPrice;
  if (frequency === 'quarterly') return pkg.quarterlyPrice;
  return pkg.weeklyPrice;
};
