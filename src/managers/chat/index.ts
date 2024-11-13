import { Op } from 'sequelize';
import Chat from '../../models/chat.model';

export class ChatManager {
  public static async findChatBetweenUsers(userId1: string, userId2: string) {
    return Chat.findOne({
      where: {
        isGroupChat: false,
        members: { [Op.contains]: [userId1, userId2] },
      },
    });
  }

  public static async createChat(userId1: string, userId2: string) {
    return Chat.create({
      isGroupChat: false,
      members: [userId1, userId2],
    });
  }
}

export default ChatManager;
