// src/controllers/ChatController.ts

import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Chat from '../../models/chat.model';
import User from '../../models/user.model';

class ChatController {
  // Method to get or create a chat between two users
  public async getOrCreateChat(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; // The other user's ID
    const currentUserId = (req as any).user?.user_id; // The ID of the currently authenticated user

    // Verify both IDs are not null
    if (!currentUserId || !userId) {
      res.status(400).json({ message: 'Invalid user IDs provided.' });
      return;
    }

    try {
      // Check for an existing chat that contains both users
      let chat = await Chat.findOne({
        where: {
          isGroupChat: false,
          members: { [Op.contains]: [currentUserId, userId] },
        },
      });

      if (!chat) {
        // Create a new chat if it doesn't exist
        chat = await Chat.create({
          isGroupChat: false,
          members: [currentUserId, userId],
        });
      }

      res.status(200).json({ chatId: chat.id });
    } catch (error) {
      console.error('Error fetching or creating chat:', error);
      res.status(500).json({ message: 'Error fetching or creating chat', error });
    }
  }
  public async getUserAndChatData(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; // Target user's ID
    const currentUserId = (req as any).user?.user_id; // Authenticated user's ID

    if (!currentUserId || !userId) {
      res.status(400).json({ message: 'Invalid user IDs provided.' });
      return;
    }

    try {
      // Fetch user data for the target user
      const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }, // Exclude sensitive fields
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Check for an existing chat between current user and target user
      let chat = await Chat.findOne({
        where: {
          isGroupChat: false,
          members: { [Op.contains]: [currentUserId, userId] },
        },
      });

      let loggedUser = await User.findOne({
        where: { id: currentUserId },
        attributes: { exclude: ['password'] },
      });

      // If no chat exists, create a new one
      if (!chat) {
        chat = await Chat.create({
          isGroupChat: false,
          members: [currentUserId, userId],
        });
      }

      // Respond with both user data and chat data
      res.status(200).json({ user, chat , loggedUser});
    } catch (error) {
      console.error('Error fetching user or chat data:', error);
      res.status(500).json({ message: 'Error fetching user or chat data', error });
    }
  } 
}

export default new ChatController();
