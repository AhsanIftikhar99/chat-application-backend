// routes/publicRouter.ts
import { Router, Request, Response } from 'express';
import Auth from '../controllers/auth';
import { ZodError } from 'zod';

const publicRouter = Router();

// Public routes

// Sign up route
publicRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { user, token } = await Auth.signUp(req.body);
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else if (error instanceof Error && error.message === 'User already exists with this email') {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Login route
publicRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { user, token } = await Auth.login(req.body);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({
      message: 'Logged in successfully',
      user: user,
    });
  } catch (error: unknown) {
    console.log("login error", error);
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else if (error instanceof Error && error.message === 'Invalid email or password') {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});



export default publicRouter;
