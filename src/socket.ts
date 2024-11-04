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
    Object.keys(socketEventHandlers).forEach((event) => {
      socket.on(event, (data) => socketEventHandlers[event](data, io, socket));
    });
  });

  return io;
};