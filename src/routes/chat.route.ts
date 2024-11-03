import { Router } from 'express';
import { getOrCreateChat } from '../controllers/chat/chat.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/chats/:userId', authenticateJWT, getOrCreateChat);

export default router;
