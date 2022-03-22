import newRouter from 'express-promise-router';
import { isModerator } from '../middlewares/authJWT';
import { createBug, deleteBug } from '../controllers/bug.api';
import { moderatorDashboard } from '../controllers/moderator.api';
const router = newRouter();

// authentication
router.get('/dashboard', [isModerator], moderatorDashboard);

// Moderator routes (one team per moderator)
router.get('/team/:id', [isModerator]); // get a team 

router.post('/bug', [isModerator], createBug);
router.delete('/bug/:id', [isModerator], deleteBug);

router.post('/team', [isModerator]); // create a team
router.put('/team/:id', [isModerator]); // update a team
router.delete('/team/:id', [isModerator]); // delete a team

export default router;
