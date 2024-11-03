import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Chat from '../../models/chat.model';
import { string } from 'zod';

export const getOrCreateChat = async (req: Request, res: Response): Promise<void> =>  {
  const { userId } = req.params; // The other user's ID
  
  const currentUserId = (req as any).user?.user_id; // The ID of the currently authenticated user
  console.log('userId', userId);
    console.log('currentUserId', currentUserId);
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
        members: { [Op.contains]: [currentUserId, userId] }, // Checks for both users in the array
      },
    });

    if (!chat) {
      // Create a new chat if it doesn't exist
      chat = await Chat.create({
        isGroupChat: false,
        members: [currentUserId, userId], // Add both users to the members array
      });
    }

    res.status(200).json({ chatId: chat.id });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or creating chat', error });
  }
};
