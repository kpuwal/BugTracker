import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.AUTH_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let jwtPayload;
  let token: string = req.headers['x-access-token'] as string;
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    jwtPayload = <any>jwt.verify(token, secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, secret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
};

