import { Request, Response, NextFunction } from 'express';
import { collections } from '../db/services/mongo.connection';

export const checkDuplicateUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = { name: req.body.username};
    const username = (await collections.users.findOne(query));
    if (username) {
      res.status(200).send("Username is already in use!!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
  next();
};

export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = { name: req.body.email};
    const email = (await collections.users.findOne(query));
    if (email) {
      res.status(200).send("Email is already in use!!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
  next();
}

export const checkRolesExisted = async (req: Request, res: Response, next: NextFunction) => {
  const role = req.body.role;
  if (role) {
    try {
      const roles = await collections.roles.find({}).toArray();
      if (!roles.includes(role)) {
        res.status(400).send({
          message: `Failed! Role ${role} does not exist!`
        });
        return;
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  next();
};
