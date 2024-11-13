import { Request, Response } from 'express';
import Message from '../../models/message.model';
import sequelize from '../../config/db.config';
import { QueryTypes } from 'sequelize';

class MessageController {
  public async sendMessage(req: Request) {
    const { chatId, content, messageType, mediaUrl } = req.body;
    const senderId = req.user.id;
    Message.create({
      chatId,
      senderId,
      content,
      messageType,
      mediaUrl,
      timestamp: new Date(),
    })
    return Message;
  }

  public async getMessages(chatId: string): Promise<Message[]> {
    try {
      const messages = await Message.findAll({ where: { chatId: chatId } });
      return messages;
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }



}

export default new MessageController();