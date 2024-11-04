import { Request, Response } from 'express';
import Message from '../../models/message.model';
import sequelize from '../../config/db.config';
import { QueryTypes } from 'sequelize';

class MessageController {
  public async sendMessage(req:Request) {
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

  public async getMessages(req: Request): Promise<Message[]> {
    try {
      const messages = await Message.findAll({ where: { chatId: req.params.chatId } });
      return messages;
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }

  public async getUsersChat(req: Request): Promise<any> {
   try{
    console.log('Fetching contacts');
    const userId = req.user.id;

    const query = `
      SELECT DISTINCT u.id, u.username, u.displayName, u.profilePicture
      FROM "Users" u
      JOIN "Messages" m ON u.id = m."senderId" OR u.id = ANY(m."seenBy")
      WHERE m."senderId" = :userId OR :userId = ANY(m."seenBy")
    `;

    const results = await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });

    return results;
   }
   catch(error){
     throw new Error('Error fetching contacts');
   }
  }
}

export default new MessageController();