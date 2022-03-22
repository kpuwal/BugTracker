import { Request, Response } from 'express';

export const adminDashboard = (_req: Request, res: Response) => {
  return res.status(200).send("Admin Content");
}