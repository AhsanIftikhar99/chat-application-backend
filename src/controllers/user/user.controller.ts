import UserManager, { userAttributes } from '../../managers/user';
import sequelize from '../../config/db.config';
import { QueryTypes } from 'sequelize';
import User from '../../models/user.model';

class UserController {
  public async getUsers() {
    try {
      const users = await User.findAll({
        attributes: [...userAttributes],
      });
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw new Error('Error retrieving users');
    }
  }

  public async getUserById(id: string) {
    try {
      return await UserManager.findUserById(id);
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw new Error('Error retrieving user');
    }
  }

  public async getLoggedInUser(user_id: string) {
    try {
      return await UserManager.findUserByIdWithPhoneNumber(user_id);
    } catch (error) {
      console.error('Error retrieving logged-in user:', error);
      throw new Error('Error retrieving user');
    }
  }

  public async updateUserDetails(user_id: string, updateFields: Partial<User>) {
    try {
      const user = await UserManager.findUserById(user_id);
      if (!user) {
        throw new Error('User not found');
      }

      // Update fields, including binary profilePicture if provided
      await user.update(updateFields);

      // Return updated user data, including phone number
      return await UserManager.findUserByIdWithPhoneNumber(user_id);
    } catch (error) {
      console.error('Error updating user details:', error);
      throw new Error('Error updating user details');
    }
  }

  public async getUsersChat(user_id: string) {
    try {
      const query = `
        SELECT DISTINCT u.id as userId, u.username, u."displayName", c.id as chatId
        FROM public."User" u
        JOIN public."Chat" c ON u.id = ANY(c.members)
        WHERE :user_id = ANY(c.members) AND u.id != :user_id;
      `;

      const results = await sequelize.query(query, {
        replacements: { user_id },
        type: QueryTypes.SELECT,
      });

      return results;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new Error('Error fetching contacts');
    }
  }
}

export default new UserController();
