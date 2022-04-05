import { Request, Response } from 'express';
import { collections } from "../db/services/mongo.connection";
import { ObjectId } from "mongodb";
import User from "../db/models/user.model";

export const readUsers = async (_req: Request, res: Response) => {
  try {
    const users = await collections.users.find({}).toArray();

    res.status(200).send({ users });
  } catch (error) {
      res.status(500).send({message: error.message});
  }
}

export const readUser = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const updatedUser: User = req.body as User;
      const query = { _id: new ObjectId(id) };
    
      const result = await collections.bugs.updateOne(query, { $set: updatedUser });

      result
          ? res.status(200).send(`Successfully updated user with id ${id}`)
          : res.status(304).send(`User with id: ${id} not updated`);
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.users.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed user with id ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove user with id ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`User with id ${id} does not exist`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
}
