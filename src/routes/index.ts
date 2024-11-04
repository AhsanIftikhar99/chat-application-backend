import { Router } from 'express';
import publicRouter from './publicRoutes';
import protectedRouter from './protectedRoutes';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.use('/auth', publicRouter); // Ensure the /auth prefix is applied here

// Protected routes
router.use(authenticateJWT, protectedRouter);

export default router;