import { Router } from 'express';
import { planController } from './plan.controller';

const router = Router();

router.get('/', planController.list);
router.get('/:slug', planController.getBySlug);

export default router;
