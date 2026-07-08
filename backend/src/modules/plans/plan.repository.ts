import { prisma } from '../../prisma/client';

export const planRepository = {
  listActivePlans: async () => prisma.insurancePlan.findMany({ where: { isActive: true } }),
  getPlanBySlug: async (slug: string) => prisma.insurancePlan.findUnique({ where: { slug } }),
};
