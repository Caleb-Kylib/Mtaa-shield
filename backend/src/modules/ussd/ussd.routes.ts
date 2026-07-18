import { Router } from 'express';
import { handleUssdCallback, handleUssdEvent } from './ussd.controller';

const router = Router();

// Africa's Talking posts form-encoded sessionId, serviceCode, phoneNumber and text.
// Both URLs are supported so existing dashboard configuration stays valid.
router.post(['/', '/callback'], handleUssdCallback);
router.post('/events', handleUssdEvent);
router.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', provider: 'Africa\'s Talking', channel: 'ussd' });
});

export default router;
