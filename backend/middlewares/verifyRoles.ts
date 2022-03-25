import { Request, Response, NextFunction } from 'express';
import { collections } from '../db/services/mongo.connection';
import { ObjectId } from 'mongodb';

export const isFirstUser = async (_req: Request, res: Response, next: NextFunction) => {
  let isFirst;
  try {
    const usersArr = await collections.users.find({}).toArray();
    isFirst = usersArr.length === 0;
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${res.locals.jwtPayload.userId}`);
  }
  isFirst = false;
  res.locals.isFirstUser = isFirst;
  next();
}

export const isAdmin = async (_req: Request, res: Response, _next: NextFunction) => {
  const id = res.locals.jwtPayload.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    const isAdmin = user.roles.includes("admin");
    
    if (isAdmin) {
      res.status(200).send(user.role === 'admin');
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${res.locals.jwtPayload.userId}`);
  }
}

export const isModerator = async (_req: Request, res: Response, _next: NextFunction) => {
  const id = res.locals.jwtPayload.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    const isModerator = user.roles.includes("moderator");
    
    if (isModerator) {
      res.status(200).send(user.role === 'moderator');
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${res.locals.jwtPayload.userId}`);
  }
}
