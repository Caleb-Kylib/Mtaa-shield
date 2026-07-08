import type { Request, Response } from 'express';
import { planService } from './plan.service';

export const planController = {
  list: async (_req: Request, res: Response) => {
    const plans = await planService.listPlans();
    res.status(200).json({ status: 'success', data: plans });
  },

  getBySlug: async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const plan = await planService.getPlanBySlug(slug);
    if (!plan) {
      return res.status(404).json({ status: 'error', message: 'Plan not found' });
    }

    return res.status(200).json({ status: 'success', data: plan });
  },
};
