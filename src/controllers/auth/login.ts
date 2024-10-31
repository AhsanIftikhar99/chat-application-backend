// controllers/auth/login.ts
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import { z } from 'zod';
import { generateToken } from '../../service/auth.service';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    console.log(email, password);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    console.log('password valid', isPasswordValid);
    const token = generateToken(user.id, user.email);
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
