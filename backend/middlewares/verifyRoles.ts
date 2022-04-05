import { Request, Response, NextFunction } from 'express';
import { collections } from '../db/services/mongo.connection';
import { ObjectId } from 'mongodb';

export const isFirstUser = async (_req: Request, res: Response, next: NextFunction) => {
  let isFirst;
  try {
    const usersArr = await collections.users.find({}).toArray();
    isFirst = usersArr.length === 0;
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${res.locals.jwtPayload._id}`);
  }

  res.locals.isFirstUser = isFirst;
  next();
}

export const isAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.jwtPayload._id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    const isAdmin = user.roles.admin;
  
    if (!isAdmin) {
      res.status(401).send({message: 'Unauthorized'});
    }
  } catch (error) {
      res.status(404).send({message: `Unable to find matching document with id: ${res.locals.jwtPayload._id}`});
  }
  next();
}

export const isModerator = async (_req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.jwtPayload._id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    const isModerator = user.roles.moderator;
    
    if (!isModerator) {
      res.status(401).send({message: 'Unauthorized'});
    }
  } catch (error) {
      res.status(404).send({message: `Unable to find matching document with id: ${res.locals.jwtPayload.id}`});
  }
  next();
}
