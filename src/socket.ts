// src/socket.js (or wherever your server socket setup is)

import http from 'http';
import { Server } from 'socket.io';
import { socketEventHandlers } from './socketEvents';

export const initializeSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {

    // Expecting the client to emit a "joinRoom" event to join a specific room for the chat
    socket.on("joinRoom", (chatId) => {
      console.log(`User ${socket.id} joined room ${chatId}`);
      socket.join(chatId);
    });

    socket.on("leaveRoom", (chatId) => {
      console.log(`User ${socket.id} left room ${chatId}`);
      socket.leave(chatId);
    });

    // Set up other event listeners for specific events (e.g., sendMessage)
    Object.keys(socketEventHandlers).forEach((event) => {
      socket.on(event, (data) => socketEventHandlers[event](data, io, socket));
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
