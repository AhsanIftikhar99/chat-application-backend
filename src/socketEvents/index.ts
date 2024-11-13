// src/socketEvents.js (or similar file for event handlers)

import { Server, Socket } from 'socket.io';
import Message from '../models/message.model';

export type MessageData = {
  chatId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'voice' | 'media';
  timestamp?: Date;
  encrypted?: boolean;
};

export type SocketEventHandlers = {
  [key: string]: (data: MessageData, io: Server, socket: Socket) => Promise<void>;
};


export const socketEventHandlers: SocketEventHandlers = {  sendMessage: async (messageData: MessageData, io: Server, socket: Socket) => {
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
