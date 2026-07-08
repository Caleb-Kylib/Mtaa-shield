import { planRepository } from './plan.repository';

export const planService = {
  listPlans: async () => planRepository.listActivePlans(),
  getPlanBySlug: async (slug: string) => planRepository.getPlanBySlug(slug),
};
