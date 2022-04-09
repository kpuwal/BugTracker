import newRouter from 'express-promise-router';
import verifyToken from '../middlewares/verifyToken';
import bugAPI from '../controllers/bug.api';

const router = newRouter();

router.get('/bugs', [verifyToken], bugAPI.readAll);
router.put('/bug/:id', [verifyToken], bugAPI.updateStatus);

export default router;
