import { Router } from 'express';
import { login, signup } from '../controllers/auth';

const publicRouter = Router();

// Public routes
publicRouter.post('/signup', signup);
publicRouter.post('/login', login);

export default publicRouter;