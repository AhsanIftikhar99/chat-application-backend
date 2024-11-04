import { Request, Response, RequestHandler } from 'express';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { generateToken } from '../../service/auth.service';
import { signupSchema } from '../../validations';


export const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, displayName } = signupSchema.parse(req.body);


    console.log(req.body);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      displayName,
      password: hashedPassword,
    });
    console.log(user);
    const token = generateToken(user.id, user.email);

    // Set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};