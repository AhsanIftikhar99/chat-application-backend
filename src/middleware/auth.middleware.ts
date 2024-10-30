import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../service/auth.service';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (err) {
      res.sendStatus(403); // Invalid token
    }
  } else {
    res.sendStatus(401); // No token provided
  }
};