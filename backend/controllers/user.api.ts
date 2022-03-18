import { Request, Response } from 'express';

export const authDashboard = (_req: Request, res: Response) => {
  return res.status(200).send("User Content.");
}