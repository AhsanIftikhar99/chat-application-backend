// global.d.ts
import { UserAttributes } from './src/models/user.model'; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export {}; // Ensure the file is treated as a module
