import { Request, Response } from 'express';
import { collections } from "../services/mongo.connection";
import { ObjectId } from "mongodb";
import User from "../models/user.model";

export const allUsers = async (_req: Request, res: Response) => {
  try {
    const users = await collections.users.find({}).toArray();

    res.status(200).send(users);
  } catch (error) {
      res.status(500).send(error.message);
  }
}

export const getUser = async (req: Request, res: Response) => {
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

export const registerUser = async (req: Request, res: Response) => {
  try {
      const newUser = req.body as User;
      const result = await collections.users.insertOne(newUser);

      result
          ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
          : res.status(500).send("Failed to create a new user.");
  } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
  }
}

// export const updateCard = async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//       const updatedBug: Bug = req.body as Bug;
//       const query = { _id: new ObjectId(id) };
    
//       const result = await collections.bugs.updateOne(query, { $set: updatedBug });

//       result
//           ? res.status(200).send(`Successfully updated bug with id ${id}`)
//           : res.status(304).send(`Bug with id: ${id} not updated`);
//   } catch (error) {
//       console.error(error.message);
//       res.status(400).send(error.message);
//   }
// }

// export const deleteCard = async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//       const query = { _id: new ObjectId(id) };
//       const result = await collections.bugs.deleteOne(query);

//       if (result && result.deletedCount) {
//           res.status(202).send(`Successfully removed bug with id ${id}`);
//       } else if (!result) {
//           res.status(400).send(`Failed to remove bug with id ${id}`);
//       } else if (!result.deletedCount) {
//           res.status(404).send(`Bug with id ${id} does not exist`);
//       }
//   } catch (error) {
//       console.error(error.message);
//       res.status(400).send(error.message);
//   }
// }