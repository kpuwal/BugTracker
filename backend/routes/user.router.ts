import newRouter from 'express-promise-router';

import { registerUser, allUsers, getUser } from '../db/controllers/user.api';

const router = newRouter();

router.get('/', allUsers);
router.get('/:id', getUser);

router.post('/register', registerUser);
// router.post('/signup', signupUser);
// router.post('/signin', signinUser);
// router.put('/change/:id', resetPassword);
// router.put('/forgot/:id', forgotPassword);

export default router;
