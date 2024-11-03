// global.d.ts

import { UserAttributes } from './src/models/user.model'; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export {}; // This line is necessary to make this file a module
