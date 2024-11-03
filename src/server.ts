import { Server } from 'socket.io';
import http from 'http';
import app from './app';
import { verifyToken } from './service/auth.service';
import Message from './models/message.model';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});


io.on('connection', (socket) => {
  socket.on('sendMessage', async (messageData) => {
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
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});