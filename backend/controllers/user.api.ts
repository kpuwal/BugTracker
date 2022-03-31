import { Request, Response } from 'express';

export const userDashboard = (_req: Request, res: Response) => {
  return res.status(200).send("Hello User!");
}