import { Router, Request, Response } from 'express';
import multer from 'multer';
import UserController from '../controllers/user/user.controller';

const userRouter = Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory as a buffer

// User routes
userRouter.get('/getAllUsers', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json(users);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving users', error: errorMessage });
  }
});

userRouter.get('/getUserById/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserController.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving user', error: errorMessage });
  }
});

userRouter.get('/getLoggedInUser', async (req: Request, res: Response) => {
  try {
    const { user_id } = (req as any).user;
    const user = await UserController.getLoggedInUser(user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving user', error: errorMessage });
  }
});

userRouter.post('/updateUserDetails', upload.single('profilePicture'), async (req: Request, res: Response) => {
  try {
    const { user_id } = (req as any).user;
    const updateFields = { ...req.body };
    
    // Add the profilePicture binary data if available
    if (req.file) {
      updateFields.profilePicture = req.file.buffer;
    }

    const user = await UserController.updateUserDetails(user_id, updateFields);
    res.statusMessage = 'User details updated successfully';
    res.status(200).json(user);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error updating user', error: errorMessage });
  }
});

// Define the getUsersWithChat route independently
userRouter.get('/getUsersWithChat', async (req: Request, res: Response) => {
  try {
    const { user_id } = (req as any).user;
    const contacts = await UserController.getUsersChat(user_id);
    res.status(200).json(contacts);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error fetching contacts', error: errorMessage });
  }
});

export default userRouter;
