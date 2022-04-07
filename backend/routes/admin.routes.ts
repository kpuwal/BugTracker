import newRouter from 'express-promise-router';
import { verifyToken } from '../middlewares/verifyToken';
import { isAdmin } from '../middlewares/verifyRoles';
import { updateUser, deleteUser } from '../controllers/user.api';

const router = newRouter();

router.put('/user', [verifyToken, isAdmin], updateUser);
router.delete('/user/:id', [verifyToken, isAdmin], deleteUser);

export default router;
