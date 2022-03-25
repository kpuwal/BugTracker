import newRouter from 'express-promise-router';
import { verifyToken } from '../middlewares/authJWT';
import { isAdmin } from '../middlewares/verifyRoles';
import { adminDashboard } from '../controllers/admin.api';

const router = newRouter();

// authentication
router.get('/dashboard', [verifyToken, isAdmin], adminDashboard);

// Admin routes 
router.get('/teams', [verifyToken, isAdmin]);
router.get('/role/:id', [verifyToken, isAdmin]); // get a role 
router.post('/role', [verifyToken, isAdmin]); // create a role
router.put('/role/:id', [verifyToken, isAdmin]); // update a role
router.delete('/role/:id', [verifyToken, isAdmin]); // delete a role

export default router;
