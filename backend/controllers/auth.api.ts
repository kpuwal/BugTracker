import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { collections } from "../db/services/mongo.connection";

import User from '../db/models/user.model';
import Role from '../db/models/role.model';

const secret = process.env.AUTH_SECRET;
const ROLES = ["user", "moderator", "admin"];

export const registerUser = async (req: Request, res: Response) => {
  const isFirstUser = res.locals.isFirstUser;
  let user;

  try {
    if (isFirstUser) {
      user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: [new Role(ROLES[0]), new Role(ROLES[1]), new Role(ROLES[2])],
      } as User;
    } else {
      user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: [new Role(ROLES[0])],
      } as User;
    }

    const result = await collections.users.insertOne(user);
    return result
      ? res.status(200).send({message: `Successfully created a new user with id ${result.insertedId}`})
      : res.status(500).send({message: "Failed to create a new user."});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export const logInUser = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  let highestRole;

  try {
    const user = (await collections.users.findOne({email}));
    if (!user) { res.status(404).send('user does not exist') };

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const isAdmin = user.roles.find((el: Role) => el.name === "admin");
    const isModerator = user.roles.find((el: Role) => el.name === "moderator");
  
    if (isAdmin) {
      highestRole = "admin";
    } else if (isModerator) {
      highestRole = "moderator";
    } else {
      highestRole = "user";
    }

    const token = jwt.sign({ id: user._id, name: user.name }, secret, {
      expiresIn: 9000
    });

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: highestRole,
      accessToken: token
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}