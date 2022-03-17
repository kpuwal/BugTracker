import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import User from '../models/user.model';

export const collections: { bugs?: mongoDB.Collection, users?: mongoDB.Collection } = {};

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // schema validation
  // await db.command({
  //   "collMod": "bugs",
  //   "validator": {
  //       $jsonSchema: {
  //           bsonType: "object",
  //           required: ["name", "description", "category"],
  //           additionalProperties: false,
  //           properties: {
  //           _id: {},
  //           name: {
  //               bsonType: "string",
  //               description: "'name' is required and is a string"
  //           },
  //           description: {
  //               bsonType: "string",
  //               description: "'description' is required and is a string"
  //           },
  //           category: {
  //               bsonType: "string",
  //               description: "'category' is required and is a string"
  //           }
  //           }
  //       }
  //    }
  // });
 
  const bugsCollection: mongoDB.Collection = db.collection(`${process.env.BUGS_COLLECTION_NAME}`);

  const usersCollection: mongoDB.Collection = db.collection(`${process.env.USERS_COLLECTION_NAME}`);

  collections.bugs = bugsCollection;
  collections.users = usersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and bugs collection: ${bugsCollection.collectionName} plus ${usersCollection.collectionName}`);
}
