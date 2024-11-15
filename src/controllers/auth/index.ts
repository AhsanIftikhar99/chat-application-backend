import bcrypt from 'bcrypt';
import { Response } from 'express';
import User from '../../models/user.model';
import { generateToken } from '../../service/auth.service';
import { loginSchema, signupSchema } from '../../validations';
import { sendConfirmationEmail } from '../../utils/helpers/mail';


class Auth {
  // Sign up method
  async signUp(data: { username: string; email: string; password: string; displayName: string }) {
    const { username, email, password, displayName } = signupSchema.parse(data);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      displayName,
      password: hashedPassword,
    });

    // Generate a token for the user
    const token = generateToken(user.id, user.email);

    // Call the function to send the confirmation email
    await sendConfirmationEmail(email, displayName as string);

    return { user, token };
  }

  // Login method
  async login(data: { email: string; password: string }) {
    const { email, password } = loginSchema.parse(data);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    await user.update({ online: true });

    const token = generateToken(user.id, user.email);
    return { user, token };
  }

  async logout(response: Response, userId: string) {
    const user = await User.findByPk(userId);
    console.log('user', user);
    if (user) {
      const logout=await user.update({ online: false });
      console.log('logout', logout);
    }

    // Clear the JWT token from the cookie
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Logged out successfully' };
  }
}

export default new Auth();
