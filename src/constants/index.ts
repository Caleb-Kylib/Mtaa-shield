import type { OccupationType } from '@/types';

export const APP_NAME = 'Mtaa Shield';
export const APP_TAGLINE = 'Protecting Every Hustle';
export const APP_DESCRIPTION =
  'AI-powered microinsurance for Africa\'s informal workforce. Simple, affordable, and accessible.';

export const USSD_CODE = '*384*10#';
export const WHATSAPP_NUMBER = '+254712345678';
export const SUPPORT_EMAIL = 'support@mtaashield.co.ke';

export const OCCUPATION_LABELS: Record<OccupationType, string> = {
  farmer: 'Farmer',
  'boda-rider': 'Boda Rider',
  'market-trader': 'Market Trader',
  'construction-worker': 'Construction Worker',
  'gig-worker': 'Gig Worker',
  'small-business': 'Small Business Owner',
};

export const OCCUPATION_EMOJIS: Record<OccupationType, string> = {
  farmer: '🌾',
  'boda-rider': '🏍️',
  'market-trader': '🛒',
  'construction-worker': '👷',
  'gig-worker': '💼',
  'small-business': '🏪',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Insurance Plans', href: '/packages' },
  { label: 'AI Advisor', href: '/ai-assistant' },
  { label: 'Claims', href: '/claims' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
];

export const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nyeri', 'Meru',
  'Thika', 'Malindi', 'Kitale', 'Machakos', 'Kakamega', 'Kisii', 'Kericho',
  'Kilifi', 'Bungoma', 'Uasin Gishu', 'Meru', 'Embu', 'Muranga',
  'Kiambu', 'Kwale', 'Taita Taveta', 'Garissa', 'Wajir', 'Mandera',
  'Marsabit', 'Isiolo', 'Samburu', 'Trans Nzoia', 'West Pokot', 'Siaya',
  'Homa Bay', 'Migori', 'Nandi', 'Baringo', 'Laikipia', 'Nyahururu',
  'Bomet', 'Narok', 'Kajiado', 'Makueni', 'Nyandarua', 'Kirinyaga',
  'Tharaka Nithi', 'Kitui', 'Vihiga', 'Busia', 'Tana River', 'Lamu',
  'Murang\'a', 'Nyamira', 'Turkana'
];

export const TRUST_BADGES = [
  'IRA Registered',
  'M-Pesa Partner',
  'USSD Ready',
  'SSL Secured',
  '48-Hour Claims',
];

export const HOW_IT_WORKS_STEPS = [
  { num: '01', title: 'Choose Your Hustle', desc: 'Tell us how you earn your income' },
  { num: '02', title: 'Answer 3 Questions', desc: 'Income, location, and budget' },
  { num: '03', title: 'AI Recommends a Plan', desc: 'Personalised for you in seconds' },
  { num: '04', title: 'Pay with M-Pesa', desc: 'From KES 50 per week' },
  { num: '05', title: 'Receive Your Policy', desc: 'Instant digital certificate' },
  { num: '06', title: 'Stay Protected', desc: 'Claims processed in 48 hours' },
];
