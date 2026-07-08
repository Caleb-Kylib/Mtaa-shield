import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient, OccupationType, Role } = require('@prisma/client') as typeof import('@prisma/client');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set. Check backend/.env before seeding.');
}

process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient();

const counties = [
  'Mombasa',
  'Kwale',
  'Kilifi',
  'Tana River',
  'Lamu',
  'Taita Taveta',
  'Garissa',
  'Wajir',
  'Mandera',
  'Marsabit',
  'Isiolo',
  'Meru',
  'Tharaka-Nithi',
  'Embu',
  'Kitui',
  'Machakos',
  'Makueni',
  'Nyandarua',
  'Nyeri',
  'Kirinyaga',
  "Murang'a",
  'Kiambu',
  'Turkana',
  'West Pokot',
  'Samburu',
  'Trans Nzoia',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'Nandi',
  'Baringo',
  'Laikipia',
  'Nakuru',
  'Narok',
  'Kajiado',
  'Kericho',
  'Bomet',
  'Kakamega',
  'Vihiga',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisumu',
  'Homa Bay',
  'Migori',
  'Kisii',
  'Nyamira',
  'Nairobi',
];

const insurancePlans = [
  { name: 'Essential Farm Cover', slug: 'essential-farm-cover', targetOccupation: OccupationType.FARMER, description: 'Basic cover for smallholder farmers.', premiumWeekly: 250, premiumMonthly: 1000, premiumQuarterly: 2800, coverage: 'Up to KES 200,000', exclusions: ['Pre-existing conditions'], benefits: ['Medical support', 'Farm input protection'] },
  { name: 'Farm Plus', slug: 'farm-plus', targetOccupation: OccupationType.FARMER, description: 'Enhanced cover for active farmers.', premiumWeekly: 400, premiumMonthly: 1600, premiumQuarterly: 4400, coverage: 'Up to KES 500,000', exclusions: ['High-risk activities'], benefits: ['Medical support', 'Farm equipment cover'] },
  { name: 'Rider Basic', slug: 'rider-basic', targetOccupation: OccupationType.BODA_RIDER, description: 'Basic cover for boda boda riders.', premiumWeekly: 180, premiumMonthly: 700, premiumQuarterly: 1900, coverage: 'Up to KES 150,000', exclusions: ['Intentional damage'], benefits: ['Accident support', 'Emergency cash'] },
  { name: 'Rider Plus', slug: 'rider-plus', targetOccupation: OccupationType.BODA_RIDER, description: 'Expanded cover for riders.', premiumWeekly: 300, premiumMonthly: 1200, premiumQuarterly: 3300, coverage: 'Up to KES 400,000', exclusions: ['Professional racing'], benefits: ['Accident support', 'Hospital cash'] },
  { name: 'Biashara Basic', slug: 'biashara-basic', targetOccupation: OccupationType.MARKET_TRADER, description: 'Coverage for market traders.', premiumWeekly: 200, premiumMonthly: 800, premiumQuarterly: 2200, coverage: 'Up to KES 180,000', exclusions: ['Illegal trade'], benefits: ['Business interruption', 'Medical support'] },
  { name: 'Biashara Plus', slug: 'biashara-plus', targetOccupation: OccupationType.MARKET_TRADER, description: 'Enhanced cover for traders.', premiumWeekly: 350, premiumMonthly: 1400, premiumQuarterly: 3800, coverage: 'Up to KES 450,000', exclusions: ['Large-scale warehousing'], benefits: ['Business interruption', 'Medical support'] },
  { name: 'Fundi Basic', slug: 'fundi-basic', targetOccupation: OccupationType.CONSTRUCTION_WORKER, description: 'Coverage for construction workers.', premiumWeekly: 220, premiumMonthly: 900, premiumQuarterly: 2500, coverage: 'Up to KES 200,000', exclusions: ['Unsafe practices'], benefits: ['Accident support', 'Weekly cash'] },
  { name: 'Fundi Plus', slug: 'fundi-plus', targetOccupation: OccupationType.CONSTRUCTION_WORKER, description: 'Expanded cover for workers.', premiumWeekly: 360, premiumMonthly: 1450, premiumQuarterly: 4000, coverage: 'Up to KES 500,000', exclusions: ['Professional negligence'], benefits: ['Accident support', 'Hospital cash'] },
  { name: 'Gig Basic', slug: 'gig-basic', targetOccupation: OccupationType.GIG_WORKER, description: 'Coverage for gig workers.', premiumWeekly: 170, premiumMonthly: 650, premiumQuarterly: 1800, coverage: 'Up to KES 150,000', exclusions: ['Non-registered vehicles'], benefits: ['Income support', 'Emergency cash'] },
  { name: 'Gig Plus', slug: 'gig-plus', targetOccupation: OccupationType.GIG_WORKER, description: 'Enhanced cover for gig workers.', premiumWeekly: 320, premiumMonthly: 1250, premiumQuarterly: 3450, coverage: 'Up to KES 400,000', exclusions: ['Commercial hire'], benefits: ['Income support', 'Medical support'] },
];

async function main() {
  await prisma.county.deleteMany();
  await prisma.insurancePlan.deleteMany();
  await prisma.user.deleteMany();

  await prisma.county.createMany({ data: counties.map((name) => ({ name })) });

  for (const plan of insurancePlans) {
    await prisma.insurancePlan.create({ data: plan });
  }

  await prisma.user.create({
    data: {
      fullName: 'System Admin',
      email: 'admin@mtaashield.co.ke',
      phone: '+254700000000',
      password: 'change-me',
      county: 'Nairobi',
      occupation: OccupationType.SMALL_BUSINESS_OWNER,
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  console.log('✅ Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
