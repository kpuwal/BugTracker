import newRouter from 'express-promise-router';
import verifyToken from '../middlewares/verifyToken';
import { isAdmin } from '../middlewares/verifyRoles';
import userAPI from '../controllers/user.api';

const router = newRouter();

router.put('/user', [verifyToken, isAdmin], userAPI.updateOne);
router.delete('/user/:id', [verifyToken, isAdmin], userAPI.deleteOne);

export default router;
