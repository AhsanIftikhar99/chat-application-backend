// routes/message.route.ts
import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/message/message.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/chats/:chatId/messages', authenticateJWT, sendMessage);
router.get('/chats/:chatId/messages', authenticateJWT, getMessages);

export default router;
