import express, {Request, Response} from "express";
import { connectToDatabase } from './db/services/mongo.connection';
import authRouter from './routes/auth.routes';
import path from 'path';
import cors from 'cors';

var corsOptions = {
  origin: "http://localhost:3000"
};

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
  .then(() => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));

    // app.use(express.static(path.resolve("./") + "/build/client"));
    app.get( "/", (_req: Request, res: Response ) => {
      res.send( "server is up and running..." );
    } );

    // app.get('*', (_req: Request, res: Response) => {
    //   res.sendFile(path.join(__dirname, './build/client', 'index.html'));
    // });

    app.use('/auth', authRouter);
    app.listen( port, () => {
      // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
  })
  .catch((error: Error) => {
    console.log("Database connection failed", error);
    process.exit();
  })
