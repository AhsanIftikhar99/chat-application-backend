import jwt from 'jsonwebtoken';

interface TokenPayload {
  user_id: string;
  email: string;
}

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { user_id: userId, email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};