export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'Do I need a bank account to sign up?',
    answer:
      'No. You only need an M-Pesa registered phone number. Pay premiums and receive claims directly through M-Pesa.',
  },
  {
    question: 'What if I miss a weekly payment?',
    answer:
      'We give you a 7-day grace period before your cover lapses. You\'ll receive an SMS reminder before any action is taken.',
  },
  {
    question: 'How do I file a claim?',
    answer:
      'You can file a claim through the app, WhatsApp, or by dialing *384*10#. Upload a photo of the damage and our team processes it within 48 hours.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'Yes. You can upgrade or downgrade your plan at any time. Changes take effect from your next payment cycle.',
  },
  {
    question: 'Is there a minimum lock-in period?',
    answer:
      'No lock-in. You can cancel anytime by texting STOP to our USSD code or contacting our support team on WhatsApp.',
  },
  {
    question: 'Which languages does the AI support?',
    answer:
      'Our AI assistant supports English, Swahili, Sheng, Kikuyu, and Luo. Just start chatting in your language.',
  },
  {
    question: 'How fast are claims paid?',
    answer:
      'Most claims are processed and paid within 48 hours. Emergency claims can be fast-tracked to same-day payment.',
  },
];
