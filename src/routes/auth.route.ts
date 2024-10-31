import { Router } from 'express';

import { authenticateJWT } from '../middleware/auth.middleware';
import { login, signup } from '../controllers/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login); 
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
