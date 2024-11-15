import User from '../../models/user.model';

export const userAttributes = ['id', 'username', 'email', 'displayName', 'status', 'profilePicture', 'online'] as const;

export class UserManager {
  public static async findUserById(id: string) {
    return User.findByPk(id, {
      attributes: [...userAttributes],
    });
  }

  public static async findUserByIdWithPhoneNumber(id: string) {
    return User.findByPk(id, {
      attributes: [...userAttributes, 'phoneNumber'],
    });
  }

  public static async findUserByIdExcludingPassword(id: string) {
    return User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  // Add more reusable methods here if needed
}

export default UserManager;
