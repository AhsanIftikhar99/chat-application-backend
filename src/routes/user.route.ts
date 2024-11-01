// src/routes/user.route.ts
import { Router } from 'express';
import { getUserById, getUsers } from '../controllers/user/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
router.get('/users', authenticateJWT, getUsers);
router.get('/users/:id', authenticateJWT, getUserById);

export default router;
