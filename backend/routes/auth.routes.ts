import newRouter from 'express-promise-router';
import { registerUser, logInUser } from '../controllers/auth.api';
import { checkDuplicateUsername, checkDuplicateEmail } from '../middlewares/verifyRegistration';
import { isFirstUser, findRole } from '../middlewares/verifyRoles';

const router = newRouter();

// authorisation
router.post('/register', [
  checkDuplicateUsername, 
  checkDuplicateEmail, 
  isFirstUser
], registerUser);

router.post('/login', logInUser);

export default router;
