import newRouter from 'express-promise-router';
import { isModerator } from '../middlewares/verifyRoles';
import { verifyToken } from '../middlewares/authJWT';
import { createBug, deleteBug } from '../controllers/bug.api';
import { readUsers } from '../controllers/user.api';
import { moderatorDashboard } from '../controllers/moderator.api';
const router = newRouter();

// authentication
router.get('/dashboard', [verifyToken, isModerator], moderatorDashboard);

router.get('/users', [verifyToken, isModerator], readUsers);

// Moderator routes (one team per moderator)
router.get('/team/:id', [verifyToken, isModerator]); // get a team 

router.post('/bug', [verifyToken, isModerator], createBug);
router.delete('/bug/:id', [verifyToken, isModerator], deleteBug);

router.post('/team', [verifyToken, isModerator]); // create a team
router.put('/team/:id', [verifyToken, isModerator]); // update a team
router.delete('/team/:id', [verifyToken, isModerator]); // delete a team

export default router;
