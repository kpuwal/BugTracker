import { Request, Response } from 'express';

export const adminDashboard = (_req: Request, res: Response) => {
  console.log("dashbord for admin")
  return res.status(200).send("Admin Content");
}