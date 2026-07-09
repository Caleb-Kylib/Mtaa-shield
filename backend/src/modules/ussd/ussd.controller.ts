import { Request, Response } from 'express';
import { UssdService } from './ussd.service';

export const handleUssdCallback = async (req: Request, res: Response) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    
    // Set headers required by Africa's Talking
    res.set('Content-Type', 'text/plain');
    
    const responseText = await UssdService.handleCallback(
      sessionId,
      serviceCode,
      phoneNumber,
      text || ''
    );
    
    res.status(200).send(responseText);
  } catch (error) {
    console.error('USSD Callback Error:', error);
    res.set('Content-Type', 'text/plain');
    res.status(500).send('END An error occurred. Please try again later.');
  }
};
