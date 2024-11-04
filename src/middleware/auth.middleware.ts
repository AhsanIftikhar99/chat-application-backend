// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../service/auth.service';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  console.log('Cookies:', req.cookies, req.rawHeaders);

  const token = req.cookies.jwt;

  if (token) {
    try {
      const user = verifyToken(token); // Assumes verifyToken returns UserAttributes type
      req.user = user;
      next();
    } catch (err) {
      res.sendStatus(403); // Forbidden - Invalid token
    }
  } else {
    res.sendStatus(401); // Unauthorized - No token provided
  }
};
