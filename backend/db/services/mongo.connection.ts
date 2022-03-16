import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { bugs?: mongoDB.Collection } = {};

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const bugsCollection: mongoDB.Collection = db.collection(`${process.env.BUGS_COLLECTION_NAME}`);

  collections.bugs = bugsCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${bugsCollection.collectionName}`);
}
