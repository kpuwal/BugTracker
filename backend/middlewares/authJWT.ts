import jwt, { VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.AUTH_SECRET;

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   let jwtPayload: JwtPayload;
//   let token: string = req.headers["x-access-token"] as string;

//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }
//   jwtPayload = <VerifyOptions>jwt.verify(token, secret);
//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized!" });
//     }
//     console.log("decoded ", decoded)
//     res.locals.userId = jwtPayload;
//     next();
//   });
// };

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let jwtPayload: JwtPayload;
  let token = req.headers['x-access-token'] as string;
  
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

  //The token is valid for 1 hour, send a new token on every request
  // const { id } = jwtPayload;
  // const newToken = jwt.sign({ id }, secret, {
  //   expiresIn: 60 * 60
  // });

  // res.setHeader("token", newToken);
  next();
};
