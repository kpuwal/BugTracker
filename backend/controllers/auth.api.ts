import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../db/models/user.model';
import { collections } from "../db/services/mongo.connection";

const secret = process.env.AUTH_SECRET;

export const registerUser = async (req: Request, res: Response) => {
  console.log("register user ")
  try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      } as User;
      
      const result = await collections.users.insertOne(user);
      return result
          ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
          : res.status(500).send("Failed to create a new user.");
  } catch (error) {
    console.log("catch error while registering")
      res.status(400).send(error.message);
  }
}

export const signInUser = async (req: Request, res: Response) => {
  const email: string = req.body.email;

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
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    console.log("token: ", token)

    res.status(200).send({
      id: user._id,
      username: user.name,
      email: user.email,
      accessToken: token
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}