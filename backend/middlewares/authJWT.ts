import jwt, { VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from 'express';

import { collections } from '../db/services/mongo.connection';

const secret = process.env.AUTH_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let jwtPayload: JwtPayload;
  let token: string = req.headers['x-access-token'] as string;
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    jwtPayload = <VerifyOptions>jwt.verify(token, secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error: any) {
    //If token is not valid, respond with 401
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId } = jwtPayload;
  const newToken = jwt.sign({ userId }, secret, {
    expiresIn: 60 * 60
  });

  res.setHeader("token", newToken);
  next();
};

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
