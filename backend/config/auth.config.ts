import jwt from 'jsonwebtoken';
import User from '../db/models/user.model';

interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  _id: string;
}

export const createToken = (user: User): TokenData => {
  const expiresIn = 60 * 60; // an hour
  const secret = process.env.AUTH_SECRET;
  const dataStoredInToken: DataStoredInToken = {
    _id: user.id.toString(),
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  };
}