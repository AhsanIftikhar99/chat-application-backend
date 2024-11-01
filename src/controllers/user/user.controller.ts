import { Request, Response } from 'express';
import User from '../../models/user.model';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture'] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// New getUserById method
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture'],
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};
