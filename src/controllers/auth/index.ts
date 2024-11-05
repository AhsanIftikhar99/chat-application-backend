// controllers/auth/auth.ts
import bcrypt from 'bcrypt';

import User from '../../models/user.model';
import { generateToken } from '../../service/auth.service';
import { loginSchema, signupSchema } from '../../validations';

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

    const token = generateToken(user.id, user.email);
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

    const token = generateToken(user.id, user.email);
    return { user, token };
  }
}

export default new Auth();
