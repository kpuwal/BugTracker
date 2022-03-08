import express from "express";
import appRouter from './router';
const app = express();
const port = 8080; // default port to listen

// app.use(express.static(path.resolve("./") + "/build/client"));

app.use('/',  appRouter);


// start the Express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );