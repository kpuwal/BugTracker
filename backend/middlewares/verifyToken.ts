import jwt, { VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.AUTH_SECRET;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let jwtPayload: JwtPayload;
  let token = req.headers['x-access-token'] as string;
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    jwtPayload = <VerifyOptions>jwt.verify(token, secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error: any) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }
  next();
};

export default verifyToken;
