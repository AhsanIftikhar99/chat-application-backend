// routes/user.routes.ts
import { Router, Request, Response } from 'express';
import UserController from '../controllers/user/user.controller';

const userRouter = Router();

// User routes
userRouter.get('/getAllUsers', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsers(req);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

userRouter.get('/getUserById/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserController.getUserById(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

export default userRouter;
