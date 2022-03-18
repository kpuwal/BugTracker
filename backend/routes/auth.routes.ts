import newRouter from 'express-promise-router';
import { authDashboard } from '../controllers/user.api';
import { registerUser, signInUser } from '../controllers/auth.api';
import { readCards, readCard, createCard, updateCard, deleteCard } from '../controllers/bug.api';
import { verifyToken } from '../middlewares/authJWT';
import { checkDuplicateUsername, checkDuplicateEmail } from '../middlewares/verifySignup';

const router = newRouter();

// authorisation
router.post('/register', [checkDuplicateUsername, checkDuplicateEmail], registerUser);
router.post('/login', signInUser);

// authentication
router.get('/user/dashboard', [verifyToken], authDashboard);

router.get('/cards', readCards);
router.get('/cards/:id', readCard);
router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;
