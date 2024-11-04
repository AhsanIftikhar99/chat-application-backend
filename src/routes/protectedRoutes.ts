import { Router } from 'express';
import { getOrCreateChat } from '../controllers/chat/chat.controller';
import MessageController from '../controllers/message/message.controller';
import UserController from '../controllers/user/user.controller';

const protectedRouter = Router();

// Private routes
protectedRouter.get('/chats/:userId', getOrCreateChat);

protectedRouter.post('/chats/:chatId/messages', async (req, res) => {
  try {
    const sendMessage = await MessageController.sendMessage(req);
    res.status(201).json(sendMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

protectedRouter.get('/chats/:chatId/messages', async (req, res) => {
  try {
    const getMessages = await MessageController.getMessages(req);
    res.status(200).json(getMessages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

protectedRouter.get('/chats/getDmUsers', async (req, res) => {
  try {
    const getChats = await MessageController.getUsersChat(req);
    res.status(200).json(getChats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

protectedRouter.get('/users', async (req, res) => {
  try {
    const users = await UserController.getUsers(req);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});
protectedRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await UserController.getUserById(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

export default protectedRouter;