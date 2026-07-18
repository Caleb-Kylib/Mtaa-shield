import { Request, Response } from 'express';
import { UssdService } from './ussd.service';

export const handleUssdCallback = async (req: Request, res: Response) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body as Record<string, unknown>;

    // Africa's Talking expects a plain-text body beginning with CON or END.
    res.type('text/plain').set('Cache-Control', 'no-store');

    if (typeof sessionId !== 'string' || typeof serviceCode !== 'string' || typeof phoneNumber !== 'string') {
      return res.status(400).send('END Invalid USSD request. Please try again.');
    }
    
    const responseText = await UssdService.handleCallback(
      sessionId,
      serviceCode,
      phoneNumber,
      typeof text === 'string' ? text : ''
    );
    
    res.status(200).send(responseText);
  } catch (error) {
    console.error('USSD Callback Error:', error);
    res.type('text/plain').set('Cache-Control', 'no-store');
    res.status(500).send('END An error occurred. Please try again later.');
  }
};

// Configure this as the optional Africa's Talking "event URL". It is deliberately
// separate from the interactive callback so event notifications never interrupt a
// customer session.
export const handleUssdEvent = (_req: Request, res: Response) => {
  res.status(204).end();
};
