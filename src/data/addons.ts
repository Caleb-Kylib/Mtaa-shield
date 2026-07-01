import type { AddOn } from '@/types';

export const addOns: AddOn[] = [
  {
    id: 'hospital-cash',
    name: 'Hospital Cash',
    description: 'Receive KES 500/day for every day you spend in hospital.',
    weeklyPrice: 30,
    icon: '🏥',
  },
  {
    id: 'funeral-benefit',
    name: 'Funeral Benefit',
    description: 'KES 50,000 paid to your family within 24 hours of a death.',
    weeklyPrice: 20,
    icon: '🕊️',
  },
  {
    id: 'income-protection',
    name: 'Income Protection',
    description: 'Replace up to 70% of your income if you cannot work for 7+ days.',
    weeklyPrice: 50,
    icon: '💰',
  },
  {
    id: 'family-cover',
    name: 'Family Cover',
    description: 'Extend your accident and health cover to 3 immediate family members.',
    weeklyPrice: 80,
    icon: '👨‍👩‍👧',
  },
  {
    id: 'device-protection',
    name: 'Device Protection',
    description: 'Cover for phones and laptops against damage, loss, and theft.',
    weeklyPrice: 40,
    icon: '📱',
  },
  {
    id: 'tool-protection',
    name: 'Tool Protection',
    description: 'Protect your tools and work equipment up to KES 80,000.',
    weeklyPrice: 35,
    icon: '🔧',
  },
];
