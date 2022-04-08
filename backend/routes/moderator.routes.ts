import newRouter from 'express-promise-router';
import { isModerator } from '../middlewares/verifyRoles';
import verifyToken from '../middlewares/verifyToken';
import bugAPI from '../controllers/bug.api';
import userAPI from '../controllers/user.api';
const router = newRouter();

router.get('/users', [verifyToken, isModerator], userAPI.readOne);

// Moderator routes (one team per moderator)
router.get('/team/:id', [verifyToken, isModerator]); // get a team 

router.post('/bug', [verifyToken, isModerator], bugAPI.createOne);
router.delete('/bug/:id', [verifyToken, isModerator], bugAPI.deleteOne);
// router.put('/bug/:id', [verifyToken, isModerator], updateBug);

router.post('/team', [verifyToken, isModerator]); // create a team
router.put('/team/:id', [verifyToken, isModerator]); // update a team
router.delete('/team/:id', [verifyToken, isModerator]); // delete a team

export default router;
