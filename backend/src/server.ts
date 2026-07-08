import dotenv from 'dotenv';
import app from './app';
import { prisma } from './prisma/client';

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Mtaa Shield API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
