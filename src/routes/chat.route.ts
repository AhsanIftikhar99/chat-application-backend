// routes/chat.routes.ts

import { Router, Request, Response } from 'express';
import MessageController from '../controllers/message/message.controller';
import ChatController from '../controllers/chat/chat.controller';

const chatRouter = Router();

// Chat routes
chatRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const chat : any= await ChatController.getOrCreateChat(req, res);
    const chatId = chat?.id;
    res.status(200).json(chatId);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or creating chat', error });
  }
});

chatRouter.get('/getUserAndChat/:userId', async (req: Request, res: Response) => {
  try {
    const data= await ChatController.getUserAndChatData(req, res);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or creating chat', error });
  }
});

chatRouter.post('/:chatId/messages', async (req: Request, res: Response) => {
  try {
    const sendMessage = await MessageController.sendMessage(req);
    res.status(201).json(sendMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

chatRouter.get('/:chatId/messages', async (req: Request, res: Response) => {
  try {
    const getMessages = await MessageController.getMessages(req);
    res.status(200).json(getMessages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

chatRouter.get('/getDmUsers', async (req: Request, res: Response) => {
  try {
    const getChats = await MessageController.getUsersChat(req);
    res.status(200).json(getChats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

export default chatRouter;
