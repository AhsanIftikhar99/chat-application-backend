// routes/chat.routes.ts

import { Router, Request, Response } from 'express';
import MessageController from '../controllers/message/message.controller';
import ChatController from '../controllers/chat/chat.controller';

const chatRouter = Router();

// Chat routes
chatRouter.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const currentUserId = req.user?.user_id;

  try {
    const chat = await ChatController.getOrCreateChat(userId, currentUserId);
    res.status(200).json({ chatId: chat.id });
  } catch (error) {
    console.error('Error fetching or creating chat:', error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

chatRouter.get('/getUserAndChat/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const currentUserId = req.user?.user_id;

  try {
    const data = await ChatController.getUserAndChatData(userId, currentUserId);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user or chat data:', error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

chatRouter.post('/:chatId/messages', async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const messageData = req.body;

  try {
    const sendMessage = await MessageController.sendMessage({ chatId, ...messageData });
    res.status(201).json(sendMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

chatRouter.get('/:chatId/messages', async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageController.getMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

export default chatRouter;
