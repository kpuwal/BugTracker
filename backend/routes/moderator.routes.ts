import newRouter from 'express-promise-router';
import { isModerator } from '../middlewares/verifyRoles';
import verifyToken from '../middlewares/verifyToken';
import bugAPI from '../controllers/bug.api';
import userAPI from '../controllers/user.api';
const router = newRouter();

router.get('/users', [verifyToken, isModerator], userAPI.readAll);

router.post('/bug', [verifyToken, isModerator], bugAPI.createOne);
router.put('/bug/:id', [verifyToken, isModerator], bugAPI.updateContent);
router.delete('/bug/:id', [verifyToken, isModerator], bugAPI.deleteOne);

router.post('/team', [verifyToken, isModerator]); // create a team
router.put('/team/:id', [verifyToken, isModerator]); // update a team
router.delete('/team/:id', [verifyToken, isModerator]); // delete a team

export default router;
