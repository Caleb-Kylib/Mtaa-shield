import { Router } from 'express';
import { handleUssdCallback } from './ussd.controller';

const router = Router();

router.post('/callback', handleUssdCallback);

export default router;
