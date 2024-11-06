// src/socketEvents.js (or similar file for event handlers)

import { Server } from 'socket.io';
import Message from '../models/message.model';

export const socketEventHandlers: { [key: string]: (data: any, io: Server, socket: any) => Promise<void> } = {
  sendMessage: async (messageData, io, socket) => {
    try {
      console.log('Received message data:', messageData); // Add logging
      const message = await Message.create({
        ...messageData,
        timestamp: new Date(),
        encrypted: false, // Adjust as needed
      });

      // Emit the message only to the users in the specific chat room
      io.to(messageData.chatId).emit('newMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },
};
