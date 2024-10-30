// FILE: global.d.ts
import { UserAttributes } from './models/user.model'; // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}