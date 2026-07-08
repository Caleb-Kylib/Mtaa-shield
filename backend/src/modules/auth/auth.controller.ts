import type { Request, Response } from 'express';
import { authService } from './auth.service';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      res.status(400).json({ status: 'error', message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({ status: 'error', message });
    }
  },
};
