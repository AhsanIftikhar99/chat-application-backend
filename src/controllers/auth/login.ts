// controllers/auth/login.ts
import bcrypt from 'bcrypt';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import User from '../../models/user.model';
import { generateToken } from '../../service/auth.service';
import { loginSchema } from '../../validations';


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
    // Set the token in a cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Adjust sameSite attribute as needed
    });

    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        profilePicture: user.profilePicture,
        status: user.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
