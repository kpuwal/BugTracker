// import { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = "mongodb+srv://Kasia:<password>@bug-tracker.2eovf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


// const client = new MongoClient(uri, { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true, 
//   serverApi: ServerApiVersion.v1 
// });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// MongoClient.connect(uri, {
//   useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })
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
