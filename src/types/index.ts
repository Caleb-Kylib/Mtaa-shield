// ── Auth Types ────────────────────────────────────────────────────────────────
export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  county?: string;
  occupation?: OccupationType;
  avatar?: string;
  plan?: string;
  policyNumber?: string;
  joinedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// ── Occupation Types ──────────────────────────────────────────────────────────
export type OccupationType =
  | 'farmer'
  | 'boda-rider'
  | 'market-trader'
  | 'construction-worker'
  | 'gig-worker'
  | 'small-business';

// ── Insurance Types ───────────────────────────────────────────────────────────
export type PaymentFrequency = 'weekly' | 'monthly' | 'quarterly';

export interface PricingTier {
  weekly: number;
  monthly: number;
  quarterly: number;
}

export interface InsurancePackage {
  id: string;
  name: string;
  occupation: OccupationType;
  tier: 'basic' | 'plus';
  tagline: string;
  weeklyPrice: number;
  monthlyPrice: number;
  quarterlyPrice: number;
  features: string[];
  coverageAmount: string;
  popular?: boolean;
  color: string;
}

export interface OccupationCard {
  id: OccupationType;
  label: string;
  emoji: string;
  description: string;
  startingFrom: number;
  image: string;
  color: string;
  bgColor: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  weeklyPrice: number;
  icon: string;
}

// ── Claims Types ──────────────────────────────────────────────────────────────
export interface ClaimType {
  id: string;
  label: string;
  occupation: OccupationType;
  description: string;
}

// ── AI Types ──────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// ── Dashboard Types ───────────────────────────────────────────────────────────
export interface PolicySummary {
  name: string;
  status: 'active' | 'expired' | 'pending';
  nextPayment: string;
  amount: number;
  coverageEnd: string;
  policyNumber: string;
}

export interface PaymentRecord {
  id: string;
  method: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}

// ── Wizard Types ──────────────────────────────────────────────────────────────
export interface WizardState {
  occupation: OccupationType | null;
  incomeFrequency: 'daily' | 'weekly' | 'monthly' | null;
  county: string;
  monthlyBudget: number | null;
  addOns: string[];
  recommendedPackage: InsurancePackage | null;
  confidenceScore: number;
}
