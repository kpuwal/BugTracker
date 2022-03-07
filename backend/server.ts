import express from "express";
// const path = require('path');
import path from "path";
const app = express();
const port = 8080; // default port to listen

app.use(express.static(path.resolve("./") + "/build/client"));

// define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/client', 'index.html'));
});

// start the Express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );