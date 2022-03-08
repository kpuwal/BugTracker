// const { aggregateStats } = require("./server/api_controllers/db");
// const { authenticated } = require('./server/api_controllers/auth0');
// const { sourcesRequest, headlinesRequest } = require('./server/api_controllers/news');
import { Request, Response } from 'express';
import newRouter from 'express-promise-router';
import path from 'path';
// const router = require("express-promise-router")();
const router = newRouter();
// const path = require('path');

router.get( "/", ( req: Request, res: Response ) => {
  res.send( "server is up and running..." );
} );

router.get('*', (req: Request, res: Response) => {
res.sendFile(path.join(__dirname, './build/client', 'index.html'));
});

router.post('/db/createCard');
router.get('/db/readCards');
router.put('/db/updateCard');
router.post('/db/deleteCard');

export default router;
