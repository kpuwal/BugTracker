import { Request, Response } from 'express';

export const moderatorDashboard = (_req: Request, res: Response) => {
  return res.status(200).send("Hello Moderator!");
}