import { Request, Response, NextFunction } from 'express';
import { collections } from '../db/services/mongo.connection';
import { ObjectId } from 'mongodb';

export const isFirstUser = async (_req: Request, res: Response, next: NextFunction) => {
  let isFirst;
  try {
    const usersArr = await collections.users.find({}).toArray();
    isFirst = usersArr.length === 0;
  } catch (err) {
    isFirst = false;
  }
    res.locals.isFirst = isFirst;
    next();
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // const id = req.body.id;
  const id = res.locals.jwtPayload.userId

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    
    if (user) {
      res.status(200).send(user.role === 'admin');
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
}

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.jwtPayload.userId

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    
    if (user) {
      res.status(200).send(user.role === 'moderator');
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
}
