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
  
        io.to(messageData.chatId).emit('newMessage', message); // Emit message to users in this chat room
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
  };