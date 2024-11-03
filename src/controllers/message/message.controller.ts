// controllers/message.controller.ts
import { Request, Response } from 'express';
import Message from '../../models/message.model';

export const sendMessage = async (req: Request, res: Response) => {
  const { chatId, content, messageType, mediaUrl } = req.body;
  try {
    const senderId = req.user.id;
    const message = await Message.create({
      chatId,
      senderId,
      content,
      messageType,
      mediaUrl,
      timestamp: new Date(),
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll({ where: { chatId: req.params.chatId } });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
