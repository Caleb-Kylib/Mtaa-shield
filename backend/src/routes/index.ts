import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import planRoutes from '../modules/plans/plan.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/plans', planRoutes);

export default router;
