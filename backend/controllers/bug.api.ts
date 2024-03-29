import { Request, Response } from 'express';
import { collections } from "../db/services/mongo.connection";
import { ObjectId } from "mongodb";
import Bug from "../db/models/bug.model";
import Status from '../db/models/status.model';

const readAll = async (_req: Request, res: Response) => {
  try {
    // const bugs = await collections.bugs.find({}).toArray();
    const toDoBugs = await collections.bugs.find({status: { toDo: true, doing: false, done: false }}).toArray();
    const doingBugs = await collections.bugs.find({status: { toDo: false, doing: true, done: false }}).toArray();
    const doneBugs = await collections.bugs.find({status: { toDo: false, doing: false, done: true }}).toArray();
   
    res.status(200).send({ toDo: toDoBugs, doing: doingBugs, done: doneBugs });
  } catch (error) {
      res.status(500).send({message: error.message});
  }
}

const readOne = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const bug = (await collections.bugs.findOne(query));
    
    if (bug) {
      res.status(200).send(bug);
    }
  } catch (error) {
      res.status(404).send({message: `Unable to find matching document with id: ${req.params.id}`});
  }
}

const createOne = async (req: Request, res: Response) => {
  try {
      const {title, description, createdBy, category} = req.body as Bug;
      const status = {toDo: true, doing: false, done: false} as Status;
      const obj = new Bug(title, description, createdBy, status, category);
      const result = await collections.bugs.insertOne(obj);

      result
          ? res.status(201).send({message: `Successfully created a new bug with id ${result.insertedId}`})
          : res.status(500).send({message: "Failed to create a new bug"});
  } catch (error) {
      res.status(400).send({message: error.message});
  }
}

const updateStatus = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      // const updatedBug: Bug = req.body. as Bug;
      const update = { $set: {status: req.body.status} };
      const query = { _id: new ObjectId(id) };
      const result = await collections.bugs.updateOne(query, update);

      result
          ? res.status(200).send({message: `Successfully updated bug with id ${id}`})
          : res.status(304).send({message: `Bug with id: ${id} not updated`});
  } catch (error) {
      console.error(error.message);
      res.status(400).send({message: error.message});
  }
}

const updateContent = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
      const update = { $set: req.body };
      const query = { _id: new ObjectId(id) };
      const result = await collections.bugs.updateOne(query, update);

      result
          ? res.status(200).send({message: `Successfully updated bug with id ${id}`})
          : res.status(304).send({message: `Bug with id: ${id} not updated`});
  } catch (error) {
      console.error(error.message);
      res.status(400).send({message: error.message});
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.bugs.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send({message: `Successfully removed a bug`});
      } else if (!result) {
          res.status(400).send({message: `Failed to remove bug`});
      } else if (!result.deletedCount) {
          res.status(404).send({message: `Bug with id ${id} does not exist`});
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send({message: error.message});
  }
}

const bugAPI = {
  createOne,
  readAll,
  readOne,
  updateStatus,
  updateContent,
  deleteOne,
}

export default bugAPI;
