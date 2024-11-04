import * as dotenv from 'dotenv';
import app from './app';
import sequelize from './config/db.config';
import http from 'http';
import { initializeSocket } from './socket';

dotenv.config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

sequelize.sync().then(() => {
  console.log('Database synchronized');
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});