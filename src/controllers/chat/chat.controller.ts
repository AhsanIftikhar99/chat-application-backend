// src/controllers/ChatController.ts

import ChatManager from "../../managers/chat";
import UserManager from "../../managers/user";


class ChatController {
  public async getOrCreateChat(userId: string, currentUserId: string) {
    if (!currentUserId || !userId) throw new Error('Invalid user IDs provided.');

    // Check for an existing chat that contains both users
    let chat = await ChatManager.findChatBetweenUsers(currentUserId, userId);

    if (!chat) {
      // Create a new chat if it doesn't exist
      chat = await ChatManager.createChat(currentUserId, userId);
    }

    return chat;
  }

  public async getUserAndChatData(userId: string, currentUserId: string) {
    if (!currentUserId || !userId) throw new Error('Invalid user IDs provided.');

    // Fetch user data for the target user
    const user = await UserManager.findUserByIdExcludingPassword(userId);
    if (!user) throw new Error('User not found');

    // Check for an existing chat between current user and target user
    let chat = await ChatManager.findChatBetweenUsers(currentUserId, userId);

    const loggedUser = await UserManager.findUserByIdExcludingPassword(currentUserId);

    // If no chat exists, create a new one
    if (!chat) {
      chat = await ChatManager.createChat(currentUserId, userId);
    }

    // Return both user data and chat data
    return { user, chat, loggedUser };
  }
}

export default new ChatController();
