import express, {Request, Response} from "express";
import appRouter from './router';
import { connectToDatabase } from './db/services/mongo.connection';
import path from 'path';

const app = express();
const port = 8080; // default port to listen

app.use(express.static(path.resolve("./") + "/build/client"));
app.get( "/", (_req: Request, res: Response ) => {
  res.send( "server is up and running..." );
} );

// app.get('*', (_req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, './build/client', 'index.html'));
// });

connectToDatabase()
  .then(() => {
    app.use(express.json());
    app.use('/db', appRouter);
    app.listen( port, () => {
      // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
  })
  .catch((error: Error) => {
    console.log("Database connection failed", error);
    process.exit();
  })
