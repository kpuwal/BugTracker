import newRouter from 'express-promise-router';
// import { userDashboard } from '../controllers/user.api';
import { verifyToken } from '../middlewares/authJWT';
import { readBugs, readBug, updateBug } from '../controllers/bug.api';

const router = newRouter();

// router.get('/dashboard', [verifyToken], userDashboard);

router.get('/bugs', [verifyToken], readBugs);
// router.get('/bug/:id', [verifyToken], readBug);
router.put('/bug/:id', [verifyToken], updateBug);

router.get('/status', [verifyToken]);
router.get('/status/:id', [verifyToken]);
router.post('/status', [verifyToken]);
router.put('/status/:id', [verifyToken]);
router.delete('/status/:id', [verifyToken]);

export default router;