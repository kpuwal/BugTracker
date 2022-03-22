import express, {Request, Response} from "express";
import { connectToDatabase } from './db/services/mongo.connection';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import moderatorRoutes from './routes/moderator.routes';
import adminRoutes from './routes/admin.routes';

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

    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('/moderator', moderatorRoutes);
    app.use('/admin', adminRoutes);

    app.listen( port, () => {
      // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
  })
  .catch((error: Error) => {
    console.log("Database connection failed", error);
    process.exit();
  })
