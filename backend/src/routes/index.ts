import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import planRoutes from '../modules/plans/plan.routes';
import ussdRoutes from '../modules/ussd/ussd.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/plans', planRoutes);
router.use('/ussd', ussdRoutes);

export default router;
