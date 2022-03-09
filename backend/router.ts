// const { aggregateStats } = require("./server/api_controllers/db");
// const { authenticated } = require('./server/api_controllers/auth0');
// const { sourcesRequest, headlinesRequest } = require('./server/api_controllers/news');
import { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { collections } from "./db/services/mongo.connection";
import Bug from "./db/models/bug";
import newRouter from 'express-promise-router';

const router = newRouter();

router.get("/cards", async (_req: Request, res: Response) => {
  try {
     const bugs = await collections.bugs.find({}).toArray();

      res.status(200).send(bugs);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.get('/cards/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const bugs = (await collections.bugs.findOne(query));
    
    if (bugs) {
      res.status(200).send(bugs);
    }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

router.post('/cards', async (req: Request, res: Response) => {
  console.log("received ", req.body)
  try {
      const newBug = req.body as Bug;
      const result = await collections.bugs.insertOne(newBug);

      result
          ? res.status(201).send(`Successfully created a new bug with id ${result.insertedId}`)
          : res.status(500).send("Failed to create a new bug.");
  } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
  }
});

router.put('/cards/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const updatedBug: Bug = req.body as Bug;
      const query = { _id: new ObjectId(id) };
    
      const result = await collections.bugs.updateOne(query, { $set: updatedBug });

      result
          ? res.status(200).send(`Successfully updated bug with id ${id}`)
          : res.status(304).send(`Bug with id: ${id} not updated`);
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

router.delete('/cards/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.bugs.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed bug with id ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove bug with id ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Bug with id ${id} does not exist`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

export default router;
