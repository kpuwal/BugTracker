import newRouter from 'express-promise-router';
import { verifyToken } from '../middlewares/verifyToken';
import { readBugs, readBug, updateBug } from '../controllers/bug.api';

const router = newRouter();

router.get('/bugs', [verifyToken], readBugs);
router.put('/bug/:id', [verifyToken], updateBug);

router.get('/status', [verifyToken]);
router.get('/status/:id', [verifyToken]);
router.post('/status', [verifyToken]);
router.put('/status/:id', [verifyToken]);
router.delete('/status/:id', [verifyToken]);

export default router;
