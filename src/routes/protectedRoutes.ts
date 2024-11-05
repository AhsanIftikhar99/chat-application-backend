// routes/protectedRouter.ts
import { Router } from 'express';
import chatRouter from './chat.route';
import userRouter from './user.route';

const protectedRouter = Router();

// Use the chat and user routers with base paths
protectedRouter.use('/chats', chatRouter);
protectedRouter.use('/users', userRouter);

export default protectedRouter;
