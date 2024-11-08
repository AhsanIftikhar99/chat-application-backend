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

  public async getLoggedInUser(req: Request): Promise<User | null> {
    try {
      const { user_id } = (req as any).user;
      const user = await User.findByPk(user_id, {
        attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture', 'phoneNumber'],
      });

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    }
    catch (error) {
      console.log('error', error);
      throw new Error('Error retrieving user');
    }
  }
  public async updateUserDetails(req: Request): Promise<User | null> {
    console.log('updateUser req.body', req.body);
    try {
      const { user_id } = (req as any).user; 
      const updateFields = req.body; 
      

      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error('User not found');
      }
  
     
      await user.update(updateFields);
  
      
      return await User.findByPk(user_id, {
        attributes: ['id', 'username', 'email', 'displayName', 'status', 'profilePicture', 'phoneNumber'],
      });
    } catch (error) {
      console.log('Error updating user details:', error);
      throw new Error('Error updating user details');
    }
  }
}

export default new UserController();