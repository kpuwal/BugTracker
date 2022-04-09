import { Request, Response } from 'express';
import { collections } from "../db/services/mongo.connection";
import { ObjectId } from "mongodb";
import User from "../db/models/user.model";

const readAll = async (_req: Request, res: Response) => {
  try {
    const users = await collections.users.find({}).toArray();
console.log(users)
    res.status(200).send({ users });
  } catch (error) {
      res.status(500).send({message: error.message});
  }
}

const readOne = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query));
    
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
      res.status(404).send({message: `Unable to find matching document with id: ${req.params.id}`});
  }
}

const updateOne = async (req: Request, res: Response) => {
  const id = req?.body?._id;
  try {
      const update = { $set: {roles: req.body.roles} };
      const query = { _id: new ObjectId(id) };
      const result = await collections.users.updateOne(query, update);
      result
          ? res.status(200).send({message: `Successfully updated user with id ${id}`})
          : res.status(304).send({message: `User with id: ${id} not updated`});
  } catch (error) {
      res.status(400).send({message: error.message});
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  
  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.users.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send({message: `Successfully removed user with id ${id}`});
      } else if (!result) {
          res.status(400).send({message: `Failed to remove user with id ${id}`});
      } else if (!result.deletedCount) {
          res.status(404).send({message: `User with id ${id} does not exist`});
      }
  } catch (error) {
      res.status(400).send({message: error.message});
  }
}

const userAPI = {
  readAll,
  readOne,
  updateOne,
  deleteOne,
}

export default userAPI;
