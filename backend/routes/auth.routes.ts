import newRouter from 'express-promise-router';
import { authDashboard } from '../controllers/user.api';
import { registerUser, signInUser } from '../controllers/auth.api';
import { readCards, readCard, createCard, updateCard, deleteCard } from '../controllers/bug.api';
import { verifyToken } from '../middlewares/authJWT';
import { checkDuplicateUsername, checkDuplicateEmail } from '../middlewares/verifyRegistration';

const router = newRouter();

// authorisation
router.post('/register', [checkDuplicateUsername, checkDuplicateEmail], registerUser);
router.post('/login', signInUser);

// authentication
router.get('/user/dashboard', [verifyToken], authDashboard);
router.get('/moderator/dashboard');
router.get('/admin/dashboard');

// User routes
router.get('/cards', readCards);
router.get('/cards/:id', readCard);
router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

// Moderator routes (one team per moderator)
router.get('/team/:id'); // get a team 
router.post('/team'); // create a team
router.put('/team/:id'); // update a team
router.delete('/team/:id'); // delete a team

export default router;
