import { Request, Response } from 'express';
import User from '../../models/user.model';

class UserController {
  public async getUsers(req: Request): Promise<User[]> {
    try {
      const users = await User.findAll({ attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture'] });
      return users;
    } catch (error) {
      console.log('error', error);
      throw new Error('Error retrieving users');
    }
  }

  public async getUserById(req: Request): Promise<User | null> {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture'],
      });

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log('error', error);
      throw new Error('Error retrieving user');
    }
  }
}

export default new UserController();