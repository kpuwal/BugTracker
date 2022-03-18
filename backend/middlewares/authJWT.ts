import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

import User from '../db/models/user.model';
import Role from '../db/models/role.model';

const secret = process.env.AUTH_SECRET;

export const verifyToken = (req: Request, res: Response, next: any) => {
  let token: string = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

