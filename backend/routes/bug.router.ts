import newRouter from 'express-promise-router';

import { readCards, readCard, createCard, updateCard, deleteCard } from '../db/controllers/bug.api';

const router = newRouter();

router.get('/cards', readCards);
router.get('/cards/:id', readCard);
router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;
