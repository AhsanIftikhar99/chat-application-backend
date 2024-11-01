import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

var cookieParser = require('cookie-parser')


const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); 
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes)

export default app;