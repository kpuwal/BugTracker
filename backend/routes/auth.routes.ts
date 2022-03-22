import newRouter from 'express-promise-router';
import { registerUser, signInUser } from '../controllers/auth.api';
import { checkDuplicateUsername, checkDuplicateEmail } from '../middlewares/verifyRegistration';

const router = newRouter();

// authorisation
router.post('/register', [checkDuplicateUsername, checkDuplicateEmail], registerUser);
router.post('/login', signInUser);

export default router;
