import newRouter from 'express-promise-router';
import { isAdmin } from '../middlewares/authJWT';
import { adminDashboard } from '../controllers/admin.api';

const router = newRouter();

// authentication
router.get('/dashboard', [isAdmin], adminDashboard);

// Admin routes 
router.get('/teams', [isAdmin]);
router.get('/role/:id', [isAdmin]); // get a role 
router.post('/role', [isAdmin]); // create a role
router.put('/role/:id', [isAdmin]); // update a role
router.delete('/role/:id', [isAdmin]); // delete a role

export default router;
