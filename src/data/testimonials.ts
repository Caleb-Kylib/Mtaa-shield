export interface Testimonial {
  id: string;
  name: string;
  role: string;
  occupation: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'James Omondi',
    role: 'Boda Boda Rider',
    occupation: 'Kisumu',
    quote:
      'Sikuwahi fikiria ninaweza afford insurance. Mtaa Shield ilifanya iwe rahisi sana — nalipa KES 100 kila wiki tu na niko covered!',
    rating: 5,
    initials: 'JO',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Mama Njeri',
    role: 'Market Trader',
    occupation: 'Nairobi',
    quote:
      'When my stall caught fire, Mtaa Shield paid me within 2 days. I was back in business within a week. Asante sana!',
    rating: 5,
    initials: 'MN',
    color: 'bg-orange-500',
  },
  {
    id: '3',
    name: 'Wanjiku Kamau',
    role: 'Small-Scale Farmer',
    occupation: 'Nakuru',
    quote:
      'The drought last year would have ruined me. Farm Plus covered my losses and the AI gave me tips to recover faster. Life-changing.',
    rating: 5,
    initials: 'WK',
    color: 'bg-green-600',
  },
  {
    id: '4',
    name: 'David Mutua',
    role: 'Construction Worker',
    occupation: 'Mombasa',
    quote:
      'I broke my arm on-site and Fundi Plus covered my hospital bills and paid me daily cash while I recovered. Highly recommended.',
    rating: 5,
    initials: 'DM',
    color: 'bg-yellow-600',
  },
];
