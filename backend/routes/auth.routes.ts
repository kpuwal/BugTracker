import newRouter from 'express-promise-router';
import { registerUser, logInUser } from '../controllers/auth.api';
import { checkDuplicateUsername, checkDuplicateEmail } from '../middlewares/verifyRegistration';

const router = newRouter();

// authorisation
router.post('/register', [checkDuplicateUsername, checkDuplicateEmail], registerUser);
router.post('/login', logInUser);

export default router;
